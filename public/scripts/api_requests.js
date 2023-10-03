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
        romaji
      }
      coverImage {
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

function getAnimeById(id, isBasicsAnimeData = true) {
  let query = '';

  if(isBasicsAnimeData) {
    query = `
      query ($id: Int) {
        Media(id: $id) {
          id
          title {
            romaji
          }
          coverImage {
            large
          }
          episodes
        }
      }
    `
  } else {
    query = `
      query ($id: Int) {
        Media(id: $id) {
          id
          title {
            english
            romaji
            native
          }
          coverImage {
            large,
            color
          }
          bannerImage
          episodes
          duration
          genres
          isAdult
          description
          averageScore
          popularity
          favourites
          format
          source
          status
          hashtag
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          season
          seasonYear
          meanScore
          nextAiringEpisode {
            airingAt
            timeUntilAiring
            episode
          }
          studios {
            edges {
              node {
                name 
              }
              isMain
            }
          }
          synonyms
          relations {
            nodes {
              id
              title {
                romaji
              },
              coverImage {
                medium
              }
              format
              status
            }
            edges {
              relationType
            }
          }
          characters(page:1, perPage: 6, sort: RELEVANCE){
            edges {
              id
              role
              voiceActors(sort: RELEVANCE) {
                id
                name {
                  full
                }
                image {
                  large
                }
                languageV2
              }
              node {
                id
                name {
                  full
                }
                image {
                  large
                }
              }
            }
          }
          staff (sort:RELEVANCE, page: 1, perPage: 4){
            edges {
              role
              node {
                id
                name {
                  full
                }
                image {
                  medium
                }
              }
            }
          }
        }
      }
    `
  }
;

  let variables = {
    id: id
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

export {getAnimes, getAnimeById, handleResponse, handleError}