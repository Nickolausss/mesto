import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handlerFormSubmit) {
		super(popupSelector);
		this._handlerFormSubmit = handlerFormSubmit;

		this._buttonSave = this._popup.querySelector('.popup__save-button');
		this._buttonSaveText = this._buttonSave.textContent;
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

	setInputValues(data) {
		this._inputList.forEach(input => {
			input.value = data[input.name];
		})
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.renderLoading(true);
			this._handlerFormSubmit(this._getInputValues());
		})
	}

	renderLoading(isLoading, loadingText = 'Сохранение...') {
		if (isLoading) {
			this._buttonSave.textContent = loadingText;
		} else {
			this._buttonSave.textContent = this._buttonSaveText;
		}
	}
}