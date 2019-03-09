import _ from 'lodash';

const parseNumber = (value) => {
  if (_.isObject(value)) {
    return _.keys(value).reduce((acc, k) => {
      const newValue = parseNumber(value[k]);
      return { ...acc, [k]: newValue };
    }, {});
  }
  return _.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10);
};

const walkByAst = (ast, fn) => (
  ast.map((e) => {
    const newValue = fn(e.newValue);
    const oldValue = fn(e.oldValue);
    const { state, children } = e;
    switch (state) {
      case 'notChanged':
        return { ...e, oldValue };
      case 'changed':
        return { ...e, newValue, oldValue };
      case 'removed':
        return { ...e, oldValue };
      case 'added':
        return { ...e, newValue };
      case 'nested':
        return { ...e, children: walkByAst(children, fn) };
      default:
        throw new Error('State in ast is incorrect');
    }
  })
);

const renderDiff = diff => JSON.stringify(walkByAst(diff, parseNumber));

export default renderDiff;
