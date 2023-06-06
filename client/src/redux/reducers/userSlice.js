import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loggedIn: false,
	email: null,
	username: null,
	id: null,
	transactions: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginUser: (state, { payload }) => {
			console.log(payload);
			return { ...state, ...payload, loggedIn: true };
		},
		logoutUser: state => {
			return { ...initialState };
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
