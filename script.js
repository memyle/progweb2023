const CLIENT_ID = 'sexr9olej3av3g770l91o1whk8yvzr';
const CLIENT_SECRET = 'zlf1h9hb3xlztey29pwf8van2widd6';
const AUTH_URL = 'https://id.twitch.tv/oauth2/authorize';
const IGDB_API_URL = 'https://api.igdb.com/v4/games';
const TWITCH_REDIRECT_URI = 'http://localhost:8080'; // Replace with your redirect URI

let polls = [];

// Twitch Authentication
function twitchLogin() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: TWITCH_REDIRECT_URI,
    response_type: 'token',
    scope: 'user:read:email',
  });

  window.location.href = `${AUTH_URL}?${params}`;
}

function checkAccessToken() {
  const { access_token } = parseHashParams();
  if (access_token) {
    localStorage.setItem('access_token', access_token);
    showContent();
  }
}

function parseHashParams() {
  const hashParams = {};
  const hash = window.location.hash.substring(1);
  const params = hash.split('&');

  for (let param of params) {
    const [key, value] = param.split('=');
    hashParams[key] = decodeURIComponent(value);
  }

  return hashParams;
}

async function searchGames(searchTerm) {
  const response = await fetch(IGDB_API_URL, {
    method: 'POST',
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: 'fields name, cover.url; limit 10; sort popularity desc;',
  });

  const data = await response.json();

  if (data.error) {
    console.error('Error fetching games:', data.error);
    return;
  }

  const gamesList = document.getElementById('games-list');
  gamesList.innerHTML = '';

  data.forEach(game => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const name = document.createElement('p');

    img.src = `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`;
    img.alt = game.name;
    name.textContent = game.name;

    li.appendChild(img);
    li.appendChild(name);
    gamesList.appendChild(li);
  });
}

function showContent() {
  const loginContainer = document.getElementById('login-container');
  const contentContainer = document.getElementById('content-container');

  loginContainer.style.display = 'none';
  contentContainer.style.display = 'block';

  fetchPopularGames();
}


// TODO Needs Work
function addSuggestedGame(gameId, gameName) {
  const suggestedGamesList = document.getElementById("suggestedGames");
  const li = document.createElement("li");
  li.textContent = gameName;
  li.dataset.gameId = gameId;
  suggestedGamesList.appendChild(li);
}

function handleGameSearch(event) {
  const searchTerm = event.target.value;
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  if (searchTerm.length < 3) {
    return;
  }

  searchGames(searchTerm)
    .then((games) => {
      games.forEach((game) => {
        const p = document.createElement("p");
        p.textContent = game.name;
        p.addEventListener("click", () => {
          addSuggestedGame(game.id, game.name);
        });
        searchResults.appendChild(p);
      });
    })
    .catch((error) => {
      console.log("Error searching games:", error);
    });
}

function createPoll(event) {
  event.preventDefault();

  const pollTitle = document.getElementById("pollTitle").value;
  const suggestedGamesList = document.getElementById("suggestedGames");
  const suggestedGames = Array.from(suggestedGamesList.getElementsByTagName("li"));

  if (!pollTitle || suggestedGames.length === 0) {
    return;
  }

  const poll = {
    title: pollTitle,
    games: suggestedGames.map((game) => ({
      id: game.dataset.gameId,
      name: game.textContent,
      votes: 0,
    })),
  };

  document.getElementById("pollForm").reset();
  document.getElementById("searchResults").innerHTML = "";
  suggestedGamesList.innerHTML = "";

  polls.push(poll);

  displayPolls();
}

function voteOnPoll(event) {
  const pollId = event.target.dataset.pollId;
  const gameId = event.target.dataset.gameId;

  polls.forEach((poll) => {
    if (poll.title === pollId) {
      const game = poll.games.find((game) => game.id === gameId);
      if (game) {
        game.votes++;
        displayPolls();
      }
    }
  });
}

function displayPolls() {
  const pollsList = document.getElementById("polls");
  pollsList.innerHTML = "";

  polls.forEach((poll) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${poll.title}</strong><ul>${poll.games.map((game) => `<li>${game.name}: ${game.votes} votes</li>`).join("")}</ul>`;
    pollsList.appendChild(li);
  });
}

document.getElementById("gameSearch").addEventListener("input", handleGameSearch);
document.getElementById("pollForm").addEventListener("submit", createPoll);
document.getElementById("polls").addEventListener("click", voteOnPoll);

document.getElementById('login-button').addEventListener('click', twitchLogin);
window.addEventListener('load', checkAccessToken);