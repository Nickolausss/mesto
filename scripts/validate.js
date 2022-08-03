const formPopupEditForm = {
	form: '.popup__container[name="popup-edit-form"]',
	button: '.popup__save-button'
};

const formPopupAddForm = {
	form: '.popup__container[name="popup-add-form"]',
	button: '.popup__save-button'
};

function enableValidation(config) {
	const form = document.querySelector(config.form);
	form.addEventListener('submit', handleFormSubmit);
	form.addEventListener('input', (event) => handleFormInput(event, config));

	setSubmitButtonState(form, config);
}

function handleFormSubmit(event) {
	event.preventDefault();
}

function handleFormInput(event, config) {
	const input = event.target;
	const form = event.currentTarget;
	const isValid = form.checkValidity();

	if (!isValid) {
		showInputError(input, form, input.validationMessage);
	} else {
		hideInputError(input, form);
	}

	setSubmitButtonState(form, config);
}

function showInputError(input, form, errorMassege) {
	const span = form.querySelector(`.${input.id}-error`);

	input.classList.add('popup__item_type_error');
	span.classList.add('popup__item-error_active');
	span.textContent = errorMassege;
}

function hideInputError(input, form) {
	const span = form.querySelector(`.${input.id}-error`);

	input.classList.remove('popup__item_type_error');
	span.classList.remove('popup__item-error_active');
	span.textContent = '';
}

function setSubmitButtonState(form, config) {
	const saveButton = form.querySelector(config.button);
	const isValid = form.checkValidity();

	if (!isValid) {
		saveButton.classList.add('popup__save-button_inactive');
		saveButton.setAttribute('disabled', true);
	} else {
		saveButton.classList.remove('popup__save-button_inactive');
		saveButton.removeAttribute('disabled');
	}
}