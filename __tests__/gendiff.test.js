import fs from 'fs';
import gendiff from '../src';

const getPath = fileName => `${__dirname}/__fixtures__/${fileName}`;

const testDate = [
  ['before.json', 'after.json', 'correctDiff.txt'],
  ['before.yml', 'after.yml', 'correctDiff.txt'],
  ['before.ini', 'after.ini', 'correctDiff.txt'],
];

test.each(testDate)(
  'gendiff(%s, %s)',
  (fileNameBefore, fileNameAfter, fileNameExpected) => {
    const expected = fs.readFileSync(getPath(fileNameExpected), 'utf8').trim();
    const pathToFileBefore = getPath(fileNameBefore);
    const pathToFileAfter = getPath(fileNameAfter);
    expect(gendiff(pathToFileBefore, pathToFileAfter)).toBe(expected);
  },
);
