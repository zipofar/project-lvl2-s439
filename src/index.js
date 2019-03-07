import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './renderers';

const buildDiff = (dataBefore, dataAfter) => (
  _.union(_.keys(dataBefore), _.keys(dataAfter))
    .map((key) => {
      if (_.has(dataAfter, key) && !_.has(dataBefore, key)) {
        return { key, state: 'added', newValue: dataAfter[key] };
      }
      if (!_.has(dataAfter, key) && _.has(dataBefore, key)) {
        return { key, state: 'removed', oldValue: dataBefore[key] };
      }
      if (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])) {
        const children = buildDiff(dataBefore[key], dataAfter[key]);
        return {
          key,
          children,
          state: 'hasChildren',
        };
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


const getParsedData = (filePath) => {
  const ext = path.extname(filePath).substr(1);
  const content = fs.readFileSync(filePath, 'utf8');
  return parse(content, ext);
};

const gendiff = (pathToFileBefore, pathToFileAfter, format) => {
  const dataBefore = getParsedData(pathToFileBefore);
  const dataAfter = getParsedData(pathToFileAfter);
  const diff = buildDiff(dataBefore, dataAfter);
  return render(diff, format);
};

export default gendiff;
