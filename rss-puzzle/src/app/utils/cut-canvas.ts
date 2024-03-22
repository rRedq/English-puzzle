import CreateElement from '../components/create-element';
import { CanvasCover, Position } from '../types/types';
import { gitRawUrl } from './constants';
import { isNull } from './functions';
import { canvas } from './tag-functions';

function setCanvasProperties(
  context: CanvasRenderingContext2D,
  width: number,
  maxWidth: number,
  height: number,
  maxHeight: number
): CreateElement<HTMLCanvasElement> {
  const imageData = context.getImageData(maxWidth, maxHeight, width, height);
  const partCanvas = canvas({});
  partCanvas.getNode().width = width;
  partCanvas.getNode().height = height;
  const partCtx = isNull(partCanvas.getNode().getContext('2d'));
  partCtx.putImageData(imageData, 0, 0);

  return partCanvas;
}
function setPosition(array: string[], index: number): Position {
  let position: Position;
  if (index === 0) {
    position = 'first';
  } else if (array[index] === array[array.length - 1]) {
    position = 'last';
  } else {
    position = 'mid';
  }
  return position;
}

function createCanvas(
  baseCanvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  sentences: string[]
) {
  const sentencesList: CanvasCover[][] = [];
  const base = baseCanvas;
  const img = image;
  base.width = 880;
  base.height = 500;
  const maxWidthWithoutPaddings = 900;
  const maxPersent = 100;
  context.drawImage(img, 0, 0, base.width, base.height);
  let maxHeight = 0;
  const height = 50;
  const puzzleGap = 10;
  for (let i = 0; i < sentences.length; i += 1) {
    sentencesList.push([]);
    const words = sentences[i].toLowerCase().split(' ');
    let maxWidth = 0;
    const baseForEach = (base.width - base.height) / words.join('').length;
    const basisForEach = base.height / words.length;
    for (let j = 0; j < words.length; j += 1) {
      let width = basisForEach + baseForEach * words[j].length;
      if (!(words[j] === words[words.length - 1])) {
        width += puzzleGap;
      }
      const partCanvas = setCanvasProperties(context, width, maxWidth, height, maxHeight);
      if (!(words[j] === words[words.length - 1])) {
        width -= puzzleGap;
      }
      const pers = (width / maxWidthWithoutPaddings) * maxPersent;
      const position = setPosition(words, j);
      sentencesList[i].push({ width: pers, canvas: partCanvas, word: words[j], position });
      maxWidth += width;
    }
    maxHeight += height;
  }
  return sentencesList;
}

export default function cutCanvas(sentences: string[], url: string): Promise<CanvasCover[][]> {
  return new Promise((resolve, reject) => {
    const base = canvas({}).getNode();
    const context = isNull(base.getContext('2d', { willReadFrequently: true }));
    const link = `${gitRawUrl}/images/${url}`;
    const img = new Image();
    img.src = link;
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      resolve(createCanvas(base, context, img, sentences));
    };

    img.onerror = () => {
      reject(new Error('Something went wrong'));
    };
  });
}
