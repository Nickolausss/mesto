export default class FormValidator {
	constructor(config, form) {
		this.config = config;
		this.form = form;
		this.saveButton = this.form.querySelector(this.config.bottonSave);
		this.inputList = Array.from(this.form.querySelectorAll(this.config.input));
	}

	enableValidation() {
		this._setInputListener();
	}

	_setInputListener() {
		this._setSubmitButtonState();
		this.inputList.forEach(input => {
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

	_setSubmitButtonState() {
		const isValid = this.form.checkValidity();

		if (!isValid) {
			this.disableSubmitButton();
		} else {
			this.enableSubmitButton();
		}
	}

	enableSubmitButton() {
		this.saveButton.classList.remove(this.config.bottonSaveInactive);
		this.saveButton.removeAttribute('disabled');
	}

	disableSubmitButton() {
		this.saveButton.classList.add(this.config.bottonSaveInactive);
		this.saveButton.setAttribute('disabled', true);
	}
}