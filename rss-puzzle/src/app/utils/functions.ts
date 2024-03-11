import StorageStatus from '../types/enum';

function isNull<T>(value: T): NonNullable<T> {
  if (value === undefined || value === null) {
    throw Error(`Expected 'value' to be defined, but received: ${value}`);
  }
  return value;
}
function checkId(id: string): void {
  if (!Object.values(StorageStatus)[Object.keys(StorageStatus).indexOf(id)]) throw Error(`Unexpected id: ${id}`);
}

function setStorage(id: string, value: string[]): void {
  checkId(id);
  const obj = new Map<string, string[]>();
  obj.set(id, value);
  localStorage.setItem('rredq', JSON.stringify([...obj]));
}

function getStorage(id: string): string[] {
  checkId(id);
  const storage = localStorage.getItem('rredq');
  if (!storage) return [];
  const result = new Map<string, string[]>(JSON.parse(storage)).get(id);
  if (!result) return [];

  return result;
}

function deleteStorageKey(id: string): boolean {
  checkId(id);
  const storage = localStorage.getItem('rredq');
  if (!storage) return false;
  const result = new Map<string, string[]>(JSON.parse(storage));
  if (!result || !result.get(id)) return false;
  result.delete(id);
  localStorage.setItem('rredq', JSON.stringify([...result]));
  return true;
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

export { isNull, setStorage, getStorage, deleteStorageKey, getNewPosition };
