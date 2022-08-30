export default class UserInfo {
	constructor(dataSelectors) {
		this._userTitle = document.querySelector(dataSelectors.title);
		this._userSubtitle = document.querySelector(dataSelectors.subtitle);
	}

	getUserInfo() {
		this._dataInfo = { title: this._userTitle.textContent, subtitle: this._userSubtitle.textContent };
		return this._dataInfo;
	}

	setUserInfo(data) {
		this._userTitle.textContent = data.title;
		this._userSubtitle.textContent = data.subtitle;
	}
}