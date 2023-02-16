import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import AuthNavigator from './AuthNavigator';
import RootNavigator from './RootNavigator';

export default function AppNavigator() {
  const{userToken,isLoading}=useContext(AuthContext)
  // if (isLoading){
  //   return(
  //       <View className="flex-1 items-center justify-center">
  //           <Text>Đang tải..</Text>
  //           <ActivityIndicator size={'large'}/>
  //       </View>
  //   );
  // }
  return (
      <NavigationContainer>
            {userToken !== null ?<RootNavigator/>:<AuthNavigator/>}
	    </NavigationContainer>
       
  );
}

