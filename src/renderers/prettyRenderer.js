import _ from 'lodash';

const calcIndent = level => (' '.repeat((level * 4) + 2));

const stringify = (data, level) => {
  if (!_.isObject(data)) {
    return data;
  }
  const content = _.keys(data).map((k) => {
    const innerValue = _.isObject(data[k]) ? stringify(data[k], level + 1) : data[k];
    return `  ${calcIndent(level + 1)}${k}: ${innerValue}`;
  }).join('\n');

  return `{\n${content}\n${calcIndent(level)}  }`;
};

const renderDiff = (diff, level = 0) => {
  const strDiff = diff.map((e) => {
    const newValue = stringify(e.newValue, level);
    const oldValue = stringify(e.oldValue, level);
    const { key, state, children } = e;
    const indent = calcIndent(level);
    switch (state) {
      case 'notChanged':
        return `${indent}  ${key}: ${oldValue}`;
      case 'hasChanged':
        return [
          `${indent}+ ${key}: ${newValue}`,
          `${indent}- ${key}: ${oldValue}`,
        ];
      case 'removed':
        return `${indent}- ${key}: ${oldValue}`;
      case 'added':
        return `${indent}+ ${key}: ${newValue}`;
      case 'nested':
        return `${indent}  ${key}: {\n${renderDiff(children, level + 1)}\n${indent}  }`;
      default:
        throw new Error('State in diff is incorrect');
    }
  });
  const result = _.flatten(strDiff).join('\n');
  return level === 0 ? `{\n${result}\n}` : result;
};

export default renderDiff;
