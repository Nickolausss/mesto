export default class FormValidator {
	constructor(config, form) {
		this._config = config;
		this._form = form;
		this._saveButton = this._form.querySelector(this._config.bottonSave);
		this._inputList = Array.from(this._form.querySelectorAll(this._config.input));
	}

	enableValidation() {
		this._setInputListener();
	}

	_setInputListener() {
		this._setSubmitButtonState();
		this._inputList.forEach(input => {
			input.addEventListener('input', event => {
				this._handleInputValidity(event);
				this._setSubmitButtonState();
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

		input.classList.add(this._config.inputError);
		span.classList.add(this._config.spanError);
		span.textContent = errorMassege;
	}

	_hideInputError(input) {
		const span = document.querySelector(`.${input.id}-error`);

		input.classList.remove(this._config.inputError);
		span.classList.remove(this._config.spanError);
		span.textContent = '';
	}

	_setSubmitButtonState() {
		const isValid = this._form.checkValidity();

		if (!isValid) {
			this._disableSubmitButton();
		} else {
			this._enableSubmitButton();
		}
	}

	resetValidation() {
		this._setSubmitButtonState();

		this._inputList.forEach(input => {
			this._hideInputError(input);
		})
	}

	_enableSubmitButton() {
		this._saveButton.classList.remove(this._config.bottonSaveInactive);
		this._saveButton.removeAttribute('disabled');
	}

	_disableSubmitButton() {
		this._saveButton.classList.add(this._config.bottonSaveInactive);
		this._saveButton.setAttribute('disabled', true);
	}
}