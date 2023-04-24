import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { AuthContext } from '../contexts/AuthContext';
import { Url } from '../contexts/constants';
import axios from 'axios';

export default function FavoriteTypeScreen() {
    const { types, setTypes, listFavoriteType, setListFavoriteType } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState([
        {
          "label": "CNTT & Phần mền",
          "value": "643bc1aa1996ca5d845fb01b",
        },
        {
          "label": "Phát triển",
          "value": "643bc12f1996ca5d845fb00f",
        },
      ]);

    const getType = async () => {
        let list = [];
        try {
            const res = await axios.get(`${Url}/type`);
            // console.log(res.data);
            const listtype = res.data;
            for (let index = 0; index < listtype.length; index++) {
                list.push({ label: listtype[index].Name, value: listtype[index]._id })
            }
        } catch (err) {
            console.log(err);
        }
        setTypes(list)
    }

    const getFavoriteType = async () => {
        let list = [];
        try {
            const res = await axios.get(`${Url}/user/getFavoriteType`);
            // console.log(res.data);
            const listtype = res.data;
            for (let index = 0; index < listtype.length; index++) {
                list.push({ label: listtype[index].Name, value: listtype[index]._id })
            }
        } catch (err) {
            console.log(err);
        }
        setValue(list)
        console.log(list);
    }


    useEffect(() => {
        getFavoriteType();
        getType();
    }, [])

    return (
        <View className="bg-[#0A0909] flex-1 p-5 ">
            <DropDownPicker
                items={types}
                open={isOpen}
                setOpen={setIsOpen}
                value={value}
                setValue={setValue}
                maxHeight={200}
                scrollViewProps
                autoScroll
                placeholder='Chọn thể loại'
                dropDownDirection='BOTTOM'
                theme='DARK'
                textStyle={{
                    color: "#fff"
                }}
                mode="BADGE"
                badgeColors={"#1273FE"}
                showBadgeDot={false}
                multiple={true}
            />
        </View>
    )
}