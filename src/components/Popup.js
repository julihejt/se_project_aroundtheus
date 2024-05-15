/* ------------------------------ Popup class ----------------------------- */
export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add(".modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove(".modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  /* ------------------------------ event listeners ----------------------------- */
  setEventListeners() {
    const button = this._popupElement.querySelector(".modal__close");
    button.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("click", (e) => {
      if (e.target.classList.contains(".modal_opened")) {
        this.close();
      }
    });
  }
}
