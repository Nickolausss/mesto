export class Card {
	constructor(data, template, openPopup) {
		this.name = data.name;
		this.link = data.link;
		this.template = template;
		this._openPopup = openPopup;
	}

	_getTemplate() {
		const templateCardElementClone = document.querySelector(this.template).content.querySelector('.element').cloneNode(true);

		return templateCardElementClone;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners();

		const elementImage = this._element.querySelector('.element__image');

		this._element.querySelector('.element__title').textContent = this.name;
		elementImage.src = this.link;
		elementImage.alt = this.name;

		return this._element;
	}

	_setEventListeners() {
		this._element.querySelector('.element__button-like').addEventListener('click',
			event => {
				this._setToggleLikeButton(event);
			});

		this._element.querySelector('.element__button-trash').addEventListener('click', () => {
			this._handleTrashButtonToRemove();
		});

		this._element.querySelector('.element__image').addEventListener('click',
			() => {
				this._openPopup();
			});
	}

	_setToggleLikeButton(event) {
		const switchLike = event.target;
		switchLike.classList.toggle('button__like_active');
	}

	_handleTrashButtonToRemove() {
		this._element.remove();
		this._element = null;
	}
}