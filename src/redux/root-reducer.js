import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import clientReducer from './clients/client.reducers';
import notifyReducer from './notify/notify.reducers';
import settingsReducer from './settings/settings.reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings']
};

const rootReducer = combineReducers({
  client: clientReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

export default persistReducer(persistConfig, rootReducer);

// export default rootReducer;
