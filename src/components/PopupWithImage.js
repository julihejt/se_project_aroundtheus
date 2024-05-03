/* ---------------------------- PopupImage Class --------------------------- */
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._imageTitle = this._popupElement.querySelector(".modal__preview-name");
  }

  open(data) {
    this._imageElement.src = data.link;
    this._imageElement.alt = `.modal__preview-image ${data.link}`;
    this._imageTitle.textContent = data.name;
    super.open();
  }
}
