import _ from 'lodash';

const initObject = {
  notChanged: {},
  changedNew: {},
  changedOld: {},
  added: {},
  removed: {},
  nested: {},
};

const parseNumber = (value) => {
  if (_.isObject(value)) {
    return _.keys(value).reduce((acc, k) => {
      const newValue = parseNumber(value[k]);
      return { ...acc, [k]: newValue };
    }, {});
  }
  return _.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10);
};

const buildAst = (diff) => {
  const ast = diff.reduce((acc, e) => {
    const newValue = parseNumber(e.newValue);
    const oldValue = parseNumber(e.oldValue);
    const {
      key,
      state,
      children,
    } = e;
    const {
      notChanged,
      changedOld,
      changedNew,
      removed,
      added,
      nested,
    } = acc;
    switch (state) {
      case 'notChanged':
        return { ...acc, notChanged: { ...notChanged, [key]: oldValue } };
      case 'changed':
        return {
          ...acc,
          changedOld: { ...changedOld, [key]: oldValue },
          changedNew: { ...changedNew, [key]: newValue },
        };
      case 'removed':
        return { ...acc, removed: { ...removed, [key]: oldValue } };
      case 'added':
        return { ...acc, added: { ...added, [key]: newValue } };
      case 'nested':
        return { ...acc, nested: { ...nested, [key]: buildAst(children) } };
      default:
        throw new Error('State in diff is incorrect');
    }
  }, { ...initObject });
  return ast;
};

const renderDiff = diff => JSON.stringify(buildAst(diff));

export default renderDiff;
