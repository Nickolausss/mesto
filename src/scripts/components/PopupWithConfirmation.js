import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
	constructor(popupSelector, handleButtonClick) {
		super(popupSelector);
		this._handleButtonClick = handleButtonClick;

		this._button = this._popup.querySelector('.popup__save-button');
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