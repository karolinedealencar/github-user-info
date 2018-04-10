export default function profileMarkup(data) {
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