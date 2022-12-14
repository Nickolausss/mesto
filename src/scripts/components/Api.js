export default class Api {
	constructor(config) {
		this._baseUrl = config.baseUrl;
		this._headers = config.headers;
	};

	getProfileInfo() {
		return fetch(
			`${this._baseUrl}/users/me`,
			{
				headers: this._headers
			}
		).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
	};

	getInitialCards() {
		return fetch(
			`${this._baseUrl}/cards`,
			{
				headers: this._headers
			}
		).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
	};

	editProfileInfo(inputsValue) {
		return fetch(
			`${this._baseUrl}/users/me`,
			{
				method: 'PATCH',
				headers: this._headers,
				body: JSON.stringify({
					name: inputsValue.name,
					about: inputsValue.description
				})
			}
		).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
	};

	addNewCard(inputsValue) {
		return fetch(
			`${this._baseUrl}/cards`,
			{
				method: 'POST',
				headers: this._headers,
				body: JSON.stringify({
					name: inputsValue.title,
					link: inputsValue.place
				})
			}
		).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
	};

	deleteCard(id) {
		return fetch(
			`${this._baseUrl}/cards/${id}`,
			{
				method: 'DELETE',
				headers: this._headers
			}
		).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
	};

	addLike(id) {
		return fetch(
			`${this._baseUrl}/cards/${id}/likes`,
			{
				method: 'PUT',
				headers: this._headers
			}
		).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
	};

	deleteLike(id) {
		return fetch(
			`${this._baseUrl}/cards/${id}/likes`,
			{
				method: 'DELETE',
				headers: this._headers
			}
		).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
	};

	changeAvatar(inputValue) {
		return fetch(
			`${this._baseUrl}/users/me/avatar`,
			{
				method: 'PATCH',
				headers: this._headers,
				body: JSON.stringify({
					avatar: inputValue.avatar
				})
			}
		).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
	};
};