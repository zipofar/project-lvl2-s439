import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: filePath => (JSON.parse(fs.readFileSync(filePath, 'utf8'))),
  yml: filePath => (yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))),
  ini: filePath => (ini.parse(fs.readFileSync(filePath, 'utf8'))),
};

export default parsers;
