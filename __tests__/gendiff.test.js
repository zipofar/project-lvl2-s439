import fs from 'fs';
import gendiff from '../src';

const getPath = fileName => `${__dirname}/__fixtures__/${fileName}`;

const testDate = [
  ['before.json', 'after.json', 'pretty', 'correctDiff.txt'],
  ['before.yml', 'after.yml', 'pretty', 'correctDiff.txt'],
  ['before.ini', 'after.ini', 'pretty', 'correctDiff.txt'],
  ['before.json', 'after.json', 'plain', 'correctDiffPlain.txt'],
  ['before.yml', 'after.yml', 'plain', 'correctDiffPlain.txt'],
  ['before.ini', 'after.ini', 'plain', 'correctDiffPlain.txt'],
];

test.each(testDate)(
  'gendiff(%s, %s, %s)',
  (fileNameBefore, fileNameAfter, format, fileNameExpected) => {
    const expected = fs.readFileSync(getPath(fileNameExpected), 'utf8').trim();
    const pathToFileBefore = getPath(fileNameBefore);
    const pathToFileAfter = getPath(fileNameAfter);
    expect(gendiff(pathToFileBefore, pathToFileAfter, format)).toBe(expected);
  },
);
