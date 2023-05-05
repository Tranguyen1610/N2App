import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import{useStripe} from '@stripe/stripe-react-native'
import { set } from 'mongoose';
import { subscribe } from '../../../backend/routes/stripeRoutes';
import axios from 'axios';
export default function Payment() {
    const [name,setName]=useState('');
    const stripe = useStripe();

    const subscribe = async()=>{
        
        try{
            const res = await axios.post('',{
                name:name
            })
            const data = await res.json();
            if(!res.ok)
            return Alert.alert(data.message)
        }catch(err){
            console.error(err);
            Alert.alert("Something went wrong, try again later!")
        }
    }
  return (
    <View>
        <TextInput
        value={name}
        onChangeText={text=>setName(text)}
        placeholder='Name'
        style={
            {
                width:300,
                fontSize:20,
                padding:20,
                borderWidth:1,

            }
        }
        />
        <Button title='Subscribe - 25 INR'
        onPress={subscribe}
        ></Button>
    </View>
  )
}

const styles = StyleSheet.create({})