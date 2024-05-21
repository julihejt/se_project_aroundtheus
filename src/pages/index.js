/* ------------------------------ import ----------------------------- */

import FormValidation from "../components/FormValidation.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, formSettings } from "../utils/constants.js";
import "../pages/index.css";

/* -------------------------------- elements -------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
//const profileCloseButton = profileEditModal.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector("#profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
//const profileEditSubmit = profileEditModal.querySelector("#edit-save-button");
//const cardListEl = document.querySelector(".cards__list");
//const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
//const addModal = document.querySelector("#profile__add-form");
const addForm = document.querySelector("#add__card-form");
//const placeInput = document.querySelector("#addCard-title-input");
//const placeInputUrl = document.querySelector("#addCard-description-input");
//const closeButtonPlace = document.querySelector("#profile__close-modal");
//const cardImageModal = document.querySelector("#card__image_modal");
//const modalImageCloseButton = document.querySelector( "#modal__image-close-button");
//const modalImageSrc = document.querySelector("#modal__image");
//const modalImageDescription = document.querySelector("#modal__image_description");
//const modal = document.querySelector(".modal");
//const modals = document.querySelectorAll(".modal");
//const modalContainer = document.querySelector(".modal__container");
//const editModalWindow = document.querySelector("#profile-edit-modal");
//const addModalWindow = document.querySelector("#profile-edit-button");

const profileFormValidator = new FormValidation(formSettings, profileEditForm);
profileFormValidator.enableValidation();
const addCardFormValidator = new FormValidation(formSettings, addForm);
addCardFormValidator.enableValidation();
const imagePopup = new PopupWithImage("#preview-image-modal");
const section = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileSubmit
);
const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);

const userInfo = new UserInfo({
  name: ".profile__title",
  description: "#profile__description",
});

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

function handleAddCardSubmit(inputValues) {
  section.addItem({ name: inputValues.title, link: inputValues.url });
  addForm.reset();
  addCardFormValidator.disableButton();
}

function handleEditProfileSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.name,
    description: inputValues.description,
  });
  editProfilePopup.close();
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

section.renderItems();
