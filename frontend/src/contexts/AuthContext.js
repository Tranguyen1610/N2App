import { createContext, useEffect, useRef, useState } from 'react'
import { apiUrl } from './constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

	const [userToken,setUserToken] = useState(null);
	const [userInfo, setUserInfo] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		loadUser();
	  }, []); 
	  
	//Login
	const login = async userForm =>{
		try{
			const response = await axios.post(`${apiUrl}/login`, userForm)
			if (response.data.success){
				setUserToken(response.data.accessToken);
				AsyncStorage.setItem('userToken',response.data.token);
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
			AsyncStorage.removeItem('userToken')
			setIsLoading(false)},1000);
	}
	//LoadUser
	const loadUser = async () =>{
		setIsLoading(true)
		setTimeout(()=>{
			setIsLoading(false)},1000);

		if( await AsyncStorage.getItem('userToken')){
			setAuthToken(await AsyncStorage.getItem('userToken'))
			setUserToken(await AsyncStorage.getItem('userToken') )
			console.log('UserToken:',await AsyncStorage.getItem('userToken'));
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
		if( await AsyncStorage.getItem('userToken')){
			setAuthToken(await AsyncStorage.getItem('userToken'))
			setUserToken(await AsyncStorage.getItem('userToken') )
			console.log('UserToken:',await AsyncStorage.getItem('userToken'));
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
			login,logout,userToken,userInfo,setUserToken,loadUser_Register,register,isLoading,userInfo
		}}>
			{children}
		</AuthContext.Provider>
	)
}

