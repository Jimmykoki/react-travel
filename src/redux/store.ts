import { createStore, combineReducers, applyMiddleware } from 'redux';
import languageReducer from './language/languageReducer';
import recommendProdutsReducer from './recommendProduts/recommendProdutsReducer';
import thunk from 'redux-thunk';
import { actionLog } from './middlewares/actionLog';

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProduts: recommendProdutsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

export type RootState = ReturnType<typeof store.getState>;

export default store;
