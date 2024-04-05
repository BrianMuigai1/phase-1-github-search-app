const searchEndPoint = "https://api.github.com/search/users?q=octocat";
const userReposEndPoint = "https://api.github.com/users/";

function getData(url, callback) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
}

function displayUsers(users) {
  const userListContainer = document.getElementById("userList");

  userListContainer.innerHTML = "";

  const userList = document.createElement("ul");

  users.forEach((user) => {
    const listItem = document.createElement("li");
    const avatar = document.createElement("img");
    avatar.src = user.avatar_url;
    avatar.alt = user.login;
    listItem.appendChild(avatar);

    const username = document.createElement("p");
    username.textContent = `Username: ${user.login}`;
    listItem.appendChild(username);

    const profileLink = document.createElement("a");
    profileLink.href = user.html_url;
    profileLink.textContent = "View Profile";
    listItem.appendChild(profileLink);

    listItem.addEventListener("click", () => {
      getUserRepositories(user.login);
    });

    userList.appendChild(listItem);
  });

  userListContainer.appendChild(userList);
}

function getUserRepositories(username) {
  const repoUrl = userReposEndPoint + username + "/repos";
  getData(repoUrl, function (error, data) {
    if (error) {
      console.error("Error getting repositories:", error.message);
    } else {
      console.log("Repositories fetched:", data);

      displayRepositories(data);
    }
  });
}

function displayRepositories(repos) {
  const repoListContainer = document.getElementById("repoList");

  repoListContainer.innerHTML = "";

  const repoList = document.createElement("ul");

  repos.forEach((repo) => {
    const listItem = document.createElement("li");
    const repoName = document.createElement("p");
    repoName.textContent = `Repository: ${repo.name}`;
    listItem.appendChild(repoName);
    repoList.appendChild(listItem);
  });

  repoListContainer.appendChild(repoList);
}

getData(searchEndPoint, function (error, data) {
  if (error) {
    console.error("Error getting data:", error.message);
  } else {
    console.log("Data fetched:", data);

    displayUsers(data.items);
  }
});
