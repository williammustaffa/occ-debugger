function assign(target, obj, prefix = '') {
  const exclude = ['__ko_mapping__', 'ko'];

  for(const key in obj) {
    if (!exclude.includes(key)) {
      target[`${prefix}${key}`] = obj[key];
    }
  }
}

export const helpers = { assign };