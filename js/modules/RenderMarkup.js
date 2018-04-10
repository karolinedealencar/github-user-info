export default function renderMarkup(markup) {
    const userContainer = document.querySelector('[data-js="user-container"]');
    userContainer.innerHTML = markup;
}