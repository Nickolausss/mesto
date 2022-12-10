export default class Card {
	constructor(data, template, renders) {
		this._name = data.name;
		this._link = data.link;
		this._ownerCardId = data.ownerCardId;
		this._userId = data.userId;
		this._likes = data.likes.length;

		this._template = template;

		this._handleImageClick = renders.handleImageClick;
		this._handleDeleteClick = renders.handleDeleteClick;
	}

	_getTemplate() {
		const templateCardElementClone = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);

		return templateCardElementClone;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners();

		const elementImage = this._element.querySelector('.element__image');

		this._element.querySelector('.element__title').textContent = this._name;
		elementImage.src = this._link;
		elementImage.alt = this._name;
		this._element.querySelector('.element__like-counter').textContent = this._likes;

		if (this._ownerCardId !== this._userId) {
			this._element.querySelector('.element__button-trash').setAttribute('style', 'display: none');
		}

		return this._element;
	}

	_setEventListeners() {
		this._element.querySelector('.element__button-like').addEventListener('click',
			event => {
				this._setToggleLikeButton(event);
			});

		this._element.querySelector('.element__button-trash').addEventListener('click', () => {
			this._handleDeleteClick();
			this._handleTrashButtonToRemove();
		});

		this._element.querySelector('.element__image').addEventListener('click',
			() => {
				this._handleImageClick();
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