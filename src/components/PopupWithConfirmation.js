import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    console.log(this._popupElement); // Add this line
    this._popupForm = this._popupElement.querySelector(".modal__form");
    console.log(this._popupForm); // And this line
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonContent = this._submitButton.textContent;
  }

  setLoading(submit, loadingText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = loadingText;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._submitButtonContent;
      this._submitButton.disabled = false;
    }
  }

  setSubmitAction(action) {
    this._submitButton.textContent = action;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
    super.addEventListeners();
  }
}
