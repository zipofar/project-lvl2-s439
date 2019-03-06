import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: data => JSON.parse(data),
  yml: data => yaml.safeLoad(data),
  ini: data => ini.parse(data),
};

const parse = (data = '', params = { ext: 'json' }) => {
  const { ext } = params;
  if (!_.has(parsers, ext)) {
    throw new Error(`No parsers for ${ext} extension`);
  }
  return parsers[ext](data);
};

export default parse;
