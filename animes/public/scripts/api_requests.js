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

function getAnime(id) {
  let query = `
    query ($id: Int) {
      Media(id: $id) {
        id
        title {
          english
          romaji
          native
        }
        coverImage {
          large
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
        rankings{
          rank
          context
          allTime
          season
          year
        }
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
      }
    }
  `
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

function getAnimeById(id) { 
  let query = `
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
  `;

  const variables = {
    id: id
  }
  
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

export {getAnimes, getAnime, getAnimeById, handleResponse, handleError}