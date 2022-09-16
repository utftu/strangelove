import essential from './essential/index.js';
import additional from './additional/index.js';

export * from './essential/index.js';
export * from './additional/index.js';

export default {
  essential,
  additional,
  ...essential,
  ...additional,
};
