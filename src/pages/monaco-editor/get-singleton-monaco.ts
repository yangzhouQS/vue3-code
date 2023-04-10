import loader, { Monaco } from '@monaco-editor/loader';
import isEqual from 'lodash/isEqual';

export const getSingletonMonaco = (() => {
  let monaco: Monaco;
  let prevOptions: any;
  return async (options?: any) => {
    if (!monaco || !isEqual(prevOptions, options)) {
      const hasConfig = Object.keys(options || {}).length > 0;
      loader.config(
        hasConfig
          ? options
          : {
            paths: {
              vs: 'https://g.alicdn.com/code/lib/monaco-editor/0.33.0/min/vs',
            },
          },
      );
      // eslint-disable-next-line require-atomic-updates
      monaco = await loader.init();
      // eslint-disable-next-line require-atomic-updates
      prevOptions = options;
    }
    return monaco;
  };
})();
