import i18n from 'i18next';
import { CHANGE_LANGUAGE, LanguageActionTypes } from './languageActions';

export interface LanguageState {
  language: 'en' | 'zh';
  languageList: { name: string; code: string }[];
}

const initialState: LanguageState = {
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: 'English', code: 'en' },
  ],
};

// ES6 if arguement is undefined or null it will use the default value
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action: LanguageActionTypes) => {
  // console.log('action', action);
  // console.log('state', state);
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload);
      // ES6 spread operator
      return { ...state, language: action.payload };
    default:
      return state;
  }
};
