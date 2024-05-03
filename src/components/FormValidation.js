export default class FormValidation {
  constructor(settings, formEl) {
    // Initialization
    this._formElement = formEl;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;

    // DOM Elements
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputEl = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
  }

  // Input Validation
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  }

  // Error Handling
  _hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _showInputError(inputEl, message) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = message;
    errorMessageEl.classList.add(this._errorClass);
  }

  // Button State
  _toggleButtonState() {
    if (!this._hasInvalidInput()) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  }

  _hasInvalidInput() {
    return this._inputEl.some((inputEl) => !inputEl.validity.valid);
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  // Event Listeners
  _setEventListeners() {
    this._inputEl.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._disableButton();
    });
  }

  // Public Methods
  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
