import CreateElement from '../components/create-element';
import { CanvasCover, Position } from '../types/types';
import { isNull } from './functions';
import { canvas } from './tag-functions';

function setText(word: string, part: CreateElement<HTMLCanvasElement>, data: ImageData) {
  const partCanvas = part;

  const partCtx = isNull(partCanvas.getNode().getContext('2d'));
  partCtx.putImageData(data, 0, 0);

  partCtx.font = 'bold 20px Ashar';
  partCtx.textAlign = 'center';
  partCtx.textBaseline = 'middle';
  partCtx.fillStyle = '#f6f2f6';

  const text = word;
  const x = partCanvas.getNode().width / 2;
  const y = partCanvas.getNode().height / 2;

  partCtx.fillText(text, x, y);
  partCtx.lineWidth = 0.8;
  partCtx.strokeStyle = '#f6f2f6';
  partCtx.strokeText(text, x, y);
}

function createCanvas(
  param: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  sentences: string[]
) {
  const sentencesList: CanvasCover[][] = [];
  const base = param;
  const img = image;
  base.width = 880;
  base.height = 500;
  context.drawImage(img, 0, 0, base.width, base.height);
  let maxHeight = 0;

  for (let i = 0; i < sentences.length; i += 1) {
    sentencesList.push([]);
    const words = sentences[i].toLowerCase().split(' ');
    let maxWidth = 0;
    const baseForEach = (base.width - base.height) / words.join('').length;
    const basisForEach = base.height / words.length;
    for (let j = 0; j < words.length; j += 1) {
      let width = basisForEach + baseForEach * words[j].length;
      if (!(words[j] === words[words.length - 1])) width += 10;
      const imageData = context.getImageData(maxWidth, maxHeight, width, 50);
      const partCanvas = canvas({});
      partCanvas.getNode().width = width;
      if (!(words[j] === words[words.length - 1])) width -= 10;
      partCanvas.getNode().height = 50;
      setText(words[j], partCanvas, imageData);
      let position: Position;
      if (words[j] === words[0]) position = 'first';
      else if (words[j] === words[words.length - 1]) position = 'last';
      else position = 'mid';
      sentencesList[i].push({ width, canvas: partCanvas, word: words[j], position });
      maxWidth += width;
    }
    maxHeight += 50;
  }
  return sentencesList;
}
export default function cut(sentences: string[], url: string): Promise<CanvasCover[][]> {
  return new Promise((resolve) => {
    const base = canvas({}).getNode();
    const context = isNull(base.getContext('2d', { willReadFrequently: true }));

    const link = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${url}`;
    const img = new Image();
    img.src = link;
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      resolve(createCanvas(base, context, img, sentences));
    };
  });
}
