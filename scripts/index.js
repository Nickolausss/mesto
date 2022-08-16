import { Card } from './Card.js';

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

export function openPopup(popup) {
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
	enableSubmitButton(popupEditProfile, listValidation);
});

function fillPopupProfileFormFields() {
	nameInputElement.value = profileTitleElement.textContent;
	descriptionInputElement.value = profileSubtitleElement.textContent;
};

function popupContainerSubmitHandler(evt) {
	evt.preventDefault();

	profileTitleElement.textContent = nameInputElement.value;
	profileSubtitleElement.textContent = descriptionInputElement.value;

	closePopup(popupEditProfile);
};

popupEditContainer.addEventListener('submit', popupContainerSubmitHandler);

popupEditCloseButton.addEventListener('click', () => {
	closePopup(popupEditProfile);
});

profileAddButtonForAddForm.addEventListener('click', () => {
	openPopup(popupAddFormElement);
	disableSubmitButton(popupAddFormElement, listValidation);
});

popupAddCloseButton.addEventListener('click', () => {
	closePopup(popupAddFormElement);
});

popupImageCloseButton.addEventListener('click', () => {
	closePopup(popupImageElement);
});

// Практическая работа 7

const arrayCard = [
	{ name: 'Греция', link: './images/element/element-greece.jpg' },
	{ name: 'Гонконг', link: './images/element/element-hongkong.jpg' },
	{ name: 'Индонезия', link: './images/element/element-indonesia.jpg' },
	{ name: 'Южная Корея', link: './images/element/element-korea.jpg' },
	{ name: 'Соединенные Штаты Америки', link: './images/element/element-usa.jpg' },
	{ name: 'Объединённые Арабские Эмираты', link: './images/element/element-uae.jpg' }
];

function addInitialCards() {
	arrayCard.forEach(item => createNewCard(item));
}

function createNewCard(item) {
	const card = new Card(item, '#template-card');
	const cardElement = card.generateCard();

	elementsSectionElement.prepend(cardElement);
}

function addNewCardSubmitHandler(event) {
	event.preventDefault();
	createNewCard({ link: placeInputElement.value, name: titleInputElement.value });
	closePopup(popupAddFormElement);
}

popupAddFormContainer.addEventListener('submit', (event) => {
	addNewCardSubmitHandler(event);
	popupAddFormContainer.reset();
});

addInitialCards();