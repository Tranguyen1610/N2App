import { View, Text, StatusBar, ActivityIndicator, TouchableOpacity, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { Url } from '../contexts/constants';

export default function CreateRequest() {
    const { contents, setContents } = useContext(AuthContext);
    const [content, setContent] = useState("");
    const [key, setKey] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenCourse, setIsOpenCourse] = useState(false);
    const [coursesTCNSDr, setCoursesTCNSDr] = useState([]);
    const [course, setCourse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const getContent = async () => {
        let list = [];
        try {
            const res = await axios.get(`${Url}/content`);
            // console.log(res.data);
            const listcontent = res.data;
            for (let index = 0; index < listcontent.length; index++) {
                list.push({ label: listcontent[index].Name, value: listcontent[index]._id })
            }
        } catch (err) {
            console.log(err);
        }
        setContents(list)
    }

    const getKey = async (id) => {
        if (id) {
            try {
                const res = await axios.get(`${Url}/content/getKey/${id}`);
                // console.log(res.data);
                setKey(res.data);
            } catch (err) {
                console.log(err);
                setKey(null);
            }
        }
    }

    const getCourseTCNS = async () => {
        let list = [];
        try {
            const res = await axios.get(`${Url}/course/getCourseofTeacherNotSale`);
            // console.log(res.data);
            const listcourse = res.data;
            for (let index = 0; index < listcourse.length; index++) {
                list.push({ label: listcourse[index].Name, value: listcourse[index]._id })
            }
        } catch (err) {
            console.log(err);
        }
        setCoursesTCNSDr(list)
    }

    useEffect(() => {
        getContent();
        getCourseTCNS();
    }, [])

    useEffect(() => {
        getKey(content);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 400)
    }, [content])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setIsKeyboardOpen(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setIsKeyboardOpen(false);
            }
        );

        // cleanup function to remove listeners when unmounting
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View className="flex-1 bg-[#0A0909] p-5">
            <StatusBar backgroundColor={"#0A0909"} />
            <View>
                <Text className="text-white text-base mb-5">Loại yêu cầu</Text>
                <DropDownPicker
                    style={{
                        marginBottom: isOpen ? 160 : 40,
                    }}
                    items={contents}
                    open={isOpen}
                    setOpen={setIsOpen}
                    value={content}
                    setValue={setContent}
                    maxHeight={140}
                    scrollViewProps
                    autoScroll
                    placeholder='Chọn yêu cầu'
                    dropDownDirection='BOTTOM'
                    theme='DARK'
                    textStyle={{
                        color: "#fff"
                    }}
                />
            </View>
            {isLoading ?
                <View className=" mt-20 justify-center items-center">
                    <ActivityIndicator size={'large'} color={'#1273FE'} />
                </View> :
                <View>
                    {key === "buycourse" ?
                        <View>
                            <Text className="text-white text-base mb-5">Chọn khóa học</Text>
                            <DropDownPicker
                                items={coursesTCNSDr}
                                open={isOpenCourse}
                                setOpen={setIsOpenCourse}
                                value={course}
                                setValue={setCourse}
                                maxHeight={140}
                                scrollViewProps
                                autoScroll
                                placeholder='Chọn khóa học'
                                dropDownDirection='BOTTOM'
                                theme='DARK'
                                textStyle={{
                                    color: "#fff"
                                }}
                            />
                        </View> :
                        <Text className="text-white mt-20 text-center">Tính năng đang phát triển</Text>}
                </View>
            }
            {!isKeyboardOpen ?
                <View className="absolute bottom-10 right-5 items-end">
                    <TouchableOpacity
                        className="justify-center items-center mt-2"
                        onPress={() => check()}>
                        <Text className="text-white bg-[#1273FE] font-semibold text-base p-3  rounded-xl">Tạo yêu cầu</Text>
                    </TouchableOpacity>
                </View> : <></>}
        </View>
    )
}