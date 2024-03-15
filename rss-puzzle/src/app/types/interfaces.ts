import type { LevelsData } from './types';

interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  className?: string;
  textContent?: string;
  onclick?: (e: Event) => void;
}

interface TagsProps extends Omit<ElementProps, 'tag'> {
  type?: string;
}

interface InputProps extends TagsProps {
  required?: string;
  value?: string;
}

interface Word {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

interface LevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

interface Round {
  levelData: LevelData;
  words: Word[];
}

interface DataJson {
  rounds: Round[];
  roundsCount: number;
}

interface CurrentWord {
  level: LevelsData;
  round: number;
  word: number;
}

interface StorageWords extends CurrentWord {
  isKnown: 'know' | 'unknown';
}

interface IsKnownWords extends Omit<CurrentWord, 'word'> {
  known: number[];
  unknown: number[];
}

interface StorageAccess {
  firstName: string;
  surName: string;
}

interface StorageHints {
  isText: boolean;
  isSound: boolean;
}

interface StorageProgress {
  level: LevelsData;
  rounds: number[];
}

export {
  InputProps,
  TagsProps,
  ElementProps,
  DataJson,
  CurrentWord,
  StorageAccess,
  StorageHints,
  Word,
  StorageProgress,
  StorageWords,
  IsKnownWords,
};
