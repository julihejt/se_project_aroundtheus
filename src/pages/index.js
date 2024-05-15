/* ------------------------------ import ----------------------------- */

import FormValidation from "../components/FormValidation.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, formSettings } from "../components/utils/constants.js";
import "../pages/index.css";

/* -------------------------------- classes -------------------------------- */

class Index {
  constructor() {
    this.profileEditButton = document.querySelector("#profile-edit-button");
    this.profileEditModal = document.querySelector("#profile-edit-modal");
    this.profileCloseButton = this.profileEditModal.querySelector(
      "#modal-close-button"
    );
    this.profileTitle = document.querySelector(".profile__title");
    this.profileDescription = document.querySelector("#profile__description");
    this.profileTitleInput = document.querySelector("#profile-title-input");
    this.profileDescriptionInput = document.querySelector(
      "#profile-description-input"
    );
    this.profileAddButton = document.querySelector(".profile__add-button");
    this.profileEditForm = this.profileEditModal.querySelector(".modal__form");
    this.profileEditSubmit =
      this.profileEditModal.querySelector("#edit-save-button");
    this.cardListEl = document.querySelector(".cards__list");
    this.cardTemplate =
      document.querySelector("#card-template").content.firstElementChild;
    this.addModal = document.querySelector("#profile__add-form");
    this.addForm = document.querySelector("#add__card-form");
    this.placeInput = document.querySelector("#addCard-title-input");
    this.placeInputUrl = document.querySelector("#addCard-description-input");
    this.closeButtonPlace = document.querySelector("#profile__close-modal");
    this.cardImageModal = document.querySelector("#card__image_modal");
    this.modalImageCloseButton = document.querySelector(
      "#modal__image-close-button"
    );
    this.modalImageSrc = document.querySelector("#modal__image");
    this.modalImageDescription = document.querySelector(
      "#modal__image_description"
    );
    this.modal = document.querySelector(".modal");
    this.modals = document.querySelectorAll(".modal");
    this.modalContainer = document.querySelector(".modal__container");
    this.editModalWindow = document.querySelector("#profile-edit-modal");
    this.addModalWindow = document.querySelector("#profile-edit-button");
    this.formValidation = new FormValidation(
      formSettings,
      this.profileEditForm
    );
    this.formValidation.enableValidation();
    this.addCardValidator = new FormValidation(formSettings, this.addForm);
    this.addCardValidator.enableValidation();
    this.setEventListeners();
  }

  closePopup(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.closeModalByEscape);
  }

  openPopup(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", this.closeModalByEscape.bind(this));
  }

  closeModalByEscape(evt) {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      this.closePopup(openedModal);
    }
  }

  handleImageClick(cardData) {
    this.modalImageSrc.setAttribute("src", cardData.link);
    this.modalImageSrc.setAttribute("alt", cardData.name);
    this.modalImageDescription.textContent = cardData.name;
    this.openPopup(this.cardImageModal);
  }

  handleAddCardSubmit(e) {
    e.preventDefault();
    const name = this.placeInput.value;
    const link = this.placeInputUrl.value;
    this.createCard({ name, link });
    this.addForm.reset();
    this.closePopup(this.addModal);
  }

  getCard(data, templateSelector, handleImageClick) {
    const card = new Card(data, templateSelector, handleImageClick);
    return card.getView();
  }

  createCard(cardData) {
    const cardElement = this.getCard(
      cardData,
      "#card-template",
      this.handleImageClick.bind(this)
    );
    this.cardListEl.prepend(cardElement);
  }

  setEventListeners() {
    this.modals.forEach((modal) => {
      modal.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal")) {
          this.closePopup(modal);
        }
      });
    });

    initialCards.forEach((cardData) => {
      this.createCard(cardData);
    });

    this.profileEditButton.addEventListener("click", () => {
      this.profileTitleInput.value = this.profileTitle.textContent.trim();
      this.profileDescriptionInput.value =
        this.profileDescription.textContent.trim();
      this.openPopup(this.profileEditModal);
    });

    this.profileCloseButton.addEventListener("click", () => {
      this.closePopup(this.profileEditModal);
    });

    this.profileEditForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.profileTitle.textContent = this.profileTitleInput.value;
      this.profileDescription.textContent = this.profileDescriptionInput.value;
      this.closePopup(this.profileEditModal);
    });

    this.modalImageCloseButton.addEventListener("click", () => {
      this.closePopup(this.cardImageModal);
    });

    this.profileAddButton.addEventListener("click", () => {
      this.openPopup(this.addModal);
    });

    this.addForm.addEventListener(
      "submit",
      this.handleAddCardSubmit.bind(this)
    );

    this.closeButtonPlace.addEventListener("click", () => {
      this.closePopup(this.addModal);
    });
  }
}

const index = new Index();

const imagePopup = new PopupWithImage(".modal__preview-image");
const section = new Section(".page__section");
const popupWithForm = new PopupWithForm("#popup-form-selector");
const popupOpen = new Popup(".modal_opened");
const popupClosed = new Popup(".modal__close");
const userInfo = new UserInfo({
  name: "#profile-title-input",
  description: "#profile-description-input",
});
