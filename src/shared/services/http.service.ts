// tslint:disable: no-any
// tslint:disable: no-unsafe-any
import axios, { AxiosResponse } from 'axios';
import { ResponseObj } from '../interface';
import AuthService from './auth.service';
import { getUrl } from 'shared/constants/constant';

const axiosInstance = axios.create();
const CancelToken = axios.CancelToken;
let cancel_req: any;

export {
	cancel_req
};
export interface AxiosParams {
	method: string;
	url: string;
	data?: any;
	contentType?: string;
	isLogin?: boolean;
}

export interface MiscellaneousRequestParams {
	contentType?: string;
}

/**
 * get method
 * @param request object containing axios params
 */
const get = (url: string, params: any = {}, otherData: MiscellaneousRequestParams = {}) => {
	return commonAxios({ method: 'GET', url: getUrl(url, params), ...otherData });
};

/**
 * post method
 * @param request object containing axios params
 */
const post = (url: string, params: any = {}, otherData: MiscellaneousRequestParams = {}) => {
	return commonAxios({ method: 'POST', url: getUrl(url), data: params, ...otherData });
};

/**
 * post method
 * @param request object containing axios params
 */
const post2 = (url: string, params: any = {}, otherData: MiscellaneousRequestParams = {}) => {
	return commonAxios({ method: 'POST', url: 'https://pay.streamblast.com/payment/paypal-checkout', data: params, ...otherData });
};

/**
 * put method
 * @param request object containing axios params
 */
const put = (url: string, params: any = {}, otherData: MiscellaneousRequestParams = {}) => {
	return commonAxios({ method: 'PUT', url: getUrl(url), data: params, ...otherData });
};

/**
 * deleteRequest method
 * @param request object containing axios params
 */
const deleteRequest = (url: string, params: any = {}, otherData: MiscellaneousRequestParams = {}) => {
	return commonAxios({ method: 'DELETE', url: getUrl(url), data: params, ...otherData });
};

/**
 * patch method
 * @param request object containing axios params
 */
const patch = (url: string, params: any = {}, otherData: MiscellaneousRequestParams = {}) => {
	return commonAxios({ method: 'PATCH', url: getUrl(url), data: params, ...otherData });
};

/**
 * commonAxios
 * @param object containing method, url, data, access token, content-type, isLogin
 */
const commonAxios = ({
	method,
	url,
	data,
	contentType = 'application/json',
}: AxiosParams): Promise<any> => {
	const headers: any = {
		'Content-Type': contentType
	};

	const token = AuthService.getAccessToken();
	if (token) {
		headers['access_token'] = `${AuthService.getAccessToken()}`;
	}

	let body: any = null;

	if (contentType === 'application/json') {
		body = JSON.stringify(data);
	} else {
		body = data;
	}

	return new Promise((resolve, reject) => {
		axiosInstance({
			method: method,
			url: url,
			cancelToken: new CancelToken(function executor(c) {
				// An executor function receives a cancel function as a parameter
				cancel_req = c;
			}),
			headers: headers,
			data: body
		}).then((response: AxiosResponse<ResponseObj<any>>) => {
			resolve(response.data.data);
		}).catch(error => {
			reject(error);
		});
	});
};

export {
	axiosInstance
};

const HttpService = {
	get: get,
	post: post,
	post2: post2,
	put: put,
	deleteRequest: deleteRequest,
	patch: patch
};

export default HttpService;
