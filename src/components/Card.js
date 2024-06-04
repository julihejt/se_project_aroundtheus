export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeIcon
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data.id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
    this._isLiked = data.isLiked;
  }

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
        this._handleLikeIcon(this._id);
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this._id);
      });
  }

  handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .conetent.querySelector(".card")
      .cloneNode(true);

    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    cardImageEl.src = this._data.link;
    cardImageEl.src = this._data.name;
    cardTitleEl.textContent = this._data.name;
    this._setEventListeners();
    this._renderLikes();

    return this._cardElement;
  }

  _renderLikes() {
    if (this._isLiked) {
      this._cardElement.classlist.add(".card__like-button_active");
    } else {
      this._cardElement.classList.remove(".card__like-button_active");
    }
  }
}
