import { alert, defaultModules, defaults, Stack } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/Material.css";
import * as basicLightbox from "basiclightbox";
defaultModules.set(PNotifyMobile, {});
defaults.styling = "material";
defaults.icons = "material";
defaults.sticker = false;
defaults.delay = 2000;
const myStack = new Stack({
  dir1: "down",
  firstpos1: 100,
});

export default class Gallery {
  constructor(
    { form, input, gallery, loadBtn, clearPageBtn },
    API_KEY,
    template
  ) {
    this.form = form;
    this.input = input;
    this.clearPageBtn = clearPageBtn;
    this.gallery = gallery;
    this.loadBtn = loadBtn;
    this.API_KEY = API_KEY;
    this.page = 0;
    this.template = template;
    this.query = "";
  }

  addListeners = () => {
    this.form.addEventListener("submit", this.onSubmitForm);
    this.clearPageBtn.addEventListener("click", this.onClearPageBtn);
    this.loadBtn.addEventListener("click", this.onLoadClick);
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    let query = event.target.elements.query.value;
    if (query.toLowerCase() === this.query.toLowerCase()) {
      this.page += 1;
    } else {
      this.query = query;
      this.page = 1;
    }
    this.renderPage(query);
    this.input.value = "";
  };

  onClearPageBtn = (event) => {
    event.preventDefault();
    this.gallery.innerHTML = "";
    this.input.value = "";
    this.page = 0;
    this.query = "";
  };

  onLoadClick = () => {
    this.page += 1;
    this.renderPage(this.query);
  };

  renderPage = (query) => {
    let URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${this.page}&per_page=12&key=${this.API_KEY}`;
    return fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        if (!response.hits.length) {
          alert({
            text: `Cant find pictures by \"${this.query}\"
                        try again`,
            stack: myStack,
          });
        }
        this.gallery.insertAdjacentHTML(
          "beforeend",
          this.template(response.hits)
        );
      })
      .catch((err) => console.log(err));
  };
}
