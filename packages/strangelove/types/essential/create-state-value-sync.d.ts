import ReadWriteValueSync from './read-write-value-sync';

export default function createStateValueSync<TValue>(
  value: TValue
): ReadWriteValueSync<TValue>;
