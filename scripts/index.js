// popup edit form
const popupEditProfile = document.querySelector('.popup_edit-form');
const popupEditContainer = popupEditProfile.querySelector('.popup__container');
const popupCloseButtonElement = popupEditProfile.querySelector('.popup__close-button');
const nameInputElement = popupEditProfile.querySelector('.popup__item_input_name');
const descriptionInputElement = popupEditProfile.querySelector('.popup__item_input_description');
// profile
const editButtonToOpenPopupElement = document.querySelector('.profile__edit-button');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const profileAddButtonForAddForm = document.querySelector('.profile__add-button');
// popup add form
const popupAddFormElement = document.querySelector('.popup_add-form');
const popupAddFormContainer = popupAddFormElement.querySelector('.popup__container');
const popupCloseButtonAddFormElement = popupAddFormElement.querySelector('.popup__close-button');
const titleInputElement = popupAddFormElement.querySelector('.popup__item_input_title');
const placeInputElement = popupAddFormElement.querySelector('.popup__item_input_place');
// elemets section
const elementsSectionElement = document.querySelector('.elements');
// popup image
const popupImageElement = document.querySelector('.popup_image');
const popupImageCloseButtonElement = popupImageElement.querySelector('.popup__close-button');
// template-card
const templateCard = document.querySelector('#template-card').content;
const templateCardElement = templateCard.querySelector('.element');

function openPopup(item) {
	item.classList.add('popup_opened');
}

function closePopup(item) {
	item.classList.remove('popup_opened');
}

const openEditPopup = editButtonToOpenPopupElement.addEventListener('click', () => {
	openPopup(popupEditProfile);
	fillPopupProfileFormFields();
});

const closeEditPopup = popupCloseButtonElement.addEventListener('click', () => {
	closePopup(popupEditProfile);
});

// const closePopupByClickOnOverlay = function (event) {
// 	if (event.target !== event.currentTarget) {
// 		return;
// 	}
// 	closeEditPopup();
// };

function fillPopupProfileFormFields() {
	nameInputElement.value = profileTitleElement.textContent;
	descriptionInputElement.value = profileSubtitleElement.textContent;
};

// popupElement.addEventListener('click', closePopupByClickOnOverlay);


function popupContainerSubmitHandler(evt) {
	evt.preventDefault();

	const valueNameInputElement = nameInputElement.value;
	const valueDescriptionInputElement = descriptionInputElement.value;

	profileTitleElement.textContent = valueNameInputElement;
	profileSubtitleElement.textContent = valueDescriptionInputElement;

	closePopup(popupEditProfile);
};

popupEditContainer.addEventListener('submit', popupContainerSubmitHandler);

const openAddFormPopup = profileAddButtonForAddForm.addEventListener('click', () => {
	openPopup(popupAddFormElement);
	placeInputElement.value = '';
	titleInputElement.value = '';
});

const closeAddFormPopup = popupCloseButtonAddFormElement.addEventListener('click', () => {
	closePopup(popupAddFormElement);
});

function createNewCard(place, title) {
	const templateCardElementClone = templateCardElement.cloneNode(true);
	const templateCardImage = templateCardElementClone.querySelector('.element__image');

	templateCardImage.src = place;
	templateCardImage.alt = title;
	templateCardElementClone.querySelector('.element__title').textContent = title;

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
			popupImageElement.querySelector('.popup__image').src = place;
			popupImageElement.querySelector('.popup__image').alt = title
			popupImageElement.querySelector('.popup__image-subtitle').textContent = title;
		});

	addNewCard(templateCardElementClone);
}

function addNewCard(clone) {
	elementsSectionElement.prepend(clone);
}

function addEventListeners() {
	popupAddFormContainer.addEventListener('submit', function (event) {
		event.preventDefault();
		createNewCard(placeInputElement.value, titleInputElement.value);
		closePopup(popupAddFormElement);
	})
}

function addInitialCards() {
	const arrayCard = [
		{ name: 'Греция', link: './images/element/element-greece.jpg' },
		{ name: 'Гонконг', link: './images/element/element-hongkong.jpg' },
		{ name: 'Индонезия', link: './images/element/element-indonesia.jpg' },
		{ name: 'Южная Корея', link: './images/element/element-korea.jpg' },
		{ name: 'Соединенные Штаты Америки', link: './images/element/element-usa.jpg' },
		{ name: 'Объединённые Арабские Эмираты', link: './images/element/element-uae.jpg' }
	];

	arrayCard.forEach(card => createNewCard(card.link, card.name));
}

const closeFullScreenImagePopup = popupImageCloseButtonElement.addEventListener('click', () => {
	closePopup(popupImageElement);
});

addEventListeners();
addInitialCards();

