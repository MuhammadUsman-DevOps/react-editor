import i18next from "i18next"

import common_es from "./es/common.json"
import common_en from "./en/common.json"
import editor_en from "./en/editor.json"
import editor_es from "./es/editor.json"

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      common: common_en,
      editor: editor_en,
    },
    es: {
      common: common_es,
      editor: editor_es,
    },
  },
})
