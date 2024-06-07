/* ------------------------------ import ----------------------------- */

import FormValidation from "../components/FormValidation.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { initialCards, formSettings } from "../utils/constants.js";
import "../pages/index.css";
/* -------------------------------- elements -------------------------------- */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d7e04e76-ddf3-44aa-931a-ba12647359c4",
    "Content-Type": "application/json",
  },
});

api.getInitialCards().then((cards) => {
  let section = new Section(
    {
      items: cards,
      renderer: createCard,
    },
    ".cards__list"
  );
  section.renderItems();
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({
  name: ".profile__title",
  description: "#profile__description",
  avatarImage: ".profile__image",
});

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

// Define the necessary imports and elements as before

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

// Card delete popup
const cardDeletePopup = new PopupWithConfirmation("#delete-card-modal");
cardDeletePopup.setEventListeners();

// Function to handle image click
function handleImageClick({ name, link }) {
  imagePopup.open({ name, link });
}

// Function to handle card deletion
function handleDeleteCard(cardID) {
  cardDeletePopup.open();
  api.deleteCard(cardID);
}

// Function to handle adding a new card
function handleAddCardSubmit(inputValues) {
  const cardData = {
    name: inputValues.title,
    link: inputValues.url,
  };

  api
    .createNewCard(data)
    .then((newCard) => {
      renderCards(newCard);
      addForm.reset();
      addCardFormValidator.disableButton();
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    description: userData.about,
    avatar: userData.avatar,
  });
});
// Function to handle profile edit

function handleEditProfileSubmit(inputValues) {
  api
    .editProfile(inputValues.name, inputValues.about)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
      // You can also display an error message to the user here
    });
}

// Function to create a card
function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteCard
  );
  return card.getView();
}

// Function to render cards
function renderCards(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
  addCardPopup.close();
  addForm.reset();
  addCardFormValidator.disableButton();
}

// Event listeners
profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name.trim();
  profileDescriptionInput.value = description.trim();
  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

section.renderItems();
