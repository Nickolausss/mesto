export default class Api {
	constructor(config) {
		this._baseUrl = config.baseUrl;
		this._headers = config.headers;
	};

	_checkResponse(res) {
		return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
	}

	getProfileInfo() {
		return fetch(
			`${this._baseUrl}/users/me`,
			{
				headers: this._headers
			}
		).then(this._checkResponse)
	};

	getInitialCards() {
		return fetch(
			`${this._baseUrl}/cards`,
			{
				headers: this._headers
			}
		).then(this._checkResponse)
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
		).then(this._checkResponse)
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
		).then(this._checkResponse)
	};

	deleteCard(id) {
		return fetch(
			`${this._baseUrl}/cards/${id}`,
			{
				method: 'DELETE',
				headers: this._headers
			}
		).then(this._checkResponse)
	};

	addLike(id) {
		return fetch(
			`${this._baseUrl}/cards/${id}/likes`,
			{
				method: 'PUT',
				headers: this._headers
			}
		).then(this._checkResponse)
	};

	deleteLike(id) {
		return fetch(
			`${this._baseUrl}/cards/${id}/likes`,
			{
				method: 'DELETE',
				headers: this._headers
			}
		).then(this._checkResponse)
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
		).then(this._checkResponse)
	};
};