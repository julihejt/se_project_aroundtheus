export const initialCards = [
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

export const formSettings = {
  formSelector: ".modal__form",

  errorClass: "modal__error",

  inputErrorClass: "modal__input_type_error",

  inputSelector: ".modal__input",

  submitButtonSelector: ".modal__button",

  inactiveButtonClass: "modal__button_disabled",
};

export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileAddButton = document.querySelector(".profile__add-button");
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addForm = document.querySelector("#add__card-form");
export const avatarForm = document.querySelector("#profile-avatar-form");
export const profileAvatarButton = document.querySelector(
  ".profile__avatar-modal"
);

export const cardDeleteButton = document.querySelector(".card__delete-button");
export const cardDeleteModal = document.querySelector("#card-delete-modal");
export const cardDeleteForm = document.querySelector(".modal__form");
