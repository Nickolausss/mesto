const listValidation = {
	form: '.popup__container',
	input: '.popup__item',
	inputError: 'popup__item_type_error',
	spanError: 'popup__item-error_active',
	bottonSave: '.popup__save-button',
	bottonSaveInactive: 'popup__save-button_inactive'
};

function enableValidation(config) {
	const formList = Array.from(document.querySelectorAll(config.form));
	formList.forEach(form => {
		form.addEventListener('submit', event => {
			handleFormSubmit(event, config);
		});
		setInputListener(form, config);
	});
}

function handleFormSubmit(event, config) {
	event.preventDefault();

	const form = event.currentTarget;

	const saveButton = form.querySelector(config.bottonSave);
	const isValid = form.checkValidity();

	if (!isValid) {
		saveButton.classList.add(config.bottonSaveInactive);
		saveButton.setAttribute('disabled', true);
	} else {
		saveButton.classList.remove(config.bottonSaveInactive);
		saveButton.removeAttribute('disabled');
	}
}

function setInputListener(form, config) {
	const inputList = Array.from(form.querySelectorAll(config.input));
	setSubmitButtonState(form, config);
	inputList.forEach(input => {
		input.addEventListener('input', event => {
			handleInputValidity(event, config);
			setSubmitButtonState(form, config);
		});
	});
}

function handleInputValidity(event, config) {
	const input = event.target;

	if (!input.validity.valid) {
		showInputError(input, config, input.validationMessage);
	} else {
		hideInputError(input, config);
	}
}

function showInputError(input, config, errorMassege) {
	const span = document.querySelector(`.${input.id}-error`);

	input.classList.add(config.inputError);
	span.classList.add(config.spanError);
	span.textContent = errorMassege;
}

function hideInputError(input, config) {
	const span = document.querySelector(`.${input.id}-error`);

	input.classList.remove(config.inputError);
	span.classList.remove(config.spanError);
	span.textContent = '';
}

function setSubmitButtonState(form, config) {
	const isValid = form.checkValidity();

	if (!isValid) {
		disableSubmitButton(form, config)
	} else {
		enableSubmitButton(form, config)
	}
}

function enableSubmitButton(form, config) {
	const saveButton = form.querySelector(config.bottonSave);

	saveButton.classList.remove(config.bottonSaveInactive);
	saveButton.removeAttribute('disabled');
}

function disableSubmitButton(form, config) {
	const saveButton = form.querySelector(config.bottonSave);

	saveButton.classList.add(config.bottonSaveInactive);
	saveButton.setAttribute('disabled', true);
}

enableValidation(listValidation);