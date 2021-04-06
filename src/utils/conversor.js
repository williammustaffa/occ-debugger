function writeSpacingBoolean(value) {
  return value ? '\n\n' : '\n';
}

function readSpacingBoolean(value) {
  return value === '\n\n';
}

export const converter = {
  writeSpacingBoolean,
  readSpacingBoolean,
};
