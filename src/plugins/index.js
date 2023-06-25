/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import { firebaseApp } from './firebase'
import { VueFire, VueFireAuth } from 'vuefire'

export function registerPlugins (app) {
  loadFonts()
  app
    .use(VueFire, { firebaseApp })
    .use(vuetify)
    .use(router)
    .use(pinia)
    
}
