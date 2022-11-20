import './index.css';

import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';

import {
	arrayCard,
	listValidation
} from '../scripts/utils/arrays.js';

import {
	// popup edit form
	popupEditProfile,
	popupEditContainer,
	nameInputElement,
	descriptionInputElement,
	// block profile
	buttonEditToOpenPopupEditProfile,
	profileAddButtonForAddForm,
	// popup add form
	popupAddFormElement,
	popupAddFormContainer,
	// popup image
	popupImageElement
} from '../scripts/utils/constants.js';

buttonEditToOpenPopupEditProfile.addEventListener('click', () => {
	popupEditFormClass.open();
	nameInputElement.value = userInfoClass.getUserInfo().title;
	descriptionInputElement.value = userInfoClass.getUserInfo().subtitle;
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

function createCard(data, selector, render) {
	const card = new Card(data, selector, render);
	const cardElement = card.generateCard();

	cardList.addItem(cardElement);
};

const cardList = new Section({
	items: arrayCard,
	renderer: (cardItem) => {
		createCard(cardItem, '#template-card', () => {
			popupImageClass.open(cardItem);
		});
	}
}, '.elements');

cardList.renderer();

const popupImageClass = new PopupWithImage(popupImageElement);
popupImageClass.setEventListeners();

const popupAddFormClass = new PopupWithForm(
	popupAddFormElement,
	(data) => {
		createCard({ name: data.title, link: data.place },
			'#template-card', () => {
				popupImageClass.open({ name: data.title, link: data.place });
			});
	}
);
popupAddFormClass.setEventListeners();

const userInfoClass = new UserInfo({
	title: '.profile__title',
	subtitle: '.profile__subtitle'
});

const popupEditFormClass = new PopupWithForm(
	popupEditProfile,
	(data) => {
		userInfoClass.setUserInfo({
			title: data.name,
			subtitle: data.description
		})
	}
);
popupEditFormClass.setEventListeners();