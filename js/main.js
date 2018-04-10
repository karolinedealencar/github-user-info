const input = document.querySelector('[data-js="input"]');
const btn = document.querySelector('[data-js="btn"]');
const userContainer = document.querySelector('[data-js="user-container"]');

btn.addEventListener('click', searchUserInfo);

function searchUserInfo() {
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
        .then(response => renderUserMarkup(responseArr));
    })
    .catch(error => {
        error.status === 404 ? renderErrorMessage() : '';
        throw error;       
    })
}

function createProfileMarkup(data) {
    return `
        <div class="user__profile">
            <div class="user__avatar">
                <img src="${data.avatar_url}" alt="User Avatar">
            </div>
            <div class="user__profile__info">
                <h1 class="user__profile__name">
                    ${data.name}
                </h1>
                ${data.login ?
                     `<p class="user__profile__login">${data.login}</p>` 
                : ''}
                ${data.bio ? 
                    `<p class="user__profile__bio">${data.bio}</p>`
                : ''}
                <p class="user__profile__p">
                    <span class="user__profile__feat">Followers</span>: 
                    ${data.followers}
                </p>
                <p class="user__profile__p">
                    <span class="user__profile__feat">Following:</span> 
                    ${data.following}
                </p>
                ${data.email ? 
                    `<p class="user__profile__p">
                        <span class="user__profile__feat">E-mail:</span> ${data.email}
                    </p>`
                : ''}
            </div>
        </div>
    `;
}

function createRepositoryMarkup(data) {
    return `
        <div class="user__repository">
            <h2 class="user__repository__title">Repositories</h2>

            <ul class="user__repository__list">
                ${data.map(data => 
                `   <li class="repository__item">
                        <a class="repository__link" href="${data.html_url}" target="_blank" title="${data.name}"> 
                            <header class="repository__header">
                                <h2 class="repository__title">${data.name}</h2>
                                ${data.language ? 
                                    `<p class="repository__language">${data.language}</p>` 
                                : ''}
                                <p class="repository__stars">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                                        <path fill="#efce4a" d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
                                    </svg>
                                    ${data.stargazers_count}                                                                    
                                </p>
                            </header>
                            ${data.description ? 
                                `<p class="repository__desc">${data.description}</p>` 
                            : ''}
                        </a>
                    </li>
                ` 
                ).join('')}
            </ul>

        </div>
    `;
}

function renderUserMarkup(data) {
    const markup = createProfileMarkup(data[0]) + createRepositoryMarkup(data[1]);
    userContainer.innerHTML = markup;
}

function renderErrorMessage() {
    const markup = `<p class="error-message"> User not found. :( </p>`
    userContainer.innerHTML = markup;
}
