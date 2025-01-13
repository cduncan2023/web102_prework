// Import the JSON data about the crowd-funded games from the games.js file
import GAMES_DATA from './games.js';

// Create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// Remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 */
const gamesContainer = document.getElementById("games-container");

// Create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // Create a new div element for the game card
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        // Set the inner HTML using a template literal
        gameCard.innerHTML = `
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Amount Pledged: $${game.pledged.toLocaleString()}</p>
            <img src="${game.img}" alt="${game.name}" class="game-img"/>
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function to add all games to the page initially
addGamesToPage(GAMES_JSON);

/*****************************************************************************
 * Challenge 4: Create summary statistics at the top of the page
 */
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

// Total Contributions (number of backers)
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// Total Raised (sum of pledged)
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// Number of Games
gamesCard.innerHTML = GAMES_JSON.length;

/*****************************************************************************
 * Challenge 6: Add a summary message about unfunded games
 */

// Calculate the total number of unfunded games using reduce
const unfundedGamesCount = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0);

// Create a grammatically correct summary string using a template literal and ternary operator
const displayStr = `
    A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} game${GAMES_JSON.length > 1 ? 's' : ''}.
    Currently, ${unfundedGamesCount} game${unfundedGamesCount !== 1 ? 's remain' : ' remains'} unfunded.
    We need your help to fund these amazing games!
`;

// Create a new paragraph element and add the summary string
const descriptionContainer = document.getElementById("description-container");
const summaryParagraph = document.createElement('p');
summaryParagraph.textContent = displayStr;

// Append the paragraph to the descriptionContainer
descriptionContainer.appendChild(summaryParagraph);

/*****************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 */

// Function to show only unfunded games (pledged < goal)
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);  // Clear the current games from the page
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);  // Filter unfunded games

    // Log the number of unfunded games
    console.log(`Number of unfunded games: ${unfundedGames.length}`);

    // Add the unfunded games to the page
    addGamesToPage(unfundedGames);
}

// Function to show only funded games (pledged >= goal)
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

// Function to show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

/*****************************************************************************
 * Event Listeners for filter buttons
 */
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Event listener for "Unfunded" button
unfundedBtn.addEventListener("click", filterUnfundedOnly);

// Event listener for "Funded" button
fundedBtn.addEventListener("click", filterFundedOnly);

// Event listener for "All Games" button
allBtn.addEventListener("click", showAllGames);

/*****************************************************************************
 * Challenge 7: Select & display the top 2 games
 */
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort games by amount pledged
const sortedGames = [...GAMES_JSON].sort((item1, item2) => item2.pledged - item1.pledged);

// Destructure to get the top 2 games
const [firstGame, secondGame] = sortedGames;

// Create new elements for the top 2 games and append them to their containers
const firstGameElement = document.createElement('p');
firstGameElement.textContent = `Top Funded Game: ${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement('p');
secondGameElement.textContent = `Second Most Funded Game: ${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);
