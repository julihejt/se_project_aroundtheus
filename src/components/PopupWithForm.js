import Popup from "./Popup.js";

/* -------------------------- PopupWithForm Class ------------------------- */
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    const inputs = this._popupElement.querySelectorAll(".modal__input");
    const inputsItems = {};

    inputs.forEach(({ name, value }) => {
      inputsItems[name] = value;
    });
    return inputsItems;
  }
  /* -------------------------- Event listeners ------------------------- */
  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
