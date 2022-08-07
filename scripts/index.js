const selectors = {
	// general
	form: '.popup__container',
	buttonClose: '.popup__close-button',
	// popup edit form
	popupEditProfile: '.popup_type_profile-edit',
	nameInput: '.popup__item_input_name',
	descriptionInput: '.popup__item_input_description',
	// block profile
	buttonEdit: '.profile__edit-button',
	profileTitle: '.profile__title',
	profileSubtitle: '.profile__subtitle',
	buttonAdd: '.profile__add-button',
	// popup add form
	popupAddForm: '.popup_type_add-card',
	placeInput: '.popup__item_input_place',
	titleInput: '.popup__item_input_title',
	// elemets section
	elementsSection: '.elements',
	// popup image
	popupImage: '.popup_type_image',
	// template-card
	templateCard: '#template-card',
	templateCardElement: '.element'
};

// popup edit form
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupEditContainer = popupEditProfile.querySelector(selectors.form);
const popupEditCloseButton = popupEditProfile.querySelector(selectors.buttonClose);
const nameInputElement = popupEditProfile.querySelector(selectors.nameInput);
const descriptionInputElement = popupEditProfile.querySelector(selectors.descriptionInput);
// block profile
const buttonEditToOpenPopupEditProfile = document.querySelector(selectors.buttonEdit);
const profileTitleElement = document.querySelector(selectors.profileTitle);
const profileSubtitleElement = document.querySelector(selectors.profileSubtitle);
const profileAddButtonForAddForm = document.querySelector(selectors.buttonAdd);
// popup add form
const popupAddFormElement = document.querySelector(selectors.popupAddForm);
const popupAddFormContainer = popupAddFormElement.querySelector(selectors.form);
const placeInputElement = popupAddFormElement.querySelector(selectors.placeInput);
const titleInputElement = popupAddFormElement.querySelector(selectors.titleInput);
const popupAddCloseButton = popupAddFormElement.querySelector(selectors.buttonClose);
// elemets section
const elementsSectionElement = document.querySelector(selectors.elementsSection);
// popup image
const popupImageElement = document.querySelector(selectors.popupImage);
const popupImageCloseButton = popupImageElement.querySelector(selectors.buttonClose);
// template-card
const templateCard = document.querySelector(selectors.templateCard).content;
const templateCardElement = templateCard.querySelector(selectors.templateCardElement);

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
	const activePopup = document.querySelector('.popup_opened');
	if (event.key === 'Escape') {
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
	placeInputElement.value = '';
	titleInputElement.value = '';
	disableSubmitButton(popupAddFormElement, listValidation);
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
		});

	return templateCardElementClone;
}

function addNewCardSubmitHandler(event) {
	event.preventDefault();
	addNewCard({ link: placeInputElement.value, name: titleInputElement.value });
	closePopup(popupAddFormElement);
}

popupAddFormContainer.addEventListener('submit', addNewCardSubmitHandler);

function addNewCard(card) {
	const cardElement = createNewCard(card);
	elementsSectionElement.prepend(cardElement);
}

popupImageCloseButton.addEventListener('click', () => {
	closePopup(popupImageElement);
});

addInitialCards();