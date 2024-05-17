/* ---------------------------- PopupImage Class --------------------------- */
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    //this._popupElement = document.querySelector(popupSelector);
    this._imageElement = this._popupElement?.querySelector(".modal__image");
    this._imageTitle = this._popupElement?.querySelector(
      ".modal__image_description"
    );
    this.setEventListeners();
  }

  open(data) {
    //{name: yosimite, link: httpsd}
    this._imageElement.src = data.link;
    this._imageElement.alt = `Image: ${data.name}`;
    this._imageTitle.textContent = data.name;
    super.open();
  }
}
