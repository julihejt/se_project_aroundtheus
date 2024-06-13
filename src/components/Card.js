export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeIconClick,
    handleUnlikeIconClick
  ) {
    if (data) {
      this._data = data;
    } else {
      this._data = null;
    }
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIconClick = handleLikeIconClick;
    this._handleUnlikeIconClick = handleUnlikeIconClick;
    this.isLiked = data.isLiked;
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

    this._likeButton.addEventListener("click", () => {
      if (this.isLiked) {
        this._handleUnlikeIconClick(this);
      } else {
        if (this.isLiked === false) {
          this._handleLikeIconClick(this);
        }
      }
    });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
  }

  // likes the card visually
  likeHeartIcon() {
    this._likeButton.classList.add("card__like-button_active");
  }

  // unlikes the card visually
  unlikeHeartIcon() {
    this._likeButton.classList.remove("card__like-button_active");
  }

  //handleLikeIcon() {
  //this._likeButton
  // .classList.toggle("card__like-button_active");
  //}

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    if (this._data) {
      this._cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".card")
        .cloneNode(true);

      const cardImageEl = this._cardElement.querySelector(".card__image");
      const cardTitleEl = this._cardElement.querySelector(".card__title");
      cardImageEl.src = this._data.link;
      cardImageEl.alt = this._data.name;
      cardTitleEl.textContent = this._data.name;
      this._likeButton = this._cardElement.querySelector(".card__like-button");
      this._setEventListeners();
      this._renderLikes();

      return this._cardElement;
    } else {
      console.log("Card data is not available.");
      return null;
    }
  }

  // this runs on page load
  _renderLikes() {
    if (this.isLiked) {
      this.likeHeartIcon();
    } else {
      this.unlikeHeartIcon();
    }
  }
}
