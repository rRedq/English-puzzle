import type CreateElement from '../components/create-element';

type ElementOrNull = CreateElement | null;

type Paths = {
  first: string;
  middle: string;
  last: string;
};

type CreateSvg = {
  width: number;
  svg: SVGSVGElement;
};

type LevelsData = 1 | 2 | 3 | 4 | 5 | 6;

type StorageKeys = 'result' | 'progress';

type CanvasCover = {
  width: number;
  canvas: CreateElement<HTMLCanvasElement>;
  word: string;
  position: Position;
};

type Position = 'first' | 'mid' | 'last';

export { ElementOrNull, Paths, CreateSvg, LevelsData, StorageKeys, CanvasCover, Position };
