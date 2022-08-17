export class FormValidator {
	constructor(config) {
		this.config = config;
	}

	enableValidation() {
		const formList = Array.from(document.querySelectorAll(this.config.form));
		formList.forEach(form => {
			form.addEventListener('submit', event => {
				this._handleFormSubmit(event);
			});
			this._setInputListener(form);
		});
	}

	_handleFormSubmit(event) {
		event.preventDefault();
	}

	_setInputListener(form) {
		const inputList = Array.from(form.querySelectorAll(this.config.input));
		this._setSubmitButtonState(form);
		inputList.forEach(input => {
			input.addEventListener('input', event => {
				this._handleInputValidity(event);
				this._setSubmitButtonState(form);
			});
		});
	}

	_handleInputValidity(event) {
		const input = event.target;

		if (!input.validity.valid) {
			this._showInputError(input, input.validationMessage);
		} else {
			this._hideInputError(input);
		}
	}

	_showInputError(input, errorMassege) {
		const span = document.querySelector(`.${input.id}-error`);

		input.classList.add(this.config.inputError);
		span.classList.add(this.config.spanError);
		span.textContent = errorMassege;
	}

	_hideInputError(input) {
		const span = document.querySelector(`.${input.id}-error`);

		input.classList.remove(this.config.inputError);
		span.classList.remove(this.config.spanError);
		span.textContent = '';
	}

	_setSubmitButtonState(form) {
		const isValid = form.checkValidity();

		if (!isValid) {
			this.disableSubmitButton(form)
		} else {
			this.enableSubmitButton(form)
		}
	}

	enableSubmitButton(form) {
		const saveButton = form.querySelector(this.config.bottonSave);

		saveButton.classList.remove(this.config.bottonSaveInactive);
		saveButton.removeAttribute('disabled');
	}

	disableSubmitButton(form) {
		const saveButton = form.querySelector(this.config.bottonSave);

		saveButton.classList.add(this.config.bottonSaveInactive);
		saveButton.setAttribute('disabled', true);
	}
}