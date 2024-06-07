import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement?.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    if (this._popupForm) {
      this._inputElements = Array.from(
        this._popupForm.querySelectorAll(".modal__input")
      );
    } else {
      this._inputElements = [];
    }
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this.setEventListeners();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = "Save";
    }
  }
}
