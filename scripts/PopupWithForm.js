import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(formSelector, handlerAddFormSubmit) {
		super(formSelector);
		this._handlerAddFormSubmit = handlerAddFormSubmit;
		this._formAdd = formSelector.querySelector('.popup__container');
		this._inputList = this._formAdd.querySelectorAll('.popup__item');
	}

	close() {
		super.close();
		this._formAdd.reset();
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
		this._formAdd.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handlerAddFormSubmit(this._getInputValues());
			this.close();
		})
	}
}