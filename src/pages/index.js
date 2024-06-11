/* ------------------------------ Imports ----------------------------- */
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

/* ------------------------------ API Instance ----------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d7e04e76-ddf3-44aa-931a-ba12647359c4",
    "Content-Type": "application/json",
  },
});

/* ------------------------------ User Info ----------------------------- */
const userInfo = new UserInfo({
  name: ".profile__title",
  description: "#profile__description",
  avatar: ".profile__image",
});

/* ------------------------------ DOM Elements ----------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addForm = document.querySelector("#add__card-form");

/* ------------------------------ Form Validators ----------------------------- */
const profileFormValidator = new FormValidation(formSettings, profileEditForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidation(formSettings, addForm);
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidation(formSettings, profileEditModal);
avatarFormValidator.enableValidation();

/* ------------------------------ Popups ----------------------------- */
const imagePopup = new PopupWithImage("#preview-image-modal");

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileSubmit,
  "Saving..."
);
const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
const profileAvatarPopup = new PopupWithForm(
  "#profile-avatar-modal",
  handleAvatarSubmit,
  "Saving..."
);

const cardDeletePopup = new PopupWithConfirmation("#delete-card-modal");

/* ------------------------------ Section ----------------------------- */
let section;

/* ------------------------------ API Calls ----------------------------- */
// get user info from server
api
  .getUserInfo()
  .then((userData) => {
    // set the name, description and avatar of the user on the dom
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    userInfo.updateAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: createCard,
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

/* ------------------------------ Event Listeners ----------------------------- */
profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name.trim();
  profileDescriptionInput.value = description.trim();
  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

if (profileAvatarButton) {
  profileAvatarButton.addEventListener("click", () => {
    profileAvatarPopup.open();
  });
}

cardDeletePopup.setEventListeners();

/* ------------------------------ Functions ----------------------------- */
function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeIconClick,
    handleUnlikeIconClick
  );
  return card.getView();
}

function handleImageClick({ name, link }) {
  imagePopup.open({ name, link });
}

function handleLikeIconClick(card) {
  api
    .likeCard(card.id)
    .then((data) => {
      // like the card on the dom
      card.likeHeartIcon();
      // set isLiked to true
      card.isLiked = true;
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleUnlikeIconClick(card) {
  api
    .removeLike(card.id)
    .then((data) => {
      // unlike the card visually
      card.unlikeHeartIcon();
      // set isLiked to false
      card.isLiked = false;
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteCard(card) {
  cardDeletePopup.open();
  cardDeletePopup.setSubmitAction(() => {
    cardDeletePopup.setLoading(true, "Deleting...");
    api
      .deleteCard(card.id)
      .then(() => {
        card.handleDeleteCard();
        cardDeletePopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardDeletePopup.setLoading(false, "Yes");
      });
  });
}

function handleAddCardSubmit(inputValues) {
  addCardPopup.setLoading(true, "Adding...");
  console.log("Add Card Input Values:", inputValues);
  const cardData = {
    name: inputValues.title,
    link: inputValues.url,
  };

  api
    .createNewCard(cardData)
    .then((newCard) => {
      renderCards(newCard);
      addForm.reset();
      addCardFormValidator.disableButton();
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => addCardPopup.hideLoading());
}

function handleEditProfileSubmit(inputValues) {
  editProfilePopup.setLoading(true, "Saving...");
  console.log("Edit Profile Input Values", inputValues);
  api
    .editProfile(inputValues.title, inputValues.description)
    .then(() => {
      userInfo.setUserInfo({
        name: inputValues.title,
        description: inputValues.description,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    })
    .finally(() => {
      editProfilePopup.setLoading(false);
    });
}

function handleAvatarSubmit(inputValues) {
  profileAvatarPopup.setLoading(true, "Saving...");
  api
    .updateAvatar(inputValues.avatar)
    .then(() => {
      userInfo.updateAvatar(inputValues.avatar);
      profileAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAvatarPopup.setLoading(false);
    });
}

function renderCards(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
  addCardPopup.close();
  addForm.reset();
  addCardFormValidator.disableButton();
}
