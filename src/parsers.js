import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (data, type) => {
  if (!_.has(parsers, type)) {
    throw new Error(`No parsers for ${type} extension`);
  }
  return parsers[type](data);
};

export default parse;
