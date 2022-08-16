const selectors = {
	// general
	form: '.popup__container',
	buttonClose: '.popup__close-button',
	// popup edit form
	popupEditProfile: '.popup_type_profile-edit',
	nameInput: '.popup__item_input_name',
	descriptionInput: '.popup__item_input_description',
	// block profile
	buttonEdit: '.profile__edit-button',
	profileTitle: '.profile__title',
	profileSubtitle: '.profile__subtitle',
	buttonAdd: '.profile__add-button',
	// popup add form
	popupAddForm: '.popup_type_add-card',
	placeInput: '.popup__item_input_place',
	titleInput: '.popup__item_input_title',
	// elemets section
	elementsSection: '.elements',
	// popup image
	popupImage: '.popup_type_image',
};

// popup edit form
export const popupEditProfile = document.querySelector(selectors.popupEditProfile);
export const popupEditContainer = popupEditProfile.querySelector(selectors.form);
export const popupEditCloseButton = popupEditProfile.querySelector(selectors.buttonClose);
export const nameInputElement = popupEditProfile.querySelector(selectors.nameInput);
export const descriptionInputElement = popupEditProfile.querySelector(selectors.descriptionInput);
// block profile
export const buttonEditToOpenPopupEditProfile = document.querySelector(selectors.buttonEdit);
export const profileTitleElement = document.querySelector(selectors.profileTitle);
export const profileSubtitleElement = document.querySelector(selectors.profileSubtitle);
export const profileAddButtonForAddForm = document.querySelector(selectors.buttonAdd);
// popup add form
export const popupAddFormElement = document.querySelector(selectors.popupAddForm);
export const popupAddFormContainer = popupAddFormElement.querySelector(selectors.form);
export const placeInputElement = popupAddFormElement.querySelector(selectors.placeInput);
export const titleInputElement = popupAddFormElement.querySelector(selectors.titleInput);
export const popupAddCloseButton = popupAddFormElement.querySelector(selectors.buttonClose);
// elemets section
export const elementsSectionElement = document.querySelector(selectors.elementsSection);
// popup image
export const popupImageElement = document.querySelector(selectors.popupImage);
export const popupImageCloseButton = popupImageElement.querySelector(selectors.buttonClose);