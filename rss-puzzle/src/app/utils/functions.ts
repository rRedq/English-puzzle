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
  const storage = isNull(localStorage.getItem('rredq'));
  let result = new Map<string, string[]>(JSON.parse(storage)).get(id);
  if (!result) result = [];

  return result;
}

export { isNull, setStorage, getStorage };
