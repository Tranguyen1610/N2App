import { View, Text, ScrollView, StatusBar, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import { Url } from '../contexts/constants'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../contexts/AuthContext'

export default function RevenueTeacherScreen() {
  const nav = useNavigation();
  const { userInfo } = useContext(AuthContext)
  const [mca, setmca] = useState(0);
  const [balance, setBalance] = useState(0);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("day");
  const [isLoading, setIsLoading] = useState(false);
  const now = new Date();

  const types = [
    { label: "Ngày", value: "day" },
    // { label: "Tuần", value: "week" },
    { label: "Tháng", value: "month" },
    { label: "Năm", value: "year" },
    { label: "Tất cả", value: "all" }
  ]

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getAmount();
      setRefreshing(false);
    }, 1000);
  }, []);

  const formatPrice = (num) => {
    if (num != null)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
    return ""
  }

  const getAmount = async () => {
    try {
      const res = await axios.get(`${Url}/user/amount`);
      setBalance(res.data.user.Balance);
    } catch (err) {
      console.log(err);
    }
  }

  const getMCA = async (type) => {
    let mca = 0;
    let total = 0;
    try {
      const result = await axios.get(`${Url}/order/allSuccess`);
      if (result.data) {
        result.data.forEach(d => {
          const date = new Date(d.date);
          if (type === "day") {
            if (d.course.Teacher === userInfo._id && date.getDay() === now.getDay()
              && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
              mca += (d.course.Price - (d.course.Price * 10) / 100);
              total++;
            }
          }
          else
            if (type === "month") {
              if (d.course.Teacher === userInfo._id && date.getMonth() === now.getMonth()
                && date.getFullYear() === now.getFullYear()) {
                mca += (d.course.Price - (d.course.Price * 10) / 100);
                total++;
              }
            }
            else
              if (type === "year") {
                if (d.course.Teacher === userInfo._id && date.getFullYear() === now.getFullYear()) {
                  mca += (d.course.Price - (d.course.Price * 10) / 100);
                  total++;
                }
              }
              else
                if (type === 'all') {
                  if (d.course.Teacher === userInfo._id) {
                    mca += (d.course.Price - (d.course.Price * 10) / 100);
                    total++;
                  }
                }

        });
        setmca(mca);
        setTotal(total)
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getMCA(type)
  }, [type])
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500)
    getAmount();
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-[#0A0909]">
      {
        isLoading ?
          <View className="bg-[#0A0909] flex-1 justify-center items-center">
            < ActivityIndicator size={'large'} color={'#1273FE'} />
          </View> :
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <StatusBar backgroundColor={"#0A0909"} />
            <View className="justify-center items-center mt-10">
              <Text className="text-white text-base">Số dư hiện tại</Text>
              <Text className="text-[#1273FE] text-2xl font-medium mt-3">{formatPrice(balance)}</Text>
            </View>
            <View className="justify-center items-center bg-gray-900 m-5 p-3">
              <Text className="text-gray-500 text-sm p-2">{now.toLocaleDateString()}</Text>
              <View
                className="flex-row"
                style={{
                  alignItems: !isOpen ? 'center' : 'flex-start'
                }}>
                <Text className="text-white text-lg w-[40%]">Doanh thu theo</Text>
                <View className="w-[50%]">
                  <DropDownPicker
                    style={{
                      marginBottom: isOpen ? 200 : 0,
                    }}
                    items={types}
                    open={isOpen}
                    setOpen={setIsOpen}
                    value={type}
                    setValue={setType}
                    maxHeight={200}
                    scrollViewProps
                    autoScroll
                    placeholder='Chọn thể loại'
                    dropDownDirection='BOTTOM'
                    theme='DARK'
                    textStyle={{
                      color: "#fff"
                    }}
                  />
                </View>
              </View>
              <View className="flex-row items-center w-full mt-3">
                <Text className="text-white justify-start text-base">Tổng số khóa học được bán:</Text>
                <Text className="text-white ml-10 text-xl">{total}</Text>
              </View>
              <View className="flex-row items-center w-full mt-3">
                <Text className="text-white justify-start text-base">Doanh thu:</Text>
                <Text className="text-white ml-10 text-xl">{formatPrice(mca)}</Text>
              </View>

            </View>
          </ScrollView>
      }
      <View className="absolute bottom-0 flex-row w-screen h-14 ">
        <TouchableOpacity className="bg-[#242F41] items-center justify-center w-6/12 flex-row "
          onPress={() => nav.navigate('TransactionHistoryScreen')}
        >
          <Text className="text-white font-semibold text-xl ml-3">Lịch sử giao dịch</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-6/12 flex-row"
          onPress={() => nav.navigate('CreateRequest', { type: "withdrawmoney" })}
        >
          <MaterialCommunityIcons name="cash" size={28} color="white" />
          <Text className="text-white font-semibold text-xl ml-3">Rút tiền</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}