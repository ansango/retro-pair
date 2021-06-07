import styles from "./style.css";
import "nes.css/css/nes.min.css";
import white from "./img/white.png";
import blank from "./img/blank.png";
import fries from "./img/fries.png";
import burger from "./img/cheeseburger.png";
import ice from "./img/ice-cream.png";
import pizza from "./img/pizza.png";
import shake from "./img/milkshake.png";
import dog from "./img/hotdog.png";

document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    {
      name: "fries",
      img: fries,
    },
    {
      name: "cheeseburger",
      img: burger,
    },
    {
      name: "ice-cream",
      img: ice,
    },
    {
      name: "pizza",
      img: pizza,
    },
    {
      name: "milkshake",
      img: shake,
    },
    {
      name: "hotdog",
      img: dog,
    },
    {
      name: "fries",
      img: fries,
    },
    {
      name: "cheeseburger",
      img: burger,
    },
    {
      name: "ice-cream",
      img: ice,
    },
    {
      name: "pizza",
      img: pizza,
    },
    {
      name: "milkshake",
      img: shake,
    },
    {
      name: "hotdog",
      img: dog,
    },
  ].sort(() => 0.5 - Math.random());
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let longCardsArray = cardArray.length;
  let longCardsWon = cardsWon.length;

  function backgroundImage(url) {
    return `background:url(${url}); background-repeat:no-repeat; background-size:cover;`;
  }

  function createBoard() {
    cardArray.forEach((el, i) => {
      const img = document.createElement("img");
      img.classList = "w-full rounded-sm h-full";
      img.setAttribute("src", blank);
      img.setAttribute("data-id", i);
      img.addEventListener("click", flipCard);

      const card = document.createElement("a");
      card.className = "h-28 w-28 md:h-36 md:w-36 nes-btn";
      card.style = backgroundImage(blank);
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      //card.appendChild(img);
      grid.appendChild(card);
    });
  }
  function flipCard() {
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.style = backgroundImage(cardArray[cardId].img);
    //this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) setTimeout(checkMatch, 500);
  }
  function playSound(selector) {
    const audio = document.getElementById(selector);
    audio.play();
  }
  function checkMatch() {
    const cards = document.querySelectorAll("a");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (optionOneId == optionTwoId) {
      playSound("error");
      cards[optionOneId].style = backgroundImage(blank);
      cards[optionTwoId].style = backgroundImage(blank);
    } else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
      if (longCardsWon !== longCardsArray) playSound("coin");
    } else {
      playSound("error");
      cards[optionOneId].style = backgroundImage(blank);
      cards[optionTwoId].style = backgroundImage(blank);
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = "Congratulations! You found them all!";
      playSound("win");
    }
  }

  createBoard();
});
