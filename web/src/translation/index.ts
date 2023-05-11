import { createI18n } from "vue-i18n";

import es from './es.json';

export const i18n = createI18n({
    locale: 'es',
    messages: {es},
    fallbackLocale: 'es',
    legacy: false
});
