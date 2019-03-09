import fs from 'fs';
import gendiff from '../src';

const getPath = fileName => `${__dirname}/__fixtures__/${fileName}`;

const testDate = [
  ['before.json', 'after.json', 'pretty', 'correctDiffPretty.txt'],
  ['before.yml', 'after.yml', 'pretty', 'correctDiffPretty.txt'],
  ['before.ini', 'after.ini', 'pretty', 'correctDiffPretty.txt'],
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

const testDateJson = [
  ['before.json', 'after.json', 'json', 'correctDiffJson.txt'],
  ['before.yml', 'after.yml', 'json', 'correctDiffJson.txt'],
  ['before.ini', 'after.ini', 'json', 'correctDiffJson.txt'],
];

test.each(testDateJson)(
  'gendiff(%s, %s, %s)',
  (fileNameBefore, fileNameAfter, format, fileNameExpected) => {
    const content = fs.readFileSync(getPath(fileNameExpected), 'utf8').trim();
    const expected = JSON.stringify(JSON.parse(content));
    const pathToFileBefore = getPath(fileNameBefore);
    const pathToFileAfter = getPath(fileNameAfter);
    expect(gendiff(pathToFileBefore, pathToFileAfter, format)).toBe(expected);
  },
);
