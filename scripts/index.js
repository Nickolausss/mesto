const selectors = {
	// general
	form: '.popup__container',
	closeButton: '.popup__close-button',
	// popup edit form
	popupEditProfile: '.popup_edit-form',
	nameInput: '.popup__item_input_name',
	descriptionInput: '.popup__item_input_description',
	// block profile
	editButton: '.profile__edit-button',
	profileTitle: '.profile__title',
	profileSubtitle: '.profile__subtitle',
	addButton: '.profile__add-button',
	// popup add form
	popupAddForm: '.popup_add-form',
	placeInput: '.popup__item_input_place',
	titleInput: '.popup__item_input_title',
	// elemets section
	elementsSection: '.elements',
	// popup image
	popupImage: '.popup_image',
	// template-card
	templateCard: '#template-card',
	templateCardElement: '.element'
};

// popup edit form
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupEditContainer = popupEditProfile.querySelector(selectors.form);
const popupEditCloseButton = popupEditProfile.querySelector(selectors.closeButton);
const nameInputElement = popupEditProfile.querySelector(selectors.nameInput);
const descriptionInputElement = popupEditProfile.querySelector(selectors.descriptionInput);
// block profile
const editButtonToOpenPopupEditProfile = document.querySelector(selectors.editButton);
const profileTitleElement = document.querySelector(selectors.profileTitle);
const profileSubtitleElement = document.querySelector(selectors.profileSubtitle);
const profileAddButtonForAddForm = document.querySelector(selectors.addButton);
// popup add form
const popupAddFormElement = document.querySelector(selectors.popupAddForm);
const popupAddFormContainer = popupAddFormElement.querySelector(selectors.form);
const placeInputElement = popupAddFormElement.querySelector(selectors.placeInput);
const titleInputElement = popupAddFormElement.querySelector(selectors.titleInput);
const popupAddCloseButton = popupAddFormElement.querySelector(selectors.closeButton);
// elemets section
const elementsSectionElement = document.querySelector(selectors.elementsSection);
// popup image
const popupImageElement = document.querySelector(selectors.popupImage);
const popupImageCloseButton = popupImageElement.querySelector(selectors.closeButton);
// template-card
const templateCard = document.querySelector(selectors.templateCard).content;
const templateCardElement = templateCard.querySelector(selectors.templateCardElement);

function openPopup(popup) {
	popup.classList.add('popup_opened');
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
}

function closePopupByClickOnOverlay(event) {
	if (event.target !== event.currentTarget) {
		return;
	} else {
		closePopup(event.currentTarget);
	}
}

function closePopupByPressEscapeKey(event, form) {
	if (event.key !== 'Escape') {
		return;
	} else {
		closePopup(form);
	}
}

editButtonToOpenPopupEditProfile.addEventListener('click', () => {
	openPopup(popupEditProfile);
	enableValidation(formPopupEditForm);
	fillPopupProfileFormFields();

	popupEditProfile.addEventListener('click', closePopupByClickOnOverlay);
	document.addEventListener('keydown', (event) => {
		closePopupByPressEscapeKey(event, popupEditProfile);
	});
});

function fillPopupProfileFormFields() {
	nameInputElement.value = profileTitleElement.textContent;
	descriptionInputElement.value = profileSubtitleElement.textContent;
};

function popupContainerSubmitHandler(evt) {
	evt.preventDefault();

	const valueNameInputElement = nameInputElement.value;
	const valueDescriptionInputElement = descriptionInputElement.value;

	profileTitleElement.textContent = valueNameInputElement;
	profileSubtitleElement.textContent = valueDescriptionInputElement;

	closePopup(popupEditProfile);
};

popupEditContainer.addEventListener('submit', popupContainerSubmitHandler);

popupEditCloseButton.addEventListener('click', () => {
	closePopup(popupEditProfile);
});

profileAddButtonForAddForm.addEventListener('click', () => {
	openPopup(popupAddFormElement);
	placeInputElement.value = '';
	titleInputElement.value = '';
	enableValidation(formPopupAddForm);

	popupAddFormElement.addEventListener('click', closePopupByClickOnOverlay);
	document.addEventListener('keydown', (event) => {
		closePopupByPressEscapeKey(event, popupAddFormElement);
	});
});

popupAddCloseButton.addEventListener('click', () => {
	closePopup(popupAddFormElement);
});

function addInitialCards() {
	const arrayCard = [
		{ name: 'Греция', link: './images/element/element-greece.jpg' },
		{ name: 'Гонконг', link: './images/element/element-hongkong.jpg' },
		{ name: 'Индонезия', link: './images/element/element-indonesia.jpg' },
		{ name: 'Южная Корея', link: './images/element/element-korea.jpg' },
		{ name: 'Соединенные Штаты Америки', link: './images/element/element-usa.jpg' },
		{ name: 'Объединённые Арабские Эмираты', link: './images/element/element-uae.jpg' }
	];

	arrayCard.forEach(card => addNewCard(card));
}

function createNewCard(card) {
	const templateCardElementClone = templateCardElement.cloneNode(true);
	const templateCardImage = templateCardElementClone.querySelector('.element__image');

	templateCardImage.src = card.link;
	templateCardImage.alt = card.name;
	templateCardElementClone.querySelector('.element__title').textContent = card.name;

	templateCardElementClone.querySelector('.element__button-like').addEventListener('click',
		function (event) {
			const switchLike = event.target;
			switchLike.classList.toggle('button__like_active');
		});

	templateCardElementClone.querySelector('.element__button-trash').addEventListener('click', function () {
		templateCardElementClone.remove();
	});

	templateCardImage.addEventListener('click',
		function () {
			openPopup(popupImageElement);
			popupImageElement.querySelector('.popup__image').src = card.link;
			popupImageElement.querySelector('.popup__image').alt = card.name;
			popupImageElement.querySelector('.popup__image-subtitle').textContent = card.name;

			popupImageElement.addEventListener('click', closePopupByClickOnOverlay);
			document.addEventListener('keydown', (event) => {
				closePopupByPressEscapeKey(event, popupImageElement);
			});
		});

	return templateCardElementClone;
}

function newCard() {
	popupAddFormContainer.addEventListener('submit', function (event) {
		event.preventDefault();
		addNewCard({ link: placeInputElement.value, name: titleInputElement.value });
		closePopup(popupAddFormElement);
	})
}

function addNewCard(card) {
	const cardElement = createNewCard(card);
	elementsSectionElement.prepend(cardElement);
}

popupImageCloseButton.addEventListener('click', () => {
	closePopup(popupImageElement);
});

newCard();
addInitialCards();