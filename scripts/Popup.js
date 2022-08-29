export default class Popup {
	constructor(formSelector) {
		this._formSelector = formSelector;
		this._popupButtonClose = formSelector.querySelector('.popup__close-button');
		this._handleEscClose = this._handleEscClose.bind(this);
		this._handleOverlayClose = this._handleOverlayClose.bind(this);
	}

	open() {
		this._formSelector.classList.add('popup_opened');

		document.addEventListener('keydown', this._handleEscClose);
		this._formSelector.addEventListener('click', this._handleOverlayClose);
	}

	close() {
		this._formSelector.classList.remove('popup_opened');

		this._formSelector.removeEventListener('click', this._handleOverlayClose);
		document.removeEventListener('keydown', this._handleEscClose);
	}

	setEventListeners() {
		this._popupButtonClose.addEventListener('click', () => {
			this.close();
		});
	}

	_handleEscClose(event) {
		if (event.key === 'Escape') {
			this.close();
		}
	}

	_handleOverlayClose(event) {
		if (event.target === event.currentTarget) {
			this.close(event.currentTarget);
		}
	}
}