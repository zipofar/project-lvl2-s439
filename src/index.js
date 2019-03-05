import fs from 'fs';
import _ from 'lodash';

const parseFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
};

const buildDiff = (dataBefore, dataAfter) => (
  _.union(Object.keys(dataBefore), Object.keys(dataAfter))
    .map((key) => {
      if (_.has(dataAfter, key) && _.has(dataBefore, key)) {
        const state = dataAfter[key] === dataBefore[key] ? 'notChanged' : 'hasChanged';
        return {
          key,
          state,
          newValue: dataAfter[key],
          oldValue: dataBefore[key],
        };
      }
      if (_.has(dataAfter, key)) {
        return { key, state: 'added', newValue: dataAfter[key] };
      }
      return { key, state: 'removed', oldValue: dataBefore[key] };
    })
);

const diffToString = (diff) => {
  const strDiff = diff.map((e) => {
    switch (e.state) {
      case 'notChanged':
        return `    ${e.key}: ${e.oldValue}`;
      case 'hasChanged':
        return `  + ${e.key}: ${e.newValue}\n  - ${e.key}: ${e.oldValue}`;
      case 'removed':
        return `  - ${e.key}: ${e.oldValue}`;
      case 'added':
        return `  + ${e.key}: ${e.newValue}`;
      default:
        return '';
    }
  }).join('\n');
  return `{\n${strDiff}\n}`;
};

const gendiff = (pathToFileBefore, pathToFileAfter) => {
  const dataBefore = parseFile(pathToFileBefore);
  const dataAfter = parseFile(pathToFileAfter);
  const diff = buildDiff(dataBefore, dataAfter);
  return diffToString(diff);
};

export default gendiff;
