export const toKebabCase = (string: string): string => {
  return string.replace(/\B([A-Z])/g, '-$1').toLowerCase();
};

/**
 * 将字符串转换为帕斯卡命名法（PascalCase）
 *
 * @param string 待转换的字符串
 * @returns 转换后的帕斯卡命名法字符串
 */
export const toPascalCase = (string: string): string => {
  return string
    .replace(/^./, (match) => match.toUpperCase())
    .replace(/-(\w)/g, (_, p1: string) => {
      return p1?.toUpperCase() ?? '';
    });
};

/**
 * 将字符串转换为驼峰命名法（camelCase）
 *
 * @param string 待转换的字符串
 * @returns 转换后的驼峰命名法字符串
 */
export const toCamelCase = (string: string): string => {
  return string
    .replace(/^./, (match) => match.toLowerCase())
    .replace(/-(\w)/g, (_, p1: string) => {
      return p1?.toUpperCase() ?? '';
    });
};
