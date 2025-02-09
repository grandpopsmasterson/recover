import { RootState } from './store';  // Import RootState for the declaration

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}