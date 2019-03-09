import _ from 'lodash';
import prettyRender from './prettyRenderer';
import plainRender from './plainRenderer';
import jsonRender from './jsonRenderer';

const renderers = {
  plain: plainRender,
  json: jsonRender,
  pretty: prettyRender,
};

const render = (ast, format) => {
  if (!_.has(renderers, format)) {
    throw new Error(`Renderer ${format} is not defined`);
  }
  return renderers[format](ast);
};

export default render;
