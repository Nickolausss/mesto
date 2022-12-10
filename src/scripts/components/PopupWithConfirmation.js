import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
	constructor(formSelector, handleButtonClick) {
		super(formSelector);
		this._handleButtonClick = handleButtonClick;

		this._button = formSelector.querySelector('.popup__save-button');
	};

	rewriteHandleButtonClick(newHandleButtonClick) {
		this._handleButtonClick = newHandleButtonClick;
	}

	setEventListeners() {
		super.setEventListeners();
		this._button.addEventListener('click', () => {
			this._handleButtonClick();
		})
	}
}