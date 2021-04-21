const playButton = document.getElementById("play");
const mainGame = document.getElementById("mainGame");
const playerContainer = document.getElementById("playerContainer");
const aiContainer = document.getElementById("aiContainer");
const hitButton = document.getElementById("hit");
const holdButton = document.getElementById("hold");
let alphabet = "CDHS";
let cardSuit = "JQKA";
let cards = ["2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S", "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS", "AC", "AD", "AH", "AS"]
let playerHand = [];
let playerCard = [];
let playerTotal;
let counter = 1;
let aiCard= [];

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
    console.log(playerTotal);

    aiCard.push(document.createElement("img"), document.createElement("img"));
    aiCard[0].src = `cards/${randomCard()}.png`;
    aiContainer.appendChild(aiCard[0]);
    aiCard[1].src = `cards/greyBack.png`;
    aiContainer.appendChild(aiCard[1]);
});

const convertLetter = (playerHand) => {
    let cardSuitArray = cardSuit.split("");
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

const gameState = (i, playerTotal) => {
    if (playerTotal > 21) {
        mainGame.style.display = "none";
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        const header = document.createElement("h1");
        document.body.appendChild(header);
        header.innerHTML = "You Lose!";
        header.style.fontSize = "4vw";
        header.style.color = "white"
    } else if (playerTotal == 21) {
        mainGame.style.display = "none";
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        const header = document.createElement("h1");
        document.body.appendChild(header);
        header.innerHTML = "You Win!";
        header.style.fontSize = "4vw";
        header.style.color = "white"
    }
}

const cardGenerator = (i) => {
    let random = randomCard();
    playerHand.push(random);
    playerCard.push(document.createElement("img"));
    playerCard[i + 1].src = `cards/${random}.png`;
    playerContainer.appendChild(playerCard[i + 1])
}

const playerCardCount = (i) => {
    if (playerHand[i - 1].length == 3) {
        let tempNum1 = playerHand[i - 1].slice(0, 2);
        playerTotal = convertLetter(playerHand[i][0]) + convertLetter(tempNum1);
    } else if (playerHand[i].length == 3) {
        let tempNum2 = playerHand[i].slice(0, 2);
        playerTotal = convertLetter(tempNum2) + convertLetter(playerHand[i - 1][0]);
    } else {
        playerTotal = convertLetter(playerHand[i][0]) + convertLetter(playerHand[i - 1][0]);
    }
}

const playerHit = (i) => {
    if (playerHand[i].length == 3) {
        let tempNum1 = playerHand[i].slice(0, 2);
        playerTotal += parseInt(tempNum1);
        console.log(playerTotal);
        gameState(i, playerTotal);
    } else {
        playerTotal += convertLetter(playerHand[i][0]);
        console.log(playerTotal);
        gameState(i, playerTotal);
    }
}

hitButton.addEventListener("click", () => {
    cardGenerator(counter);
    counter++;
    playerHit(counter);
});