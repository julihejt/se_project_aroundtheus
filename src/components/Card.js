export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    // Initialization
    this._handleImageClick = handleImageClick;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  // Event Listeners
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({
          name: this._name,
          link: this._link,
        });
      });

    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  // Card Actions
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  // Card Rendering
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement
      .querySelector(".card__image")
      .setAttribute("src", this._link);
    this._cardElement
      .querySelector(".card__image")
      .setAttribute("alt", this._name);
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
