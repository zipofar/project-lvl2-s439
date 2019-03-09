import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isBoolean(data)) {
    return data;
  }
  if (_.isNumber(data)) {
    return data;
  }
  return `'${data}'`;
};

const renderDiff = (diff, parentKey = '') => {
  const strDiff = diff.map((e) => {
    const newValue = stringify(e.newValue);
    const oldValue = stringify(e.oldValue);
    const { key, state, children } = e;
    const newKey = `${parentKey}${key}`;
    switch (state) {
      case 'notChanged':
        return null;
      case 'changed':
        return `Property '${newKey}' was updated. From ${oldValue} to ${newValue}`;
      case 'removed':
        return `Property '${newKey}' was removed`;
      case 'added':
        return `Property '${newKey}' was added with value: ${newValue}`;
      case 'nested':
        return renderDiff(children, `${newKey}.`);
      default:
        throw new Error(`State |${state}| in diff is incorrect`);
    }
  })
    .filter(e => e !== null)
    .join('\n');
  return strDiff;
};

export default renderDiff;
