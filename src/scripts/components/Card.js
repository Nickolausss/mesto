export default class Card {
	constructor(data, template, handleImageClick, handleDeleteClick, handleLikeClick) {
		this._name = data.name;
		this._link = data.link;
		this._ownerCardId = data.ownerCardId;
		this._userId = data.userId;
		this._likes = data.likes;
		this._cardId = data.cardId;

		this._template = template;

		this._handleImageClick = handleImageClick;
		this._handleDeleteClick = handleDeleteClick;
		this._handleLikeClick = handleLikeClick;
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

		if (this._ownerCardId !== this._userId) {
			this._element.querySelector('.element__button-trash').setAttribute('style', 'display: none');
		};

		this.setLikes(this._likes);

		return this._element;
	}

	_setEventListeners() {
		this._element.querySelector('.element__button-like').addEventListener('click',
			() => {
				this._handleLikeClick(this._cardId);
			});

		this._element.querySelector('.element__button-trash').addEventListener('click', () => {
			this._handleDeleteClick(this._cardId);
		});

		this._element.querySelector('.element__image').addEventListener('click',
			() => {
				this._handleImageClick();
			});
	}

	isLiked() {
		const userHasLike = this._likes.some(user => user._id === this._userId);
		return userHasLike;
	}

	setLikes(newSet) {
		this._likes = newSet;
		this._element.querySelector('.element__like-counter').textContent = this._likes.length;

		if (this.isLiked()) {
			this._fillLike();
		} else {
			this._emptyLike();
		};
	}

	_fillLike() {
		this._element.querySelector('.element__button-like').classList.add('button__like_active');
	}

	_emptyLike() {
		this._element.querySelector('.element__button-like').classList.remove('button__like_active');
	}

	removeCard() {
		this._element.remove();
		this._element = null;
	}
}