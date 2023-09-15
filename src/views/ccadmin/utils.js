import { getDOMConfigs } from '@utils/configs-dom';

const REMOTE_PATH = 'views/ccadmin';

export function buildRemoteModulePath(path) {
  const { extensionPath } = getDOMConfigs() || {};
  return `${extensionPath}${REMOTE_PATH}/${path}`;
}

export function buildRemoteViewPath(path) {
  const { extensionPath } = getDOMConfigs() || {};
  return (`${extensionPath}${REMOTE_PATH}/${path}`).replace(/\.html/, '');
}