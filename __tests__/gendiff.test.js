import fs from 'fs';
import gendiff from '../src';

const fixturesPath = `${__dirname}/__fixtures__`;

test('gendiff', () => {
  const pathToFileBefore = `${fixturesPath}/before.json`;
  const pathToFileAfter = `${fixturesPath}/after.json`;
  const pathToFileExpected = `${fixturesPath}/correctDiff.txt`;
  const expected = fs.readFileSync(pathToFileExpected, 'utf8').trim();
  expect(gendiff(pathToFileBefore, pathToFileAfter)).toBe(expected);
});
