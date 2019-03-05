import _ from 'lodash';
import path from 'path';
import parse from './parsers';

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

const getContent = (filePath) => {
  const ext = path.extname(filePath).substr(1);
  return parse[ext](filePath);
};

const gendiff = (pathToFileBefore, pathToFileAfter) => {
  const dataBefore = getContent(pathToFileBefore);
  const dataAfter = getContent(pathToFileAfter);
  const diff = buildDiff(dataBefore, dataAfter);
  return diffToString(diff);
};

export default gendiff;
