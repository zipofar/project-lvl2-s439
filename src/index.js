import fs from 'fs';
import _ from 'lodash';

const parseFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
};

const buildDiff = (dataBefore, dataAfter) => {
  const addedKeys = Object.keys(dataAfter)
    .filter(key => (_.has(dataBefore, key) === false))
    .map(key => ({ key, state: 'added', newValue: dataAfter[key] }));

  const removedKeys = Object.keys(dataBefore)
    .filter(key => (_.has(dataAfter, key) === false))
    .map(key => ({ key, state: 'removed', oldValue: dataBefore[key] }));

  const changedKeys = Object.keys(dataBefore)
    .filter(key => (_.has(dataAfter, key)))
    .map((key) => {
      const state = dataAfter[key] === dataBefore[key] ? 'notChanged' : 'hasChanged';
      return {
        key,
        state,
        newValue: dataAfter[key],
        oldValue: dataBefore[key],
      };
    });
  return _.concat(addedKeys, removedKeys, changedKeys);
};

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
