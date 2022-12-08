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
	}
};