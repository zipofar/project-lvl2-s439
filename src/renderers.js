import _ from 'lodash';
import plain from './plainRenderer';

const renderers = {
  json: null,
  plain,
  pretty: null,
};

const render = (ast, format) => {
  if (!_.has(renderers, format)) {
    throw new Error(`Renderer ${format} is not defined`);
  }
  return renderers[format](ast);
};

export default render;
