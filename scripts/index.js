import {
	arrayCard,
	listValidation
} from './arrays.js';

import { Card } from './Card.js';

import { FormValidator } from './FormValidator.js';

import {
	// popup edit form
	popupEditProfile,
	popupEditContainer,
	popupEditCloseButton,
	nameInputElement,
	descriptionInputElement,
	// block profile
	buttonEditToOpenPopupEditProfile,
	profileTitleElement,
	profileSubtitleElement,
	profileAddButtonForAddForm,
	// popup add form
	popupAddFormElement,
	popupAddFormContainer,
	placeInputElement,
	titleInputElement,
	popupAddCloseButton,
	// elemets section
	elementsSectionElement,
	// popup image
	popupImageElement,
	popupImageCloseButton
} from './constants.js';

function openPopup(popup) {
	popup.classList.add('popup_opened');

	popup.addEventListener('click', closePopupByClickOnOverlay);
	document.addEventListener('keydown', closePopupByPressEscapeKey);
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');

	popup.removeEventListener('click', closePopupByClickOnOverlay);
	document.removeEventListener('keydown', closePopupByPressEscapeKey);
}

function closePopupByClickOnOverlay(event) {
	if (event.target === event.currentTarget) {
		closePopup(event.currentTarget);
	}
}

function closePopupByPressEscapeKey(event) {
	if (event.key === 'Escape') {
		const activePopup = document.querySelector('.popup_opened');
		closePopup(activePopup);
	}
}

buttonEditToOpenPopupEditProfile.addEventListener('click', () => {
	openPopup(popupEditProfile);
	fillPopupProfileFormFields();
	formEditContainerValidation.enableSubmitButton();
});

function fillPopupProfileFormFields() {
	nameInputElement.value = profileTitleElement.textContent;
	descriptionInputElement.value = profileSubtitleElement.textContent;
};

function handleProfileFormSubmit(evt) {
	evt.preventDefault();

	profileTitleElement.textContent = nameInputElement.value;
	profileSubtitleElement.textContent = descriptionInputElement.value;

	closePopup(popupEditProfile);
};

popupEditContainer.addEventListener('submit', handleProfileFormSubmit);

popupEditCloseButton.addEventListener('click', () => {
	closePopup(popupEditProfile);
});

profileAddButtonForAddForm.addEventListener('click', () => {
	openPopup(popupAddFormElement);
	formAddContainerValidation.disableSubmitButton();
});

popupAddCloseButton.addEventListener('click', () => {
	closePopup(popupAddFormElement);
});

popupImageCloseButton.addEventListener('click', () => {
	closePopup(popupImageElement);
});

function InitialCards() {
	arrayCard.forEach((item) => {
		const card = createNewCard(item);
		renderCard(card);
	});
}

function addNewCard(item) {
	const card = createNewCard(item);
	renderCard(card);
}

function createNewCard(item) {
	const card = new Card(item, '#template-card', openPopup);
	const cardElement = card.generateCard();
	return cardElement;
}

function renderCard(card) {
	elementsSectionElement.prepend(card);
}

function addNewCardSubmitHandler(event) {
	event.preventDefault();
	addNewCard({ link: placeInputElement.value, name: titleInputElement.value });
	closePopup(popupAddFormElement);
}

popupAddFormContainer.addEventListener('submit', (event) => {
	addNewCardSubmitHandler(event);
	popupAddFormContainer.reset();
});

const formEditContainerValidation = new FormValidator(listValidation, popupEditContainer);
formEditContainerValidation.enableValidation();

const formAddContainerValidation = new FormValidator(listValidation, popupAddFormContainer);
formAddContainerValidation.enableValidation();

InitialCards();