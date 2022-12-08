import './index.css';

import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import { listValidation } from '../scripts/utils/arrays.js';

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


const popupImageClass = new PopupWithImage(popupImageElement);

const popupAddFormClass = new PopupWithForm(
	popupAddFormElement,
	(data) => {
		createCard({ name: data.title, link: data.place },
			'#template-card', () => {
				popupImageClass.open({ name: data.title, link: data.place });
			});
	}
);

const userInfoClass = new UserInfo({
	title: '.profile__title',
	subtitle: '.profile__subtitle',
	avatar: '.profile__avatar'
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


popupImageClass.setEventListeners();
popupAddFormClass.setEventListeners();
popupEditFormClass.setEventListeners();


function createCard(data, selector, render) {
	const card = new Card(data, selector, render);
	const cardElement = card.generateCard();

	cardList.addItem(cardElement);
};

const cardList = new Section(
	(cardItem) => {
		createCard(cardItem, '#template-card', () => {
			popupImageClass.open(cardItem);
		});
	}
	, '.elements');


const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
	headers: {
		authorization: 'f6cef007-4eef-419c-ad73-606a47e7b588',
		'Content-Type': 'application/json'
	}
});


api.getProfileInfo()
	.then(result => {
		userInfoClass.setUserInfo(
			result.name,
			result.about,
			result.avatar
		)
	})
	.catch(error => {
		console.log(`Ошибка в методе getProfileInfo: ${error}`);
	})

api.getInitialCards()
	.then(result => {
		console.log(result);
		cardList.renderer(result);
	})
	.catch(error => {
		console.log(`Ошибка в методе getInitialCards: ${error}`);
	})





	// .then(result => {
	// 	console.log(result);
	// })
	// .catch(error => {
	// 	console.log(error);
	// })