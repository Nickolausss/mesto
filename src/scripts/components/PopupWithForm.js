import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(formSelector, handlerFormSubmit) {
		super(formSelector);
		this._handlerFormSubmit = handlerFormSubmit;
		this._form = formSelector.querySelector('.popup__container');
		this._inputList = this._form.querySelectorAll('.popup__item');
	}

	close() {
		super.close();
		this._form.reset();
	}

	_getInputValues() {
		this._formValues = {};

		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handlerFormSubmit(this._getInputValues());
			this.close();
		})
	}
}