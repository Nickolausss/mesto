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

	selectors,
	// popup edit form
	popupEditProfileForm,
	nameInputElement,
	descriptionInputElement,
	// block profile
	buttonEditToOpenPopupEditProfile,
	profileAddButtonForAddForm,
	buttonChangeAvatar,
	// popup add form
	popupAddCardForm,
	// popup change avatar
	popupChangeAvatarForm,
} from '../scripts/utils/constants.js';

buttonEditToOpenPopupEditProfile.addEventListener('click', () => {
	popupEditFormClass.open();
	nameInputElement.value = userInfoClass.getUserInfo().title;
	descriptionInputElement.value = userInfoClass.getUserInfo().subtitle;
	validationEditForm.enableSubmitButton();
});

profileAddButtonForAddForm.addEventListener('click', () => {
	popupAddFormClass.open();
	validationAddCardForm.disableSubmitButton();
});

buttonChangeAvatar.addEventListener('click', () => {
	popupChangeAvatarClass.open();
	validationChangeAvatarForm.disableSubmitButton();
})


const validationEditForm = new FormValidator(listValidation, popupEditProfileForm);
validationEditForm.enableValidation();

const validationAddCardForm = new FormValidator(listValidation, popupAddCardForm);
validationAddCardForm.enableValidation();

const validationChangeAvatarForm = new FormValidator(listValidation, popupChangeAvatarForm);
validationChangeAvatarForm.enableValidation();

const popupImageClass = new PopupWithImage(selectors.popupImage);

const popupAddFormClass = new PopupWithForm(
	selectors.popupAddForm,
	(inputsValue) => {
		api.addNewCard(inputsValue)
			.then(result => {
				fillCallCreateCard(result);
				popupAddFormClass.toggleStatusSavingButton(false);
				popupAddFormClass.close();
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
	selectors.popupEditProfile,
	(inputsValue) => {
		api.editProfileInfo(inputsValue)
			.then(result => {
				userInfoClass.setUserInfo(result);
				popupEditFormClass.toggleStatusSavingButton(false);
				popupEditFormClass.close();
			})
			.catch(error => {
				console.log(`Ошибка в методе editProfileInfo: ${error}`);
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
				popupChangeAvatarClass.toggleStatusSavingButton(false);
				popupChangeAvatarClass.close();
			})
			.catch(error => {
				console.log(`Ошибка в методе changeAvatar: ${error}`);
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

api.getProfileInfo()
	.then(result => {
		userInfoClass.setUserInfo(result);

		userId = result._id;
	})
	.catch(error => {
		console.log(`Ошибка в методе getProfileInfo: ${error}`);
	})

api.getInitialCards()
	.then(result => {
		console.log(result);
		cardList.renderItems(result);
	})
	.catch(error => {
		console.log(`Ошибка в методе getInitialCards: ${error}`);
	})