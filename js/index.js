const init = function () {
    loadForm();
  };
  
  const loadForm = function () {
    const formElement = document.querySelector("form#github-form");
    formElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = document.querySelector("input#search").value;
      const userList = document.querySelector("ul#user-list");
      userList.innerHTML="";
      fetch(`https://api.github.com/search/users?q=${input}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: "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",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          data.items.forEach((item) => {
            const userName = document.createElement("li");
            userName.textContent = item.login;
            userList.appendChild(userName);
  
            const avatar = document.createElement("img");
            avatar.src = item.avatar_url;
            avatar.alt = item.login;
            userList.appendChild(avatar);
  
            const profile = document.createElement("li");
            const anchorTag = document.createElement("a");
            anchorTag.href = item.html_url;
            anchorTag.textContent = item.html_url; 
            profile.appendChild(anchorTag);
            userList.appendChild(profile);
  
            
            clickEvent(item.login, avatar);
          });
        });
    });
    
  };
  
  const clickEvent = function (login, avatar) {
    avatar.addEventListener("click", function () {
      const repoList = document.querySelector("ul#repos-list");
      repoList.innerHTML="";
      fetch(`https://api.github.com/users/${login}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: "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",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.forEach((repo) => {
            const repoListItem = document.createElement("li");
            repoListItem.textContent = repo.name; 
            repoList.appendChild(repoListItem);
          });
        });
    });
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    init();
  });
  