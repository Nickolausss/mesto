import './index.css';

import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import {
	listValidation,
	nameOfForm,
	selectors,
	// block profile
	buttonEditToOpenPopupEditProfile,
	profileAddButtonForAddForm,
	buttonChangeAvatar,
} from '../scripts/utils/constants.js';

buttonEditToOpenPopupEditProfile.addEventListener('click', () => {
	popupEditFormClass.open();
	popupEditFormClass.setInputValues(userInfoClass.getUserInfo());
	formValidators[nameOfForm.editForm].resetValidation();
});

profileAddButtonForAddForm.addEventListener('click', () => {
	popupAddFormClass.open();
	formValidators[nameOfForm.addFrom].resetValidation();
});

buttonChangeAvatar.addEventListener('click', () => {
	popupChangeAvatarClass.open();
	formValidators[nameOfForm.avatarForm].resetValidation();
})

const formValidators = {};

const enableValidation = (selectors) => {
	const formList = Array.from(document.querySelectorAll(selectors.form));
	formList.forEach(form => {
		const validator = new FormValidator(selectors, form);
		const formName = form.getAttribute('name');

		formValidators[formName] = validator;

		validator.enableValidation();
	})
}

enableValidation(listValidation);


const popupImageClass = new PopupWithImage(selectors.popupImage);

const popupAddFormClass = new PopupWithForm(
	selectors.popupAddForm,
	(inputsValue) => {
		api.addNewCard(inputsValue)
			.then(result => {
				fillCallCreateCard(result);
				popupAddFormClass.close();
			})
			.catch(error => {
				console.log(`Ошибка в методе addNewCard: ${error}`);
			})
			.finally(() => {
				popupAddFormClass.renderLoading(false);
			})
	}
);

const userInfoClass = new UserInfo({
	title: '.profile__title',
	subtitle: '.profile__subtitle',
	avatar: '.profile__avatar'
});

const popupEditFormClass = new PopupWithForm(
	selectors.popupEditProfile,
	(inputsValue) => {
		api.editProfileInfo(inputsValue)
			.then(result => {
				userInfoClass.setUserInfo(result);
				popupEditFormClass.close();
			})
			.catch(error => {
				console.log(`Ошибка в методе editProfileInfo: ${error}`);
			})
			.finally(() => {
				popupEditFormClass.renderLoading(false);
			})
	}
);

const popupConfirmDeleteClass = new PopupWithConfirmation(selectors.popupDelete);

const popupChangeAvatarClass = new PopupWithForm(
	selectors.popupChange,
	(inputValue) => {
		api.changeAvatar(inputValue)
			.then(result => {
				userInfoClass.setUserInfo(result);
				popupChangeAvatarClass.close();
			})
			.catch(error => {
				console.log(`Ошибка в методе changeAvatar: ${error}`);
			})
			.finally(() => {
				popupChangeAvatarClass.renderLoading(false);
			})
	}
);


popupImageClass.setEventListeners();
popupAddFormClass.setEventListeners();
popupEditFormClass.setEventListeners();
popupConfirmDeleteClass.setEventListeners();
popupChangeAvatarClass.setEventListeners();


function createCard(data, selector, render) {
	const card = new Card(
		data, // 1
		selector, // 2
		render, // 3
		(id) => {
			popupConfirmDeleteClass.open();
			popupConfirmDeleteClass.rewriteHandleButtonClick(
				() => {
					api.deleteCard(id)
						.then(result => {
							console.log(result);
							card.removeCard();
							popupConfirmDeleteClass.close();
						})
						.catch(error => {
							console.log(`Ошибка в методе deleteCard: ${error}`);
						})
				}
			);
		}, // 4
		(id) => {
			if (card.isLiked()) {
				api.deleteLike(id)
					.then(result => {
						card.setLikes(result.likes);
					})
					.catch(error => {
						console.log(`Ошибка в методе deleteLike: ${error}`);
					})
			} else {
				api.addLike(id)
					.then(result => {
						card.setLikes(result.likes);
					})
					.catch(error => {
						console.log(`Ошибка в методе addLike: ${error}`);
					})
			}
		}, // 5
	);
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
			likes: cardObj.likes,
			cardId: cardObj._id
		},
		'#template-card',
		() => { popupImageClass.open(cardObj) }
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

Promise.all([api.getProfileInfo(), api.getInitialCards()])
	.then(([userData, cards]) => {
		userInfoClass.setUserInfo(userData);
		userId = userData._id;

		console.log(cards);
		cardList.renderItems(cards);
	})
	.catch(error => {
		console.log(`Ошибка в Promose.all: getProfileInfo и getInitialCards: ${error}`);
	})