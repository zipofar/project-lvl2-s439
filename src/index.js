import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const buildDiff = (dataBefore, dataAfter) => (
  _.union(_.keys(dataBefore), _.keys(dataAfter))
    .map((key) => {
      if (_.has(dataAfter, key) && !_.has(dataBefore, key)) {
        return { key, state: 'added', newValue: dataAfter[key] };
      }
      if (!_.has(dataAfter, key) && _.has(dataBefore, key)) {
        return { key, state: 'removed', oldValue: dataBefore[key] };
      }
      const state = dataAfter[key] === dataBefore[key] ? 'notChanged' : 'hasChanged';
      return {
        key,
        state,
        newValue: dataAfter[key],
        oldValue: dataBefore[key],
      };
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
        throw new Error('State in diff is incorrect');
    }
  }).join('\n');
  return `{\n${strDiff}\n}`;
};

const getParsedData = (filePath) => {
  const ext = path.extname(filePath).substr(1);
  const content = fs.readFileSync(filePath, 'utf8');
  return parse(content, { ext });
};

const gendiff = (pathToFileBefore, pathToFileAfter) => {
  const dataBefore = getParsedData(pathToFileBefore);
  const dataAfter = getParsedData(pathToFileAfter);
  const diff = buildDiff(dataBefore, dataAfter);
  return diffToString(diff);
};

export default gendiff;
