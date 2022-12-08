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

	setUserInfo(title, subtitle, avatar) {
		this._userTitle.textContent = title;
		this._userSubtitle.textContent = subtitle;
		this._userAvatar.src = avatar;
	}
}