import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loggedIn: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginUser: state => {
			state.loggedIn = true;
		},
		logoutUser: state => {
			state.loggedIn = false;
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
