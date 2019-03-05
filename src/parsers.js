import fs from 'fs';
import yaml from 'js-yaml';

const parsers = {
  json: filePath => (JSON.parse(fs.readFileSync(filePath, 'utf8'))),
  yml: filePath => (yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))),
};

export default parsers;
