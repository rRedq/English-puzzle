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

export { InputProps, TagsProps, ElementProps, DataJson };
