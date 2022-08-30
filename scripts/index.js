import {
	arrayCard,
	listValidation
} from './arrays.js';

import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

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
	popupEditFormClass.open();
	nameInputElement.value = usreInfoClass.getUserInfo().title;
	descriptionInputElement.value = usreInfoClass.getUserInfo().subtitle;
	formEditContainerValidation.enableSubmitButton();
});

profileAddButtonForAddForm.addEventListener('click', () => {
	popupAddFormClass.open();
	formAddContainerValidation.disableSubmitButton();
});

const formEditContainerValidation = new FormValidator(listValidation, popupEditContainer);
formEditContainerValidation.enableValidation();

const formAddContainerValidation = new FormValidator(listValidation, popupAddFormContainer);
formAddContainerValidation.enableValidation();

const cardList = new Section({
	items: arrayCard,
	renderer: (cardItem) => {
		const card = new Card(cardItem, '#template-card', () => {
			popupImageClass.open(cardItem);
		});

		const cardElement = card.generateCard();

		cardList.addItem(cardElement);
	}
}, '.elements');

cardList.renderer();

const popupImageClass = new PopupWithImage(popupImageElement);
popupImageClass.setEventListeners();

const popupAddFormClass = new PopupWithForm(
	popupAddFormElement,
	(data) => {
		const card = new Card({ name: data.title, link: data.place },
			'#template-card', () => {
				popupImageClass.open({ name: data.title, link: data.place });
			});

		const cardElement = card.generateCard();

		cardList.addItem(cardElement);
	}
);
popupAddFormClass.setEventListeners();

const usreInfoClass = new UserInfo({
	title: '.profile__title',
	subtitle: '.profile__subtitle'
});

const popupEditFormClass = new PopupWithForm(
	popupEditProfile,
	(data) => {
		usreInfoClass.setUserInfo({
			title: data.name,
			subtitle: data.description
		})
	}
);
popupEditFormClass.setEventListeners();