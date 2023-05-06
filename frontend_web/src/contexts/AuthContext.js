import { createContext, useEffect, useRef, useState } from 'react'
import { apiUrl } from './constants'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

	const [userToken,setUserToken] = useState(null);
	const [userInfo, setUserInfo] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [types,setTypes] = useState([]);
	const [listType,setListType] = useState([]);
	const [courses,setCourses] = useState([]);
	const [textSearch, setTextSearch] = useState("");

	useEffect(() => {
		loadUser();
	  }, []); 
	//Login
	const login = async userForm =>{
		try{
			const response = await axios.post(`user/login`, userForm)
			if (response.data.success){
				setUserToken(response.data.accessToken);
				localStorage.setItem('userToken',response.data.token);
				localStorage.setItem('mode','Student')
				await loadUser()
			}
			return response.data
		}catch(error){
			if (error.response.data) 
				return error.response.data
					else return { success: false, message: error.message }
		}
		
	}
	//Logout
	const logout=()=>{
		setIsLoading(true);

		setTimeout(()=>{
			setUserInfo({});
			setUserToken(null);
			localStorage.removeItem('userToken')
			localStorage.removeItem('mode')
			setIsLoading(false)},1000);
	}
	//LoadUser
	const loadUser = async () =>{
		setIsLoading(true)
		setTimeout(()=>{
			setIsLoading(false)},1000);

		if( await localStorage.getItem('userToken')){
			setAuthToken(await localStorage.getItem('userToken'))
			setUserToken(await localStorage.getItem('userToken') )
			console.log('UserToken:',await localStorage.getItem('userToken'));
		}
		try { 
			const response = await axios.get(`${apiUrl}`)
			if (response.data.success) {
				setUserInfo(response.data.user)
			} 

		} catch(error) {
			// setUserToken(null);
			// AsyncStorage.removeItem('userToken');
			// setAuthToken(null);
			// setUserInfo({});
			// console.log('isLogged in error ',error);

		}
	}
	const loadUser_Register = async () =>{
		if( await localStorage.getItem('userToken')){
			setAuthToken(await localStorage.getItem('userToken'))
			setUserToken(await localStorage.getItem('userToken') )
			console.log('UserToken:',await localStorage.getItem('userToken'));
		}
		try { 
			const response = await axios.get(`${apiUrl}`)
			if (response.data.success) {
				setUserInfo(response.data.user)
			} 

		} catch(error) {
			// setUserToken(null);
			// AsyncStorage.removeItem('userToken');
			// setAuthToken(null);
			// setUserInfo({});
			// console.log('isLogged in error ${e}');

		}
	}
	
	//register
	const register = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}`, userForm)
			return response.data
		} catch (error) {
			if (error.response.data) {
				console.log(error.response.data);
				localStorage.setItem('mode','Student')
				return error.response.data
			}
			else{
				console.log(error.message); 
				return { success: false, message: error.message }
			}
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

	// Return provider
	return (
		<AuthContext.Provider value={{
			login,logout,userToken,userInfo,setUserToken,loadUser_Register,register,
			isLoading,userInfo,types,setTypes,courses,setCourses,textSearch, setTextSearch,
			listType,setListType,
		}}>
			{children}
		</AuthContext.Provider>
	)
}

