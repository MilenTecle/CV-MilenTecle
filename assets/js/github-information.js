function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    const listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });
    return `<div class="clearfix repo-list">
                 <p>
                    <strong>Repo List:</strong>
                 </p>
                 <ul>
                    ${listItemsHTML.join("\n")}
                 </ul>
            </div>`
}



function fetchGitHubInformation(event) {
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    const username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    const headers = {
     Authorization: "Bearer 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",
    };

    $.when(
        $.ajax({
            url: `https://api.github.com/users/${username}`,
            headers: headers,
            dataType: 'json',
        }),
        $.ajax({
            url: `https://api.github.com/users/${username}/repos`,
            headers: headers,
            dataType: 'json',
        })
).then(
    function(firstResponse, secondResponse) {
        const userData = firstResponse[0];
        const repoData = secondResponse[0];
        $("#gh-user-data").html(userInformationHTML(userData));
        $("#gh-repo-data").html(repoInformationHTML(repoData));
    },
    function(errorResponse) {
        if (errorResponse.status === 404) {
            $("#gh-user-data").html(
                `<h2>No info found for user ${username}</h2>`);
        } else if(errorResponse.status === 403) {
            const resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
            $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleDateString()}</h4>`);
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
        }
    });
}

$(document).ready(fetchGitHubInformation);