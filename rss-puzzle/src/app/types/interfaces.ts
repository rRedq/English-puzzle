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
  round: number;
  word: number;
}

interface StorageAccess {
  firstName: string;
  surName: string;
}

interface StorageHints {
  isText: boolean;
  isSound: boolean;
}

export { InputProps, TagsProps, ElementProps, DataJson, CurrentWord, StorageAccess, StorageHints };
