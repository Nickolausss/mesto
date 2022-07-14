// popup
const popupElement = document.querySelector('.popup');
const popupContainer = popupElement.querySelector('.popup__container');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const nameInputElement = popupElement.querySelector('.popup__item_input_name');
const descriptionInputElement = popupElement.querySelector('.popup__item_input_description');
// profile
const editButtonToOpenPopupElement = document.querySelector('.profile__edit-button');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const profileAddButton = document.querySelector('.profile__add-button');
// popup add form
const popupAddFormElement = document.querySelector('.popup_add-form');
const popupContainerElement = popupAddFormElement.querySelector('.popup__container');
const popupCloseButtonAddFormElement = popupAddFormElement.querySelector('.popup__close-button');
const titleInputElement = popupAddFormElement.querySelector('.popup__item_input_title');
const placeInputElement = popupAddFormElement.querySelector('.popup__item_input_place');
// elemets section
const elementsSectionElement = document.querySelector('.elements');
// popup image
const popupImageElement = document.querySelector('.popup_image');
const popupImageCloseButtonElement = popupImageElement.querySelector('.popup__close-button');

function openPopup() {
	popupElement.classList.add('popup_opened');
	addNameInInput()
};
function closePopup() {
	popupElement.classList.remove('popup_opened');
};
// const closePopupByClickOnOverlay = function (event) {
// 	if (event.target !== event.currentTarget) {
// 		return;
// 	}
// 	closePopup();
// };

function addNameInInput() {
	nameInputElement.value = profileTitleElement.textContent;
	descriptionInputElement.value = profileSubtitleElement.textContent;
};

editButtonToOpenPopupElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
// popupElement.addEventListener('click', closePopupByClickOnOverlay);


function popupContainerSubmitHandler(evt) {
	let valueNameInputElement = nameInputElement.value;
	let valueDescriptionInputElement = descriptionInputElement.value;

	profileTitleElement.textContent = valueNameInputElement;
	profileSubtitleElement.textContent = valueDescriptionInputElement;

	evt.preventDefault();
	closePopup();
};

popupContainer.addEventListener('submit', popupContainerSubmitHandler);

function openPopupAddForm() {
	popupAddFormElement.classList.add('popup_opened');
	placeInputElement.value = '';
	titleInputElement.value = '';
};

function closePopupAddForm() {
	popupAddFormElement.classList.remove('popup_opened');
};

profileAddButton.addEventListener('click', openPopupAddForm);
popupCloseButtonAddFormElement.addEventListener('click', closePopupAddForm);

function createNewCard(place, title) {
	const templateCardsElement = document.querySelector('.template-cards').content.querySelector('.element').cloneNode(true);

	templateCardsElement.querySelector('.element__image').src = place;
	templateCardsElement.querySelector('.element__image').alt = title;
	templateCardsElement.querySelector('.element__title').textContent = title;

	templateCardsElement.querySelector('.element__button-like').addEventListener('click',
		function (event) {
			const switchLike = event.target;
			switchLike.classList.toggle('button__like_active');
		});

	templateCardsElement.querySelector('.element__button-trash').addEventListener('click', function () {
		templateCardsElement.remove();
	});

	templateCardsElement.querySelector('.element__image').addEventListener('click',
		function () {
			openPopupImage();
			popupImageElement.querySelector('.popup__image').src = place;
			popupImageElement.querySelector('.popup__image-subtitle').textContent = title;
		});

	elementsSectionElement.prepend(templateCardsElement);
}

function addNewCardBySubmit() {
	popupContainerElement.addEventListener('submit', function (event) {
		event.preventDefault();
		createNewCard(placeInputElement.value, titleInputElement.value);
		closePopupAddForm()
	})
}

function arrayAutoCards() {
	let arrayCard = [
		{ name: 'Греция', link: './images/element/element-greece.jpg' },
		{ name: 'Гонконг', link: './images/element/element-hongkong.jpg' },
		{ name: 'Индонезия', link: './images/element/element-indonesia.jpg' },
		{ name: 'Южная Корея', link: './images/element/element-korea.jpg' },
		{ name: 'Соединенные Штаты Америки', link: './images/element/element-usa.jpg' },
		{ name: 'Объединённые Арабские Эмираты', link: './images/element/element-uae.jpg' }
	];

	arrayCard.forEach(card => createNewCard(card.link, card.name));
}
// popup image

function openPopupImage() {
	popupImageElement.classList.add('popup_opened');
}

popupImageCloseButtonElement.addEventListener('click',
	function () {
		popupImageElement.classList.remove('popup_opened');
	});

addNewCardBySubmit();
arrayAutoCards();