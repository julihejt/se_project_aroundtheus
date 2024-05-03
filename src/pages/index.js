/* ------------------------------ import ----------------------------- */

import Card from "../src/components/Card.js";

import FormValidation from "../src/components/FormValidation.js";

import Section from "../src/components/Section.js";

import Userinfo from "../src/components/UserInfo.js";

import PopupWithForm from "../src/components/PopupWithForm.js";

import PopupWithImage from "../src/components/PopupWithImage.js";

import {
  openPopup,
  closePopup,
  closeModalByEscape,
  handleOverlayClick, // Make sure to import this function if you're using it
} from "./utils.js";

import "../src/pages/index.css";

/* ------------------------------ initial cards ----------------------------- */

const initialCards = [
  {
    name: "Yosemite Valley",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

/* -------------------------------- elements -------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");

const profileEditModal = document.querySelector("#profile-edit-modal");

const profileCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector("#profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileAddButton = document.querySelector(".profile__add-button");

const profileEditForm = profileEditModal.querySelector(".modal__form");

const profileEditSubmit = profileEditModal.querySelector("#edit-save-button");

const cardListEl = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addModal = document.querySelector("#profile__add-form");

const addForm = document.querySelector("#add__card-form");

const placeInput = document.querySelector("#addCard-title-input");

const placeInputUrl = document.querySelector("#addCard-description-input");

const closeButtonPlace = document.querySelector("#profile__close-modal");

const cardImageModal = document.querySelector("#card__image_modal");

const modalImageCloseButton = document.querySelector(
  "#modal__image-close-button"
);

const modalImageSrc = document.querySelector("#modal__image");

const modalImageDescription = document.querySelector(
  "#modal__image_description"
);

const modal = document.querySelector(".modal");

const modals = document.querySelectorAll(".modal");

const modalContainer = document.querySelector(".modal__container");

const editModalWindow = document.querySelector("#profile-edit-modal");

const addModalWindow = document.querySelector("#profile-edit-button");

const formSettings = {
  formSelector: ".modal__form",

  errorClass: "modal__error",

  inputErrorClass: "modal__input_type_error",

  inputSelector: ".modal__input",

  submitButtonSelector: ".modal__button",

  inactiveButtonClass: "modal__button_disabled",
};

const formValidation = new FormValidation(formSettings, profileEditForm);

formValidation.enableValidation();

const addCardValidator = new FormValidation(formSettings, addForm);

addCardValidator.enableValidation();

/* -------------------------------- function -------------------------------- */

function handleImageClick(cardData) {
  modalImageSrc.setAttribute("src", cardData.link);

  modalImageSrc.setAttribute("alt", cardData.name);

  modalImageDescription.textContent = cardData.name;

  openPopup(cardImageModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();

  const name = placeInput.value;

  const link = placeInputUrl.value;

  createCard({ name, link });

  addForm.reset();

  closePopup(addModal);
}

function getCard(data, templateSelector, handleImageClick) {
  const card = new Card(data, templateSelector, handleImageClick);

  return card.getView();
}

function createCard(cardData) {
  const cardElement = getCard(cardData, "#card-template", handleImageClick);

  cardListEl.prepend(cardElement);
}

/* ----------------------------- event listener ----------------------------- */

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closePopup(modal);
    }
  });
});

initialCards.forEach((cardData) => {
  createCard(cardData);
});

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();

  profileDescriptionInput.value = profileDescription.textContent.trim();

  openPopup(profileEditModal);
});

profileCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();

  profileTitle.textContent = profileTitleInput.value;

  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(profileEditModal);
});

modalImageCloseButton.addEventListener("click", () => {
  closePopup(cardImageModal);
});

profileAddButton.addEventListener("click", () => {
  openPopup(addModal);
});

addForm.addEventListener("submit", handleAddCardSubmit);

closeButtonPlace.addEventListener("click", () => {
  closePopup(addModal);
});
