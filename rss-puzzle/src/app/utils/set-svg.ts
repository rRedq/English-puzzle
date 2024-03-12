import type { Paths, CreateSvg } from '../types/types';

function setPath(width: number): Paths {
  const paths: Paths = {
    first: `M0 0 h${width} v33.5c0 7.56 11.24-2.13 19.23-3.68 10.16-1.98 20.77 9.03 20.77 20.18 0 11.16-9.64 20.95-20.77 20.19-9.7-0.65-19.23-13.3-19.23-5.36v35.17H0V0z`,
    middle: `M0 0 h${width} v33.5c0 7.56 11.25-2.15 19.23-3.69 10.17-1.98 20.77 9.04 20.77 20.19 0 11.15-9.65 20.96-20.77 20.19-9.69-0.65-19.23-13.31-19.23-5.35v35.2H0v-35.2c0-7.96 9.54 4.71 19.23 5.35 11.13 0.77 20.77-9.04 20.77-20.19 0-11.15 -10.6-22.17 -20.77-20.19 -7.98 1.54 -19.23 11.25-19.23 3.69z`,
    last: `M0 0 h${width} v100H0v-35.17c0-7.95 9.53 4.7 19.23 5.38 11.13 0.75 20.78-9.05 20.78-20.2 0-11.15-10.6-22.17-20.77-20.2-7.97 1.55-19.22 11.28-19.22,3.7z`,
  };
  return paths;
}

function setUpSvg(currentWord: string, position: string, width: number): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('viewBox', `0 0 ${width + 40} 100`);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', position);
  path.setAttribute('style', 'fill: #95c0eb; stroke: black; stroke-width: 1px');

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', '50%');
  text.setAttribute('y', '50%');
  text.setAttribute('style', 'text-anchor: middle; dominant-baseline: middle; text-anchor: middle');
  text.setAttribute('font-size', '35px');
  text.textContent = `${currentWord}`;
  svg.appendChild(path);
  svg.appendChild(text);

  return svg;
}
export default function createSvg(str: string): CreateSvg[] {
  const words = str.toLowerCase().split(' ');
  const containerWidth = 880 * 2;
  let base = 1000;
  const baseForEach = (containerWidth - base) / words.join('').length;
  base /= words.length;
  const result: CreateSvg[] = [];

  words.forEach((word, index) => {
    const width = base + baseForEach * word.length;
    let type: string;

    if (index === 0) type = setPath(width).first;
    else if (index === words.length - 1) type = setPath(width).last;
    else type = setPath(width).middle;

    result.push({ width: width / 2, svg: setUpSvg(word, type, width) });
  });

  return result;
}
