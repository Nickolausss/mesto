const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const editButtonToOpenPopupElement = document.querySelector('.profile__edit-button');

function openPopup() {
	popupElement.classList.add('popup_opened');
	addNameInInput()
};
function closePopup() {
	popupElement.classList.remove('popup_opened');
};
const closePopupByClickOnOverlay = function (event) {
	if (event.target !== event.currentTarget) {
		return;
	}
	closePopup();
};

function addNameInInput() {
	let nameInputElement = popupElement.querySelector('.popup__item_name');
	let descriptionInputElement = popupElement.querySelector('.popup__item_description');
	let profileTitleElement = document.querySelector('.profile__title');
	let profileSubtitleElement = document.querySelector('.profile__subtitle');

	nameInputElement.value = profileTitleElement.textContent;
	descriptionInputElement.value = profileSubtitleElement.textContent;
};

editButtonToOpenPopupElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);


let popupContainer = document.querySelector('.popup__container');

function popupContainerSubmitHandler(evt) {
	let nameInputElement = popupContainer.querySelector('.popup__item_name');
	let descriptionInputElement = popupContainer.querySelector('.popup__item_description');

	let valueNameInputElement = nameInputElement.value;
	let valueDescriptionInputElement = descriptionInputElement.value;

	let profileTitleElement = document.querySelector('.profile__title');
	let profileSubtitleElement = document.querySelector('.profile__subtitle');

	profileTitleElement.textContent = valueNameInputElement;
	profileSubtitleElement.textContent = valueDescriptionInputElement;

	evt.preventDefault();
	closePopup();
};

popupContainer.addEventListener('submit', popupContainerSubmitHandler);