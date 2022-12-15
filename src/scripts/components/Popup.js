export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);

		this._popupButtonClose = this._popup.querySelector('.popup__close-button');
		this._handleEscClose = this._handleEscClose.bind(this);
		this._handleOverlayClose = this._handleOverlayClose.bind(this);
	}

	open() {
		this._popup.classList.add('popup_opened');

		document.addEventListener('keydown', this._handleEscClose);
		this._popup.addEventListener('mousedown', this._handleOverlayClose);
	}

	close() {
		this._popup.classList.remove('popup_opened');

		this._popup.removeEventListener('mousedown', this._handleOverlayClose);
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
			this.close();
		}
	}
}