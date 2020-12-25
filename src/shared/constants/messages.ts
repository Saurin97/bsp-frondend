/**
 * errorMessages - list of common error messages
 */
export const errorMessages = {
	required: (field: string) => `${field} is required!`,
	lowercase: (field: string) => `${field} must be a lowercase string!`,
	trim: (field: string) => `${field} must not contain white space in starting/end!`,
	customEmail: () => 'please provide valid email',
	customPassword: () => `password must contain 1 Small, 1 Upper character and 1 Number, and min length should be 8!`,
	minLength: (field: string, length: number) => `${field} has to be longer than ${length} characters!`,
	maxLength: (field: string, length: number) => `${field} has to be shorter than ${length} characters!`,
	minValue: (field: string, value: number) => `${field} must be greater than or equal to ${value}!`,
	maxValue: (field: string, value: number) => `${field} must be less than or equal to ${value}!`,
	passwordValidate: () => {
		return 'Password must contain at least 6 characters, including one uppercase letter, one lowercase letter and one number and one special character and must not contain white space';
	},
	passwordMatchValidate: () => {
		return 'Passwords do not match';
	},
};