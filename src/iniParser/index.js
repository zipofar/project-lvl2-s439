import _ from 'lodash';
import ini from 'ini';

const parseNumber = (value) => {
  if (_.isArray(value)) {
    return value.map(parseNumber);
  }
  if (_.isObject(value)) {
    return _.keys(value).reduce((acc, k) => {
      const newValue = parseNumber(value[k]);
      return { ...acc, [k]: newValue };
    }, {});
  }
  return _.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10);
};

const parse = data => parseNumber(ini.parse(data));

export default parse;
