export default class UserInfo {
	constructor(dataSelectors) {
		this._userTitle = document.querySelector(dataSelectors.title);
		this._userSubtitle = document.querySelector(dataSelectors.subtitle);
		this._userAvatar = document.querySelector(dataSelectors.avatar);
	}

	getUserInfo() {
		this._dataInfo = { title: this._userTitle.textContent, subtitle: this._userSubtitle.textContent };
		return this._dataInfo;
	}

	setUserInfo(data) {
		this._userTitle.textContent = data.name;
		this._userSubtitle.textContent = data.about;
		this._userAvatar.src = data.avatar;
	}
}