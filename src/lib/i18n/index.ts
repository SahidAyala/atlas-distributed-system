import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enAudit from './locales/en/audit.json'
import enAuth from './locales/en/auth.json'
import enCommon from './locales/en/common.json'
import enErrors from './locales/en/errors.json'
import enEvents from './locales/en/events.json'
import enWorkflows from './locales/en/workflows.json'

// Namespaces map 1:1 to features — add a new namespace when adding a feature.
// Default namespace is 'common'; feature components pass ns when calling useTranslation.
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        events: enEvents,
        workflows: enWorkflows,
        audit: enAudit,
        errors: enErrors,
      },
    },
    defaultNS: 'common',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
