import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { TaskReducer } from './Reducers/TaskReducer';
import { AuthReducer } from './Reducers/AuthReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Auth'],
};

const reducer = combineReducers({
  Tasks: TaskReducer,
  Auth: AuthReducer,
});

const TasksfromStorage = localStorage.getItem('Tasks')
  ? JSON.parse(localStorage.getItem('Tasks'))
  : null;

const initialState = {
  Tasks: {
    Tasks: TasksfromStorage,
  },
};

const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store);

export { store, persistor };
