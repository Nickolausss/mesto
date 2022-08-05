function enableValidation(config) {
	const formList = Array.from(document.querySelectorAll(config.form));
	formList.forEach(form => {
		form.addEventListener('submit', event => {
			handleFormSubmit(event);
		});
		setInputListener(form, config);
	});
}

function handleFormSubmit(event) {
	event.preventDefault();
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
	const span = Array.from(document.querySelectorAll(`.${input.id}-error`));
	span.forEach(span => {
		span.classList.add(config.spanError);
		span.textContent = errorMassege;
	});

	input.classList.add(config.inputError);
}

function hideInputError(input, config) {
	const span = Array.from(document.querySelectorAll(`.${input.id}-error`));
	span.forEach(span => {
		span.classList.remove(config.spanError);
		span.textContent = '';
	});

	input.classList.remove(config.inputError);
}

function setSubmitButtonState(form, config) {
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