import CryptoJS from 'crypto-js';

const KEY: string = 'adsfghjkla2312safaaszAS';

/**
 * function to check if user is logged in or not
 */
const checkLogin = (): boolean => {
	if (localStorage.authInfo && localStorage.userInfo) {
		return true;
	} else {
		return false;
	}
};

/**
 * function to get user access token
 */
const getAccessToken = (): boolean | string => {
	try {
		const data = localStorage.authInfo;
		if (data) {
			const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
			const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			return !!decryptedData ? decryptedData : false;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
};

/**
 * function to get user language
 */
const getUserLanguage = (): string => {
	return 'en';
	// const data = localStorage.userInfo;
	// // return german as default, if user is not logged in
	// if (!data) {
	// 	return 'en';
	// }
	// const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
	// const decryptedData: AuthData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	// // return german as default, if user data not found
	// if (!decryptedData) {
	// 	return 'en';
	// }
	// return (decryptedData || {}).language || 'en';
};

/**
 * function to remove user authentication data
 */
const removeAuthData = (): void => {
	localStorage.removeItem('authInfo');
	localStorage.removeItem('userInfo');
	localStorage.removeItem('welcomePopup');
};

const AuthService = {
	checkLogin: checkLogin,
	getAccessToken: getAccessToken,
	removeAuthData: removeAuthData,
	getUserLanguage: getUserLanguage,
};

export default AuthService;
