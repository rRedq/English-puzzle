import type CreateElement from '../components/create-element';
import { StorageHints, StorageAccess, StorageProgress } from './interfaces';

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

type HintFields<T> = {
  cover: T;
  textBtn: T;
  onSound: T;
  soundBtn: T;
  textHint: T;
};

type LevelsData = 1 | 2 | 3 | 4 | 5 | 6;

type Storage = StorageHints | StorageAccess | StorageProgress;

export { ElementOrNull, Paths, CreateSvg, HintFields, LevelsData, Storage };
