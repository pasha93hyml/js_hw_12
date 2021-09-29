import "./styles.css";
import renderTemplate from "./templates/template.hbs";
import refs from './js/refs.js'
import Gallery from './js/galleryClass.js'
const API_KEY = '22979359-6025158715709856931145b12'
new Gallery(refs, API_KEY, renderTemplate).addListeners()