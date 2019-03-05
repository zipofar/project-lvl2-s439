import fs from 'fs';
import gendiff from '../src';

const getPath = fileName => `${__dirname}/__fixtures__/${fileName}`;
const expectedResult = fs.readFileSync(getPath('correctDiff.txt'), 'utf8').trim();

const testDate = [
  [getPath('before.json'), getPath('after.json'), expectedResult],
  [getPath('before.yml'), getPath('after.yml'), expectedResult],
  [getPath('before.ini'), getPath('after.ini'), expectedResult],
];

test.each(testDate)(
  'gendiff(%s, %s)',
  (pathToFileBefore, pathToFileAfter, expected) => {
    expect(gendiff(pathToFileBefore, pathToFileAfter)).toBe(expected);
  },
);
