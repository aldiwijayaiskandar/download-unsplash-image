import {combineReducers} from '@reduxjs/toolkit';

import {downloadReducer} from '@store/reducers';

export const rootReducer = combineReducers({
  // download
  download: downloadReducer,
});
