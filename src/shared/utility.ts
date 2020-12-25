import { ThunkDispatch } from 'redux-thunk';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/de';
import { Action, State } from './interface';

let timer: NodeJS.Timeout;
/**
 * create action creator
 * @param ACTION - type of action
 * @param data - data
 */
export const createAction = (ACTION: string, data: any = null): Action => {
	return {
		type: ACTION,
		payload: data
	};
};

/**
 * create loading selector
 * @param actions - actions to dispatch
 */
export const createLoadingSelector = (actions: string[]) => (state: State) => {
	// returns true only when all actions is not loading
	return _(actions).some((action: string) => _.get(state, `loading.api.${action}`));
};

/**
 * create error selector
 * @param actions - actions to dispatch
 */
export const createErrorMessageSelector = (actions: string[]) => (state: State) => {
	// returns the first error messages for actions
	// * We assume when any request fails on a page that
	//   requires multiple API calls, we shows the first error
	return _(actions)
		.map(action => _.get(state, `error.api.${action}`))
		.compact()
		.first() || '';
};

/**
 * dispatch action after given time (to handle some events like close modal after success api call)
 * @param dispatch - dispatch object
 * @param action - action type
 * @param time - time after which action is to be dispatched (default - 100ms)
 */
export const dispatchActionAfterTime = (dispatch: ThunkDispatch<{}, {}, Action>, action: string, time: number = 100) => {
	setTimeout(() => {
		dispatch(createAction(action));
	}, time);
};

/**
 * returns actions to dispatch to add the notification
 * @param dispatch - dispatch object
 */

export const debounce = (func: any, wait = 500) => {
	let h: NodeJS.Timeout;
	return (...args: any) => {
		clearTimeout(h);
		h = setTimeout(() => func(...args), wait);
	};
};

let timerId: any;
export const throttleFunction = (func: any, delay = 500, ...args:any) => {
	// If setTimeout is already scheduled, no need to do anything
	if (timerId) {
		return
	}
	// Schedule a setTimeout after delay seconds
	timerId  =  setTimeout(function () {
		func(...args)
		// Once setTimeout function execution is finished, timerId = undefined so that in <br>
		// the next scroll event function execution can be scheduled by the setTimeout
		timerId  =  undefined;
	}, delay)
};

export const formatDate = (date: string | number | Date | undefined, format = 'YYYY-MM-DD') => {
	if (!date) {
		return '';
	}
	return moment(date).format(format);
};

/**
 * dateToTimestamp - to convert date to timestamp
 */
export const dateToTimestamp = (date: any) => {
	if (!date) {
		return '';
	}
	const timestamp = moment(date).utc().format('x');
	return parseInt(timestamp);
};

/**
 * timestampToDate - to convert date to timestamp
 */
export const timestampToDate = (timestamp: any, format?: string) => {
	return moment.unix(timestamp / 1000).local().format(format || 'MM-DD-YYYY HH:mm');
};

export const parseQuery = (queryString: string) => {
	const query: any = {};
	const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
	for (let i = 0; i < pairs.length; i++) {
		const pair = pairs[i].split('=');
		query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
	}
	return query;
};

export const resetTimer = () => {
	clearTimeout(timer);
};

export const convertDropdownValueToArray = (selectedValue: string): { label: string, value: string }[] => {
	const values = selectedValue.split(',');
	const data = [];
	for (const value of values) {
		const temp = {
			label: value,
			value: value
		};
		data.push(temp);
	}
	return data;
};


export const timeSince = (timestamp: any) => {
	return moment(timestamp).fromNow();
};

export const numberFormatter = (value: number, locale: string = 'de-DE') => {
	return new Intl.NumberFormat(locale).format(value);
};

export const animateNumberFormatter = (value: number, locale: string = 'de-DE') => {
	return new Intl.NumberFormat(locale).format(Number(value.toFixed(0)));
};

export const findClosestNumberIndex = (num: number, arr: number[]) => {
	let curr = arr[0];
	let index = 0;
	let diff = Math.abs (num - curr);
	const length = arr.length;
	for (let val = 0; val < length; val++) {
		const newdiff = Math.abs(num - arr[val]);
		if (newdiff < diff) {
			diff = newdiff;
			curr = arr[val];
			index = val
		}
	}
	return index;
}

export const windowScroll = (value: number, position: 'top' | 'bottom' = 'top', behavior: 'auto' | 'smooth' = 'smooth') => window.scrollTo({
	[position]: value,
	behavior: behavior
});