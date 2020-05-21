import { applyMiddleware, createStore } from "redux";

import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore
} from "react-redux-i18n";
import en from "../i18n/en";
import pt from "../i18n/pt";

import promise from "redux-promise";
import multi from "redux-multi";
import thunk from "redux-thunk";
import reducers from "../main/reducers";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// create store
const store = applyMiddleware(thunk, multi, promise)(createStore)(
  reducers,
  devTools
);

// add translations to Store
export const translationsObject = {
  en: en,
  pt: pt
};

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale("en"));

export default store;
