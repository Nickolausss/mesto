import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(formSelector) {
		super(formSelector)
		this._image = formSelector.querySelector('.popup__image');
		this._subtitle = formSelector.querySelector('.popup__image-subtitle');

	}

	open(card) {
		this._image.src = card.link;
		this._image.alt = card.name;
		this._subtitle.textContent = card.name;
		super.open();
	}
}