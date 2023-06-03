// IGDB API Configuration
const apiBaseUrl = "https://api.igdb.com/v4";

// Polls Data
let polls = [];

function signIn() {
  const signInParams = {
    client_id: 'sexr9olej3av3g770l91o1whk8yvzr',
    client_secret: 'zlf1h9hb3xlztey29pwf8van2widd6',
    grant_type: 'client_credentials'
  }

  fetch('https://id.twitch.tv/oauth2/token', {
    method: "POST",
    body: JSON.stringify(signInParams),
  })
}

document.addEventListener("DOMContentLoaded", function(e) {
  signIn();
})

// Search Games using IGDB API
function searchGames(searchTerm) {
  const searchEndpoint = `${apiBaseUrl}/games`;
  const searchParams = {
    search: searchTerm,
    fields: "name",
    limit: 5,
  };
  const headers = {
    "Client-ID": 'sexr9olej3av3g770l91o1whk8yvzr',
    Authorization: `Bearer zlf1h9hb3xlztey29pwf8van2widd6`,
  };

  return fetch(searchEndpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(searchParams),
  })
    .then((response) => response.json())
    .then((games) => games)
    .catch((error) => {
      console.log("Error searching games:", error);
    });
}

// Add Suggested Game to the Poll
function addSuggestedGame(gameId, gameName) {
  const suggestedGamesList = document.getElementById("suggestedGames");
  const li = document.createElement("li");
  li.textContent = gameName;
  li.dataset.gameId = gameId;
  suggestedGamesList.appendChild(li);
}

// Handle Game Search
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

// Create Poll
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

  // Clear form fields
  document.getElementById("pollForm").reset();
  document.getElementById("searchResults").innerHTML = "";
  suggestedGamesList.innerHTML = "";

  // Add poll to the polls array
  polls.push(poll);

  // Display the polls
  displayPolls();
}

// Vote on a Poll
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

// Display Polls
function displayPolls() {
  const pollsList = document.getElementById("polls");
  pollsList.innerHTML = "";

  polls.forEach((poll) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${poll.title}</strong><ul>${poll.games.map((game) => `<li>${game.name}: ${game.votes} votes</li>`).join("")}</ul>`;
    pollsList.appendChild(li);
  });
}

// Event Listeners
document.getElementById("gameSearch").addEventListener("input", handleGameSearch);
document.getElementById("pollForm").addEventListener("submit", createPoll);
document.getElementById("polls").addEventListener("click", voteOnPoll);
