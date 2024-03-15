import { IsKnownWords, StorageWords } from '../types/interfaces';
import { StorageKeys } from '../types/types';
import { getStorage, setStorage } from './functions';

function deleteStorageByKey(key: StorageKeys) {
  const storage = localStorage.getItem('rredq');
  if (storage) {
    const result = new Map(JSON.parse(storage));
    result.delete(key);
    localStorage.setItem('rredq', JSON.stringify([...result]));
  }
}

function setStorageIsKnown(props: StorageWords) {
  const { level, round, word, isKnown } = props;

  let result: IsKnownWords | undefined = getStorage<IsKnownWords>('result');
  if (!result) {
    result = {
      level,
      round,
      known: [],
      unknown: [],
    };
  }

  if (isKnown === 'know') result.known.push(word);
  else result.unknown.push(word);
  setStorage<IsKnownWords>('result', result);
}

export { setStorageIsKnown, deleteStorageByKey };
