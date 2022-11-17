const greeceImage = new URL('../../images/element/element-greece.jpg', import.meta.url);
const hongkongImage = new URL('../../images/element/element-hongkong.jpg', import.meta.url);
const indonesiaImage = new URL('../../images/element/element-indonesia.jpg', import.meta.url);
const koreaImage = new URL('../../images/element/element-korea.jpg', import.meta.url);
const usaImage = new URL('../../images/element/element-usa.jpg', import.meta.url);
const uaeImage = new URL('../../images/element/element-uae.jpg', import.meta.url);

export const arrayCard = [
	{ name: 'Греция', link: greeceImage },
	{ name: 'Гонконг', link: hongkongImage },
	{ name: 'Индонезия', link: indonesiaImage },
	{ name: 'Южная Корея', link: koreaImage },
	{ name: 'Соединенные Штаты Америки', link: usaImage },
	{ name: 'Объединённые Арабские Эмираты', link: uaeImage }
];

export const listValidation = {
	input: '.popup__item',
	inputError: 'popup__item_type_error',
	spanError: 'popup__item-error_active',
	bottonSave: '.popup__save-button',
	bottonSaveInactive: 'popup__save-button_inactive'
};