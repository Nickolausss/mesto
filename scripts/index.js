const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const editButtonToOpenPopupElement = document.querySelector('.profile__edit-button');
let nameInputElement = popupElement.querySelector('.popup__item_input_name');
let descriptionInputElement = popupElement.querySelector('.popup__item_input_description');
let profileTitleElement = document.querySelector('.profile__title');
let profileSubtitleElement = document.querySelector('.profile__subtitle');

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


let popupContainer = document.querySelector('.popup__container');

function popupContainerSubmitHandler(evt) {
	let valueNameInputElement = nameInputElement.value;
	let valueDescriptionInputElement = descriptionInputElement.value;

	profileTitleElement.textContent = valueNameInputElement;
	profileSubtitleElement.textContent = valueDescriptionInputElement;

	evt.preventDefault();
	closePopup();
};

popupContainer.addEventListener('submit', popupContainerSubmitHandler);