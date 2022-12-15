export const selectors = {
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
export const popupEditProfileForm = document.querySelector(selectors.popupEditProfile).querySelector(selectors.form);
export const nameInputElement = popupEditProfileForm.querySelector(selectors.nameInput);
export const descriptionInputElement = popupEditProfileForm.querySelector(selectors.descriptionInput);
// block profile
export const buttonEditToOpenPopupEditProfile = document.querySelector(selectors.buttonEdit);
export const profileAddButtonForAddForm = document.querySelector(selectors.buttonAdd);
export const buttonChangeAvatar = document.querySelector(selectors.buttonChange);

export const listValidation = {
	form: '.popup__container',
	input: '.popup__item',
	inputError: 'popup__item_type_error',
	spanError: 'popup__item-error_active',
	bottonSave: '.popup__save-button',
	bottonSaveInactive: 'popup__save-button_inactive'
};

export const nameOfForm = {
	editForm: 'popup-edit-form',
	addFrom: 'popup-add-form',
	avatarForm: 'popup-change-avatar-form'
}