class Card {
  constructor(value) {
    this.value = value;
    this.isFlipped = false;
    this.isMatched = false;
  }
}

class Game {
  constructor() {
    this.values = ["🍎","🍌","🍇","🍒","🍎","🍌","🍇","🍒"];
    this.cards = [];
    this.flippedCards = [];
    this.moves = 0;

    this.init();
  }

  init() {
    this.values.sort(() => 0.5 - Math.random());

    this.cards = this.values.map(v => new Card(v));
    this.render();
  }

  render() {
    const board = document.getElementById("gameBoard");
    board.innerHTML = "";

    this.cards.forEach((card, index) => {
      const div = document.createElement("div");
      div.classList.add("card");

      if (card.isFlipped || card.isMatched) {
        div.classList.add("flipped");
        div.innerText = card.value;
      }

      div.addEventListener("click", () => this.flipCard(index));

      board.appendChild(div);
    });
  }

  flipCard(index) {
    const card = this.cards[index];

    if (card.isFlipped || card.isMatched || this.flippedCards.length === 2) {
      return;
    }

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves++;
      document.getElementById("moves").innerText = this.moves;

      setTimeout(() => this.checkMatch(), 800);
    }

    this.render();
  }

  checkMatch() {
    const [c1, c2] = this.flippedCards;

    if (c1.value === c2.value) {
      c1.isMatched = true;
      c2.isMatched = true;
    } else {
      c1.isFlipped = false;
      c2.isFlipped = false;
    }

    this.flippedCards = [];
    this.render();
  }
}

new Game();