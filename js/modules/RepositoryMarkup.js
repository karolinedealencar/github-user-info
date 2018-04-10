export default function repositoryMarkup(data) {
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
