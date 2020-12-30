import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

export const ConfigsContext = createContext({});
export const useConfigs = () => useContext(ConfigsContext);