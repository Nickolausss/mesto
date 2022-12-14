import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handlerFormSubmit) {
		super(popupSelector);
		this._handlerFormSubmit = handlerFormSubmit;

		this._buttonSave = this._popup.querySelector('.popup__save-button');
		this._form = this._popup.querySelector('.popup__container');
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
			this.toggleStatusSavingButton(true);
			this._handlerFormSubmit(this._getInputValues());
		})
	}

	toggleStatusSavingButton(status) {
		if (status) {
			this._buttonSave.textContent = 'Сохранение...';
		} else {
			this._buttonSave.textContent = 'Сохранить';
		}
	}
}