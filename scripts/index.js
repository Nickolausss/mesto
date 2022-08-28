import {
	arrayCard,
	listValidation
} from './arrays.js';

import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
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

buttonEditToOpenPopupEditProfile.addEventListener('click', () => {
	popupClass.open();
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

	popupClass.close();
};

popupEditContainer.addEventListener('submit', handleProfileFormSubmit);

profileAddButtonForAddForm.addEventListener('click', () => {
	openPopup(popupAddFormElement);
	formAddContainerValidation.disableSubmitButton();
});

popupAddCloseButton.addEventListener('click', () => {
	closePopup(popupAddFormElement);
});

function addNewCardSubmitHandler(event) {
	event.preventDefault();
	addNewCard([{ name: titleInputElement.value, link: placeInputElement.value }]);
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

// Практическая работа 8

function addNewCard(obj) {
	const cardList = new Section({
		items: obj,
		renderer: (cardItem) => {
			const card = new Card(cardItem, '#template-card', () => {
				popupImageClass.open(cardItem);
			});

			const cardElement = card.generateCard();

			cardList.addItem(cardElement);
		}
	}, '.elements');

	cardList.renderer();
}

addNewCard(arrayCard);

const popupClass = new Popup(popupEditProfile);
const popupImageClass = new PopupWithImage(popupImageElement);