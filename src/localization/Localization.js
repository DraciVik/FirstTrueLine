import i18n, {
  LanguageDetectorAsyncModule,
  Services,
  InitOptions,
} from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize';
import en from './en';
import mk from './mk';

export const AVAILABLE_LANGUAGES = {
  en,
  mk,
};

const AVALAILABLE_LANG_CODES = Object.keys(AVAILABLE_LANGUAGES);

const languageDetector = {
  type: 'languageDetector',
  // If this is set to true, your detect function receives a callback function that you should call with your language,
  //useful to retrieve your language stored in AsyncStorage for example
  async: true,
  init: (_services, _detectorOptions, _i18nextOptions) => {
    /* use services and options */
  },
  detect: (callback) => {
    AsyncStorage.getItem('APP_LANG', (err, lng) => {
      //Handle error fetching stored data or no data found
      if (err || !lng) {
        if (err) {
          console.log('Error fetching "APP_LANG" from async store', err);
        } else {
          console.log(
            'No language is set, choosing the best available or English as fallback',
          );
        }
        const bestLng = RNLocalize.findBestAvailableLanguage(
          AVALAILABLE_LANG_CODES,
        );

        callback(bestLng?.languageTag ?? 'en');
        return;
      }
      callback(lng);
    });
  },
  cacheUserLanguage: (lng) => {
    AsyncStorage.setItem('APP_LANG', lng);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: AVAILABLE_LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });
