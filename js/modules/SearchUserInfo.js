import userMarkup from './UserMarkup.js';
import errorMessageMarkup from './ErrorMessageMarkup.js';
import renderMarkup from './RenderMarkup.js';

export default function searchUserInfo() {
    const input = document.querySelector('[data-js="input"]');
    const inputValue = input.value;     
    const userPromise = fetch(`https://api.github.com/users/${inputValue}`);
    const repositoryPromise = fetch(`https://api.github.com/users/${inputValue}/repos`);
    let responseArr = [];

    userPromise
    .then(response => {
        if (response.ok) {            
            return response.json();       
        } else {
            return Promise.reject({
                status: response.status,
                statusText: response.statusText
            })
        }
    })   
    .then(response => {
        responseArr.push(response);

        // Repository List
        repositoryPromise
        .then(response => response.json())
        .then(response => responseArr.push(response))
        .then(response => userMarkup(responseArr));
    })
    .catch(error => {
        error.status === 404 ? renderMarkup(errorMessageMarkup()) : '';
        throw error;       
    })
}