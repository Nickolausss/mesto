export default class UserInfo {
	constructor(dataSelectors) {
		this._userTitle = document.querySelector(dataSelectors.title);
		this._userSubtitle = document.querySelector(dataSelectors.subtitle);
		this._userAvatar = document.querySelector(dataSelectors.avatar);
	}

	getUserInfo() {
		this._dataInfo = { name: this._userTitle.textContent, description: this._userSubtitle.textContent };
		return this._dataInfo;
	}

	setUserInfo({ name, about, avatar }) {
		this._userTitle.textContent = name;
		this._userSubtitle.textContent = about;
		this._userAvatar.src = avatar;
	}
}