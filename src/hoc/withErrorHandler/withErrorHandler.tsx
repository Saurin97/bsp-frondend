import React from 'react';
import { connect } from 'react-redux';
import { AxiosResponse, AxiosError } from 'axios';

import { axiosInstance } from 'shared/services/http.service';
import { ResponseObj, State, NotificationStateProps } from 'shared/interface';
let resInterceptor: number;
class WithErrorHandler extends React.Component<DispatchProps & any> {

	/**
	 * add response interceptor before component gets mounted
	 * check if response data contains isError = true, if yes, show an error message
	 * if response gives a non-200 error code, show error from error data
	 * if response contains a message to show, show success notification
	 */
	componentDidMount = () => {
		resInterceptor = axiosInstance.interceptors.response.use(
			(res: AxiosResponse<ResponseObj<any>>) => {
				if (res.data && res.data.isError && res.data.message) {
					this.props.addNotification(res.data.message, 'danger');
					throw new Error(res.data.message);
				} else if (res.data) {
					if (res.data.message) {
						this.props.addNotification(res.data.message, 'success');
					}
				}
				return res;
			},
			(error: AxiosError) => {
				// check if error is having data
				if (error.response && error.response.data && error.response.status) {
					const status = error.response.status;
					const responseData = error.response.data;
					// is http error code is 401, log out of the application
					if (status === 401 && responseData.data) {
						this.props.logout();
					} else if (responseData.errorMessages && Object.keys(responseData.errorMessages).length) {
						// if error response contains any validation message, fetch it from response, and add error notification
						const validationError = responseData.errorMessages[Object.keys(responseData.errorMessages)[0]];
						this.props.addNotification(validationError[0], 'danger');
					} else if (error.response && responseData && responseData.message) {
						// if error data contains message field, add error notification
						this.props.addNotification(responseData.message, 'danger');
					}
					throw error;
				}
			}
		);
	}

	/**
	 * eject response interceptor on when component is about to unmount
	 */
	componentWillUnmount = () => axiosInstance.interceptors.response.eject(resInterceptor);

	// <Notification />
	render() {
		return null;
	}
}

interface DispatchProps extends NotificationStateProps {
	logout: () => void;
}

export default connect<null, DispatchProps, {}, State>(null)(WithErrorHandler);
