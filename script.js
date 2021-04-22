const playButton = document.getElementById("play");
const mainGame = document.getElementById("mainGame");
const playerContainer = document.getElementById("playerContainer");
const aiContainer = document.getElementById("aiContainer");
const hitButton = document.getElementById("hit");
const holdButton = document.getElementById("hold");
let alphabet = "CDHS";
let cardSuit = "JQKA";
let cardSuitArray = [];
let cards = ["2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S", "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS", "AC", "AD", "AH", "AS"]
let playerHand = [];
let playerCard = [];
let playerTotal;
let playerAce;
let playerAceCheckNum = 0;
let counter = 1;
let aiCounter = 1;
let aiHand = [];
let aiCard = [];
let aiTotal;
let aiAce;
let aiAceCheckNum = 0;

const randomCardNum = () => {
    let num = Math.floor(Math.random() * 13) + 2;
    if (num === 11) {
        num = "J";
        return num;
    } else if (num === 12) {
        num = "Q";
        return num;
    } else if (num === 13) {
        num = "K";
        return num;
    } else if (num === 14) {
        num = "A";
        return num;
    } else {
        return num;
    }
}

const randomCardSuit = () => {
    let alphabetArray = alphabet.split("");
    let num = Math.floor(Math.random() * 4);
    return alphabetArray[num];
}

const randomCard = () => {
	let generatedCard = `${randomCardNum()}${randomCardSuit()}`;
    let indexNum = cards.indexOf(generatedCard);
    if (indexNum == -1) {
        return randomCard();
    } else {
        cards.splice(indexNum, 1);
        return generatedCard;
	}
}

playButton.addEventListener("click", () => {
    document.getElementById("startScreen").remove();
    mainGame.style.display = "grid";

    let random1 = randomCard();
    let random2 = randomCard();
    playerHand.push(random1, random2);
    playerCard.push(document.createElement("img"), document.createElement("img"));
    playerCard[0].src = `cards/${random1}.png`;
    playerContainer.appendChild(playerCard[0]);
    playerCard[1].src = `cards/${random2}.png`;
    playerContainer.appendChild(playerCard[1]);
    playerCardCount(1);
    gameState();
    console.log(`player total is ${playerTotal}`);

    aiRandom1 = randomCard();
    aiRandom2 = randomCard();
    aiHand.push(aiRandom1, aiRandom2);
    aiCard.push(document.createElement("img"), document.createElement("img"));
    aiCard[0].src = `cards/${aiRandom1}.png`;
    aiContainer.appendChild(aiCard[0]);
    aiCard[1].src = `cards/greyBack.png`;
    aiContainer.appendChild(aiCard[1]);
});

const convertLetter = (playerHand) => {
    cardSuitArray = cardSuit.split("");
    for (let i = 0; i < cardSuitArray.length; i++) {
        if (cardSuitArray[i] == playerHand) {
            if (cardSuitArray[i] == "A") {
                return 11;
            } else if (cardSuitArray[i] == "J" || cardSuitArray[i] == "Q" || cardSuitArray[i] == "K") {
                return 10;
            }
        }
    }
    return parseInt(playerHand);
}

const winLose = (x) => {
    mainGame.style.display = "none";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    const header = document.createElement("h1");
    document.body.appendChild(header);
    header.innerHTML = `You ${x}! <br> With a total of ${playerTotal}`;
    header.style.fontSize = "4vw";
    header.style.color = "white"
}

const gameState = () => {
    if (playerTotal > 21) {
        playerCheckA(playerAceCheckNum);
        if (playerAce == false) {
            winLose("Lose");
        } else {
            playerTotal -= 10;
        }
    } else if (aiTotal > 21) {
        aiCheckA(aiAceCheckNum);
        if (aiAce == false) {
            winLose("Win");
        } else {
            aiTotal -= 10;
        }
    } else if (playerTotal == aiTotal) {
        winLose("Draw");
    } else if (aiTotal > playerTotal) {
        winLose("Lose");
    }
}

const cardGenerator = (i) => {
    let random = randomCard();
    playerHand.push(random);
    playerCard.push(document.createElement("img"));
    playerCard[i + 1].src = `cards/${random}.png`;
    playerContainer.appendChild(playerCard[i + 1])
}

const aiCardGenerator = (i) => {
    let aiRandom = randomCard();
    aiHand.push(aiRandom);
    aiCard.push(document.createElement("img"));
    aiCard[i + 1].src = `cards/${aiRandom}.png`;
    aiContainer.appendChild(aiCard[i + 1])
}

const playerCardCount = (i) => {
    if (playerHand[i - 1].length == 3) {
        let tempNum1 = playerHand[i - 1].slice(0, 2);
        playerTotal = convertLetter(playerHand[i][0]) + convertLetter(tempNum1);
        if (playerHand[i].length == 3) {
            let tempNum2 = playerHand[i].slice(0, 2);
            playerTotal = convertLetter(tempNum2) + convertLetter(tempNum1);
        }
    } else if (playerHand[i].length == 3) {
        let tempNum2 = playerHand[i].slice(0, 2);
        playerTotal = convertLetter(tempNum2) + convertLetter(playerHand[i - 1][0]);
    } else {
        playerTotal = convertLetter(playerHand[i][0]) + convertLetter(playerHand[i - 1][0]);
    }
}

const playerCheckA = (n) => {
    for (let y = 0; y < cardSuitArray.length; y++) {
        for (let x = n; x < playerHand.length; x++) {
            if (cardSuitArray[y] == playerHand[x][0]) {
                if (playerTotal > 21 && cardSuitArray[y] == "A") {
                    console.log(`card is Ace and total is higher than 21`)
                    playerAce = true;
                    playerAceCheckNum += 1;
                    return playerHand[x] = "removed";
                } else {
                    return playerAce = false;
                }
            }
        }
    }
    return playerAce = false;
}

const aiCheckA = (n) => {
    for (let y = 0; y < cardSuitArray.length; y++) {
        for (let x = n; x < aiHand.length; x++) {
            if (cardSuitArray[y] == aiHand[x][0]) {
                if (aiTotal > 21 && cardSuitArray[y] == "A") {
                    console.log(`card is Ace and total is higher than 21`)
                    aiAce = true;
                    aiAceCheckNum += 1;
                    return aiHand[x] = "removed";
                } else {
                    return aiAce = false;
                }
            }
        }
    }
    return aiAce = false;
}

const playerHit = (i) => {
    if (playerHand[i].length == 3) {
        let tempNum1 = playerHand[i].slice(0, 2);
        playerTotal += parseInt(tempNum1);
        console.log(playerTotal);
        gameState();
    } else {
        playerTotal += convertLetter(playerHand[i][0]);
        console.log(playerTotal);
        gameState();
    }
}

const aiCardCount = (i) => {
    if (aiHand[i - 1].length == 3) {
        let aiTempNum1 = aiHand[i - 1].slice(0, 2);
        aiTotal = convertLetter(aiHand[i][0]) + convertLetter(aiTempNum1);
        if (aiHand[i].length == 3) {
            let aiTempNum2 = aiHand[i].slice(0, 2);
            aiTotal = convertLetter(aiTempNum2) + convertLetter(aiTempNum1);
        }
    } else if (aiHand[i].length == 3) {
        let aiTempNum2 = aiHand[i].slice(0, 2);
        aiTotal = convertLetter(aiTempNum2) + convertLetter(aiHand[i - 1][0]);
    } else {
        aiTotal = convertLetter(aiHand[i][0]) + convertLetter(aiHand[i - 1][0]);
    }
}

const aiHold = (i) => {
    if (aiHand[i].length == 3) {
        let aiTempNum1 = aiHand[i].slice(0, 2);
        aiTotal += parseInt(aiTempNum1);
        console.log(aiTotal);
        gameState();
    } else {
        aiTotal += convertLetter(aiHand[i][0]);
        console.log(aiTotal);
        gameState();
    }
}

hitButton.addEventListener("click", () => {
    console.log(`after gameState player total is ${playerTotal}`);
    cardGenerator(counter);
    counter++;
    console.log(`generated card is ${playerHand[counter]}`);
    console.log(`player hand is ${playerHand} after generated card`);
    console.log(`counter for player hits is ${counter} - 1`);
    playerHit(counter);
});

holdButton.addEventListener("click", () => {
    aiCard[1].src = `cards/${aiRandom2}.png`;
    aiCardCount(1);
    console.log(`ai total is ${aiTotal}`);
    gameState();
    while (aiTotal < playerTotal) {
        console.log(`after gameState ai total is ${aiTotal}`);
        aiCardGenerator(aiCounter);
        aiCounter++;
        console.log(`generated card is ${aiHand[aiCounter]}`);
        console.log(`ai hand is ${aiHand} after generated card`);
        console.log(`counter for ai hits is ${aiCounter} - 1`);
        aiHold(aiCounter);
    }
});