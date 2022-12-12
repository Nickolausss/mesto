const selectors = {
	// general
	form: '.popup__container',
	// popup edit form
	popupEditProfile: '.popup_type_profile-edit',
	nameInput: '.popup__item_input_name',
	descriptionInput: '.popup__item_input_description',
	// block profile
	buttonEdit: '.profile__edit-button',
	buttonAdd: '.profile__add-button',
	buttonChange: '.profile__button-change-avatar',
	// popup add form
	popupAddForm: '.popup_type_add-card',
	// popup image
	popupImage: '.popup_type_image',
	// popup confirm delete card
	popupDelete: '.popup_type_confir-delete',
	// popup change avatar
	popupChange: '.popup_type_change-avatar',
};

// popup edit form
export const popupEditProfile = document.querySelector(selectors.popupEditProfile);
export const popupEditContainer = popupEditProfile.querySelector(selectors.form);
export const nameInputElement = popupEditProfile.querySelector(selectors.nameInput);
export const descriptionInputElement = popupEditProfile.querySelector(selectors.descriptionInput);
// block profile
export const buttonEditToOpenPopupEditProfile = document.querySelector(selectors.buttonEdit);
export const profileAddButtonForAddForm = document.querySelector(selectors.buttonAdd);
export const buttonChangeAvatar = document.querySelector(selectors.buttonChange);
// popup add form
export const popupAddFormElement = document.querySelector(selectors.popupAddForm);
export const popupAddFormContainer = popupAddFormElement.querySelector(selectors.form);
// popup image
export const popupImageElement = document.querySelector(selectors.popupImage);
// popup confirm delete card
export const popupDeleteCard = document.querySelector(selectors.popupDelete);
// popup change avatar
export const popupChangeAvatar = document.querySelector(selectors.popupChange);
export const popupChangeAvatarForm = popupChangeAvatar.querySelector(selectors.form);