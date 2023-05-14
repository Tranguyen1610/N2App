import { View, Text, StatusBar, ActivityIndicator, TouchableOpacity, Keyboard, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { Url } from '../contexts/constants';
import Toast from 'react-native-root-toast';

export default function CreateRequest({ route }) {
    const { contents, setContents, userInfo } = useContext(AuthContext);
    const [content, setContent] = useState("");
    const [key, setKey] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenCourse, setIsOpenCourse] = useState(false);
    const [coursesTCNSDr, setCoursesTCNSDr] = useState([]);
    const [allRequest, setAllRequest] = useState([]);
    const [course, setCourse] = useState("");
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [mca, setmca] = useState(0);
    const [bankAccount, setBankAccount] = useState({});

    const getBankAccount = async () => {
        try {
            const res = await axios.get(`${Url}/user/bankAccount/${userInfo._id}`);
            if (res.data.BankAccount) {
                setBankAccount(res.data.BankAccount);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const withdrawmoney = () => {
        if (route.params)
            if (route.params.type === "withdrawmoney") {
                setContent("645a6bf4194fadd4d5da02ad")
                setKey('withdrawmoney')
            }
            else
                if (route.params.type === "buycourse") {
                    setContent("645a6b80194fadd4d5da02a6")
                    setKey('buycourse')
                    setCourse(route.params.course)
                }
    }

    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }

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

    const getAmount = async () => {
        try {
            const res = await axios.get(`${Url}/user/amount`);
            setmca(res.data.user.Balance);
        } catch (err) {
            console.log(err);
        }
    }

    const CreateRequest = async () => {
        try {
            const co = course !== "" ? course : null
            const data = {
                Course: co,
                Amount: Number(amount),
                Content: content,
            }
            const res = await axios.post(`${Url}/request/createRequest`, data);
            if (res.data) {
                reset();
                Toast.show('Thành công',
                    {
                        backgroundColor: '#3B404F',
                        textColor: '#ffffff',
                        opacity: 1,
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        animation: true,
                    })
                getRequset();
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getRequset = async () => {
        try {
            const result = await axios.get(`${Url}/request/`);
            if (result.data) {
                setAllRequest(result.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const reset = () => {
        setContent("");
        setAmount("");
        setCourse("");
        setKey("");
    }

    const handleCreateRequest = () => {
        const regexPrice = /^[1-9][0-9]*$/;
        if (!checkRequest()) {
            if (content === "")
                Toast.show('Chưa chọn loại yêu cầu',
                    {
                        backgroundColor: '#3B404F',
                        textColor: '#ffffff',
                        opacity: 1,
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        animation: true,
                    })
            else
                if (key === 'buycourse')
                    if (course === "")
                        Toast.show('Chưa chọn khóa học',
                            {
                                backgroundColor: '#3B404F',
                                textColor: '#ffffff',
                                opacity: 1,
                                duration: Toast.durations.SHORT,
                                position: Toast.positions.CENTER,
                                animation: true,
                            })
                    else CreateRequest();
                else
                    if (key === 'withdrawmoney')
                        if (amount === "")
                            Toast.show('Chưa nhập số tiền',
                                {
                                    backgroundColor: '#3B404F',
                                    textColor: '#ffffff',
                                    opacity: 1,
                                    duration: Toast.durations.SHORT,
                                    position: Toast.positions.CENTER,
                                    animation: true,
                                })
                        else
                            if (!regexPrice.test(amount)) {
                                Toast.show('Số tiền là số lớn hơn 0',
                                    {
                                        backgroundColor: '#3B404F',
                                        textColor: '#ffffff',
                                        opacity: 1,
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.CENTER,
                                        animation: true,
                                    })
                            }
                            else
                                if (Number(amount) > Number(mca))
                                    Toast.show('Số tiền vượt quá số dư',
                                        {
                                            backgroundColor: '#3B404F',
                                            textColor: '#ffffff',
                                            opacity: 1,
                                            duration: Toast.durations.SHORT,
                                            position: Toast.positions.CENTER,
                                            animation: true,
                                        })
                                else
                                    if (Object.keys(bankAccount).length===0)
                                        Toast.show('Vui lòng cập nhật tài khoản ngân hàng',
                                            {
                                                backgroundColor: '#3B404F',
                                                textColor: '#ffffff',
                                                opacity: 1,
                                                duration: Toast.durations.SHORT,
                                                position: Toast.positions.CENTER,
                                                animation: true,
                                            })
                                    else CreateRequest();
        }
        else {
            Toast.show('Yêu cầu đã tồn tại',
                {
                    backgroundColor: '#3B404F',
                    textColor: '#ffffff',
                    opacity: 1,
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    animation: true,
                })
        }
    }

    const checkRequest = () => {
        for (const r of allRequest) {
            if (!r.Status && r.Content.Key === key && r.Sender._id === userInfo._id && !r.IsCancel) {
                if (key === "withdrawmoney") {
                    return true;
                } else if (r.Course._id === course) {
                    return true;
                }
            }
        }

        return false;
    }

    useEffect(() => {
        getContent();
        getCourseTCNS();
        getAmount();
        withdrawmoney();
        getRequset();
        getBankAccount();
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
                                maxHeight={300}
                                scrollViewProps
                                autoScroll
                                placeholder='Chọn khóa học'
                                dropDownDirection='BOTTOM'
                                theme='DARK'
                                textStyle={{
                                    color: "#fff"
                                }}
                            />
                        </View> : key === "withdrawmoney" ?
                            <View className="items-center">
                                <Text className="text-white text-base">Số dư hiện tại</Text>
                                <Text className="text-[#1273FE] text-xl font-medium mt-3">{formatPrice(mca)}</Text>
                                <TextInput
                                    placeholder='Số tiền'
                                    placeholderTextColor={'#7F889A'}
                                    className="text-white text-base  px-2 border border-gray-300 w-full h-12 my-5 rounded-sm "
                                    value={amount}
                                    keyboardType={'numeric'}
                                    onChangeText={(e) => setAmount(e)} />
                            </View> : key === "createpromotioncode" ?
                                <Text className="text-white mt-20 text-center">Tính năng đang phát triển</Text>
                                : <></>
                    }
                </View>
            }
            {!isKeyboardOpen ?
                <View className="absolute bottom-10 right-5 items-end">
                    <TouchableOpacity
                        className="justify-center items-center mt-2"
                        onPress={() => handleCreateRequest()}>
                        <Text className="text-white bg-[#1273FE] font-semibold text-base p-3  rounded-xl">Tạo yêu cầu</Text>
                    </TouchableOpacity>
                </View> : <></>}
        </View>
    )
}