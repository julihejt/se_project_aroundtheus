import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement?.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
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
    super.setEventListeners(); // Call the method from the parent class
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}
