export class Card {
	constructor(data, template, openPopup) {
		this.name = data.name;
		this.link = data.link;
		this.template = template;
		this.openPopup = openPopup;
	}

	_getTemplate() {
		const templateCardElementClone = document.querySelector(this.template).content.querySelector('.element').cloneNode(true);

		return templateCardElementClone;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners();

		this._element.querySelector('.element__title').textContent = this.name;
		this._element.querySelector('.element__image').src = this.link;
		this._element.querySelector('.element__image').alt = this.name;

		return this._element;
	}

	_setEventListeners() {
		this._element.querySelector('.element__button-like').addEventListener('click',
			event => {
				const switchLike = event.target;
				switchLike.classList.toggle('button__like_active');
			});

		this._element.querySelector('.element__button-trash').addEventListener('click', () => {
			this._element.remove();
		});

		this._element.querySelector('.element__image').addEventListener('click',
			() => {
				const popupImageElement = document.querySelector('.popup_type_image');
				this.openPopup(popupImageElement);
				popupImageElement.querySelector('.popup__image').src = this.link;
				popupImageElement.querySelector('.popup__image').alt = this.name;
				popupImageElement.querySelector('.popup__image-subtitle').textContent = this.name;
			});
	}
}