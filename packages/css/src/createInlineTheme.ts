import type { Contract, MapLeafNodes } from './types';
import { walkObject, get } from './utils';

export function createInlineTheme<ThemeContract extends Contract>(
  themeVars: ThemeContract,
  tokens: MapLeafNodes<ThemeContract, string>,
) {
  const styles: { [cssVarName: string]: string } = {};

  /* TODO 
    - validate new variables arn't set
    - validate arrays have the same length as contract
  */
  walkObject(tokens, (value, path) => {
    const varName = get(themeVars, path);

    styles[varName.substring(4, varName.length - 1)] = String(value);
  });

  Object.defineProperty(styles, 'toString', {
    value: function () {
      return Object.keys(this)
        .map((key) => `${key}:${this[key]}`)
        .join(';');
    },
    writable: false,
  });

  return styles;
}
