import { createContext, useEffect, useRef, useState } from 'react'
import { apiUrl } from './constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

	const [userToken, setUserToken] = useState(null);
	const [userInfo, setUserInfo] = useState({});
	const [types, setTypes] = useState([]);
	const [listType, setListType] = useState([]);
	const [courses, setCourses] = useState([]);
	const [textSearch, setTextSearch] = useState("");
	const [wishlists, setWishLists] = useState([]);
	const [coursePurchaseds, setCoursePurchaseds] = useState([]);
	const [carts, setCarts] = useState([]);
	const [listOrderCancel, setListOrderCancel] = useState([]);
	const [listOrderSuccess, setListOrderSuccess] = useState([]);
	const [listOrderUnPaid, setListOrderUnPaid] = useState([]);
	const [listFavoriteType, setListFavoriteType] = useState([]);
	const [coursesTC, setCoursesTC] = useState([]);
	const [coursesTCUF, setCoursesTCUF] = useState([]);
	const [coursesTCNS, setCoursesTCNS] = useState([]);
	useEffect(() => {
		LoadUserVerified();
	}, []);
	//Login
	const login = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/login`, userForm)
			if (response.data.success) {
				// setUserToken(response.data.accessToken);
				AsyncStorage.setItem('userToken', response.data.token);
				setAuthToken(await AsyncStorage.getItem('userToken'));

				AsyncStorage.setItem('mode', 'Student')
				// await loadUser()
			}
			return response.data
		} catch (error) {
			if (error.response.data)
				return error.response.data
			else return { success: false, message: error.message }
		}

	}

	//register
	const register = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}`, userForm)
			if (response.data.success) {
				AsyncStorage.setItem('userToken', response.data.token);
				setAuthToken(await AsyncStorage.getItem('userToken'));
				AsyncStorage.setItem('mode', 'Student')
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
		setTimeout(() => {
			setUserInfo({});
			setUserToken(null);
			setAuthToken(null);
			AsyncStorage.removeItem('userToken')
			AsyncStorage.removeItem('mode')
		}, 1000);
	}
	//LoadUser
	const loadUser = async () => {
		if (await AsyncStorage.getItem('userToken')) {
			setUserToken(await AsyncStorage.getItem('userToken'))
			// console.log('UserToken:',await AsyncStorage.getItem('userToken'));
		}
		try {
			const response = await axios.get(`${apiUrl}`)
			if (response.data.success) {
				setUserInfo(response.data.user)
			}

		} catch (error) {
			console.log('isLogged in error ', error);
		}
	}

	//LoadUserVerified
	const LoadUserVerified = async () => {
		if (await AsyncStorage.getItem('userToken')) {
			setAuthToken(await AsyncStorage.getItem('userToken'))
			setUserToken(await AsyncStorage.getItem('userToken'))
			// console.log('UserToken:',await AsyncStorage.getItem('userToken'));
		}
		try {
			const response = await axios.get(`${apiUrl}`)
			if (response.data.success) {
				if (response.data.user.IsVerified) {
					setUserInfo(response.data.user)
				}
				else logout();
			}

		} catch (error) {
			console.log('isLogged in error ', error);
		}
	}


	// //OTP
	// const checkOTP = async userForm =>{
	// 	try {
	// 		const response = await axios.put(`${apiUrl}/verifyOtp`, userForm)
	// 		return response.data
	// 	} catch (error) {
	// 		if (error.response.data) return error.response.data
	// 		else return { success: false, message: error.message }
	// 	}
	// }
	// //changePassword
	// const changePassUser = async userForm => {
	// 	try {
	// 		const response = await axios.put(`${apiUrl}/changePassword`, userForm)
	// 		return response.data
	// 	} catch (error) {
	// 		if (error.response.data) return error.response.data
	// 		else return { success: false, message: error.message }
	// 	}
	// }

	const changePassword = async userForm => {
		try {
			const response = await axios.put(`${apiUrl}/changePassword`, userForm)
			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	// Return provider
	return (
		<AuthContext.Provider value={{
			login, logout, userToken, userInfo, setUserToken, loadUser, register,
			userInfo, types, setTypes, courses, setCourses, textSearch, setTextSearch,
			listType, setListType, wishlists, setWishLists, carts, setCarts, coursePurchaseds,
			setCoursePurchaseds, listOrderCancel, setListOrderCancel, listOrderSuccess,
			setListOrderSuccess, listOrderUnPaid, setListOrderUnPaid, listFavoriteType,
			setListFavoriteType, coursesTC, setCoursesTC, coursesTCUF, setCoursesTCUF,
			coursesTCNS, setCoursesTCNS, setUserInfo, changePassword
		}}>
			{children}
		</AuthContext.Provider>
	)
}

