import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

export const StorefrontContext = createContext({});
export const useStorefront = () => useContext(StorefrontContext);