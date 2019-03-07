import _ from 'lodash';

const indent = 4;
const bl = gaps => ' '.repeat(gaps);

const stringify = (data, gaps) => {
  if (_.isObject(data)) {
    const content = _.keys(data).map((k) => {
      const innerValue = _.isObject(data[k]) ? stringify(data[k], gaps + indent) : data[k];
      return `  ${bl(gaps)}  ${k}: ${innerValue}`;
    }).join('\n');

    return `{\n${content}\n${bl(gaps)}}`;
  }
  return data;
};

const renderDiff = (diff, gaps = 0) => {
  const strDiff = diff.map((e) => {
    const newValue = stringify(e.newValue, gaps + indent);
    const oldValue = stringify(e.oldValue, gaps + indent);
    switch (e.state) {
      case 'notChanged':
        return `  ${bl(gaps)}  ${e.key}: ${oldValue}`;
      case 'hasChanged':
        return `  ${bl(gaps)}+ ${e.key}: ${newValue}\n  ${bl(gaps)}- ${e.key}: ${oldValue}`;
      case 'removed':
        return `  ${bl(gaps)}- ${e.key}: ${oldValue}`;
      case 'added':
        return `  ${bl(gaps)}+ ${e.key}: ${newValue}`;
      case 'hasChildren':
        return `  ${bl(gaps)}  ${e.key}: ${renderDiff(e.children, gaps + indent)}`;
      default:
        throw new Error('State in diff is incorrect');
    }
  }).join('\n');
  return `{\n${strDiff}\n${bl(gaps)}}`;
};

export default renderDiff;
