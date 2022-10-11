import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loggedIn: null,
	email: null,
	username: null,
	id: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.loggedIn = true;
			state.email = action.payload.email;
			state.username = action.payload.username;
			state.id = action.payload.id;
		},
		logoutUser: state => {
			state.loggedIn = false;
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
