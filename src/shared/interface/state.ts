
export interface AuthState {
	auth: boolean;
	actionLoading: boolean;
	currentTime: number;
	closeModal: boolean;
}

export interface NotificationStateProps {
	addNotification: (message: string, type: string) => void;
}

export interface Pagination {
	totalPages: number;
	page: number;
	perPage: number;
}

export interface FilterParams {
	limit: string;
	sort: string;
}

export interface CommonState {
	isModalOpen: boolean;
	isActionDone: boolean;
	notification: {
		type: string;
		message: string;
	};
}

export interface LoadingState {
	api: {
		[key: string]: boolean;
	};
}

export interface HomePageState {
	eventPoll: any;
	closeModal: boolean;
}

export interface State {
	auth: AuthState;
	homePage: HomePageState;
	common: CommonState;
	loading: LoadingState;
	error: ErrorState;
}

export interface ErrorState {
	api: {
		[key: string]: string;
	};
}

export interface LoaderState {
	loading: boolean;
}

export interface ErrState {
	error: boolean;
}

export interface Action {
	type: string;
	payload: any;
}

export interface ModalStatusProps {
	openModal: () => void;
	closeModal: () => void;
}
