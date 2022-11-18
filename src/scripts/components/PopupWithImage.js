import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(formSelector) {
		super(formSelector)
		this._image = formSelector.querySelector('.popup__image');
		this._subtitle = formSelector.querySelector('.popup__image-subtitle');

	}

	open(element) {
		this._image.src = element.link;
		this._image.alt = element.name;
		this._subtitle.textContent = element.name;
		super.open();
	}
}