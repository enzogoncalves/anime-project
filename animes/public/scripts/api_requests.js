function getAnimes(sort) {
  let query = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
    }
    media(type: ANIME, sort: ${sort}) {
      id
      title {
        english
        romaji
      }
      coverImage {
        extraLarge
        large
      }
      episodes
    }
  }
}
`;

  let variables = {
    page: 0,
    perPage: 30,
  };

  let url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };


  return {url, options}
}

function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleError(error) {
  alert("Error, check console");
  console.error(error);
}

export {getAnimes, handleResponse, handleError}