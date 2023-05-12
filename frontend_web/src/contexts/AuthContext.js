import { createContext, useEffect, useReducer, useRef, useState } from 'react'
import { Url, apiUrl } from './constants'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

	const [userToken, setUserToken] = useState(null);
	const [userInfo, setUserInfo] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [types, setTypes] = useState([]);
	const [listType, setListType] = useState([]);
	const [courses, setCourses] = useState([]);
	const [textSearch, setTextSearch] = useState("");

	useEffect(() => {
		setAuthToken(localStorage.getItem('userToken'));
		loadUser();
	}, []);
	//Login
	const login = async userForm => {
		try {
			let response = await axios.post(`${Url}/api/user/login`, userForm)
			if (response.data.success) {
				if (response.data.Role === "admin") {
					console.log(response.data);
					setUserToken(response.data.token);
					localStorage.setItem('userToken', response.data.token);
					await loadUser()
				}
				else {
					response.data.success=false;
					response.data.message="Accout is not admin"
				}
			}
			return response.data
		} catch (error) {
			if (error.response.data)
				return error.response.data
			else return { success: false, message: error.message }
		}

	}
	//Logout
	const logout = () => {
		setUserInfo({});
		setUserToken(null);
		setAuthToken(null)
		localStorage.removeItem('userToken')
	}
	//LoadUser
	const loadUser = async () => {
		if (await localStorage.getItem('userToken')) {
			setAuthToken(await localStorage.getItem('userToken'))
			setUserToken(await localStorage.getItem('userToken'))
			console.log('UserToken:', await localStorage.getItem('userToken'));
		}
		try {
			const response = await axios.get(`${Url}/api/user`)
			if (response.data.success) {
				setUserInfo(response.data.user)
			}

		} catch (error) {
			// setUserToken(null);
			// AsyncStorage.removeItem('userToken');
			// setAuthToken(null);
			// setUserInfo({});
			// console.log('isLogged in error ',error);

		}
	}
	// Return provider
	return (
		<AuthContext.Provider value={{
			login, logout, userToken, userInfo, setUserToken,
			isLoading, userInfo, types, setTypes, courses, setCourses, textSearch, setTextSearch,
			listType, setListType
		}}>
			{children}
		</AuthContext.Provider>
	)
}

