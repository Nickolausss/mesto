import './index.css';

import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
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
	popupImageElement,
	// popup confirm delete card
	popupDeleteCard,
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
	(inputsValue) => {
		api.addNewCard(inputsValue)
			.then(result => {
				fillCallCreateCard(result)
			})
			.catch(error => {
				console.log(`Ошибка в методе addNewCard: ${error}`);
			})
	}
);

const userInfoClass = new UserInfo({
	title: '.profile__title',
	subtitle: '.profile__subtitle',
	avatar: '.profile__avatar'
});

const popupEditFormClass = new PopupWithForm(
	popupEditProfile,
	(inputsValue) => {
		api.editProfileInfo(inputsValue)
			.then(result => {
				userInfoClass.setUserInfo(
					result.name,
					result.about,
					result.avatar
				)
			})
			.catch(error => {
				console.log(`Ошибка в методе editProfileInfo: ${error}`);
			})
	}
);

const popupConfirmDeleteClass = new PopupWithConfirmation(popupDeleteCard);


popupImageClass.setEventListeners();
popupAddFormClass.setEventListeners();
popupEditFormClass.setEventListeners();
popupConfirmDeleteClass.setEventListeners();


function createCard(data, selector, renders) {
	const card = new Card(data, selector, renders);
	const cardElement = card.generateCard();

	cardList.addItem(cardElement);
};

const cardList = new Section(
	(cardItem) => {
		fillCallCreateCard(cardItem);
	}
	, '.elements');


function fillCallCreateCard(cardObj) {
	createCard(
		{
			name: cardObj.name,
			link: cardObj.link,
			ownerCardId: cardObj.owner._id,
			userId: userId,
			likes: cardObj.likes
		},
		'#template-card',
		{
			handleImageClick: () => { popupImageClass.open(cardObj) },
			handleDeleteClick: () => { popupConfirmDeleteClass.open() }
		}
	);
}


const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
	headers: {
		authorization: 'f6cef007-4eef-419c-ad73-606a47e7b588',
		'Content-Type': 'application/json'
	}
});


let userId;

api.getProfileInfo()
	.then(result => {
		userInfoClass.setUserInfo(
			result.name,
			result.about,
			result.avatar
		);

		userId = result._id;
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