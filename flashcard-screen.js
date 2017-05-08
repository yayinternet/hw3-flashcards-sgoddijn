// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.createDeck = this.createDeck.bind(this);
    this.chooseCard = this.chooseCard.bind(this);
    this.updateDeck = this.updateDeck.bind(this);
    this.newCards = this.newCards.bind(this);
    this.reset = this.reset.bind(this);
    this.startOver = this.reset.bind(this);
    this.flashcards = [];
    this.title = null;

    document.addEventListener('deckChosen', this.createDeck);
    document.addEventListener('updateDeck', this.updateDeck);
    document.addEventListener('newCards', this.newCards);
    document.addEventListener('reset', this.reset);
    document.addEventListener('startOver', this.createDeck);
  }

  reset() {
    this.flashcards = [];
    this.title = null;
  }

  newCards() {
    const newFlashcards = [];
    for (let i=0; i<this.flashcards.length; i++) {
      if (this.flashcards[i] !== undefined) {
        newFlashcards.push(this.flashcards[i]);
      }
    }
    this.flashcards = newFlashcards;
    this.chooseCard(0);
  }

  updateDeck(event) {
    const word = event.detail.word;
    let correct = event.detail.correct;
    let key = null;
    for (let i=0; i<this.flashcards.length; i++) {
      if (this.flashcards[i] !== undefined) {
        if (this.flashcards[i].word === word) {
          key = i;
          break;
        }
      }
    }
    if (correct) delete this.flashcards[key];
    key++;
    const flashcardContainer = document.querySelector('#flashcard-container');
    flashcardContainer.removeChild(flashcardContainer.lastChild);
    this.chooseCard(key);
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  createDeck(event) {
    this.flashcards = [];
    const flashcardContainer = document.querySelector('#flashcard-container');
    if (this.title === null) this.title = event.detail.title;
    let index = null;
    for (let i = 0; i < FLASHCARD_DECKS.length; i++) {
      if (this.title.includes(FLASHCARD_DECKS[i].title)) {
        index = i;
        break;
      }
    }
    const deck = FLASHCARD_DECKS[index];
    for (let key in deck.words) {
      const card = new Flashcard(flashcardContainer, key, deck.words[key]);
      this.flashcards.push(card);
    }
    this.chooseCard(0);
  }

  chooseCard(key) {
    const flashcardContainer = document.querySelector('#flashcard-container');
    let index = key;
    if (index === this.flashcards.length) {
      document.dispatchEvent(new CustomEvent('gameEnd'));
    } else {
      const card = this.flashcards[index].flashcardElement;
      flashcardContainer.append(card);
      this.card = document.querySelector('.flashcard-box .word');
      this.card.classList.add('fade-up');
    }
  }
}
