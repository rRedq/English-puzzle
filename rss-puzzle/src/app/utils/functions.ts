import StorageStatus from '../types/enum';
import type { StorageHints, StorageAccess, DataJson } from '../types/interfaces';
import type { LevelsData } from '../types/types';

function isNull<T>(value: T): NonNullable<T> {
  if (value === undefined || value === null) {
    throw Error(`Expected 'value' to be defined, but received: ${value}`);
  }
  return value;
}
function checkId(id: string): void {
  if (!Object.values(StorageStatus)[Object.keys(StorageStatus).indexOf(id)]) throw Error(`Unexpected id: ${id}`);
}

function setStorage(id: string, value: StorageHints | StorageAccess): void {
  checkId(id);
  let obj;
  const prevObj = localStorage.getItem('rredq');
  if (prevObj) {
    obj = new Map<string, StorageHints | StorageAccess>(JSON.parse(prevObj));
    obj.set(id, value);
  } else {
    obj = new Map<string, StorageHints | StorageAccess>();
    obj.set(id, value);
  }

  localStorage.setItem('rredq', JSON.stringify([...obj]));
}

function getStorage<T>(id: string): T | undefined {
  checkId(id);
  const storage = localStorage.getItem('rredq');
  if (!storage) return undefined;
  const result = new Map<string, T>(JSON.parse(storage)).get(id);
  if (!result) return undefined;

  return result;
}

function deleteStorage() {
  localStorage.clear();
}

function getNewPosition(column: HTMLElement, posX: number) {
  const puzzles = column.querySelectorAll('.game__item:not(.dragging)');
  let result: Element | undefined;

  for (let i = 0; i < puzzles.length; i += 1) {
    const box = puzzles[i].getBoundingClientRect();
    const boxCenterX = box.x + box.height / 2;
    if (posX >= boxCenterX) result = puzzles[i];
  }

  return result;
}

async function getData(level: LevelsData): Promise<DataJson> {
  const result = await fetch(
    `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${level}.json`
  )
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => new Error(err));
  return result;
}

export { isNull, setStorage, getStorage, deleteStorage, getNewPosition, getData };
