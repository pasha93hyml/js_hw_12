import formTemplate from "../templates/form.hbs";
document.body.insertAdjacentHTML("afterbegin", formTemplate());

export default {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input[type="text"]'),
    clearPageBtn: document.querySelector('button[type="reset"]'),
    gallery: document.querySelector('.gallery'),
    loadBtn: document.querySelector('button[type="button"]'),
}