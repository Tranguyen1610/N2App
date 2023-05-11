import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import { Url } from '../contexts/constants'
import { useNavigation } from '@react-navigation/native'

export default function RevenueTeacherScreen() {
  const nav = useNavigation();
  const [mca, setmca] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("day");
  const [now, setNow] = useState("");
  const types = [
    { label: "Ngày", value: "day" },
    { label: "Tuần", value: "week" },
    { label: "Tháng", value: "month" },
    { label: "Năm", value: "year" },
    { label: "Tất cả", value: "all" }
  ]
  const formatPrice = (num) => {
    if (num != null)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
    return ""
  }

  const getDateNow = () => {
    const dateNow = new Date();
    setNow(dateNow.toLocaleDateString());
  }

  const getAmount = async () => {
    try {
      const res = await axios.get(`${Url}/user/amount`);
      setmca(res.data.user.Balance);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDateNow();
    getAmount();
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-[#0A0909]">
      <StatusBar backgroundColor={"#0A0909"} />
      <View className="justify-center items-center mt-10">
        <Text className="text-white text-base">Số dư hiện tại</Text>
        <Text className="text-[#1273FE] text-2xl font-medium mt-3">{formatPrice(mca)}</Text>
      </View>
      <View className="justify-center items-center bg-gray-900 m-5 p-3">
        <Text className="text-gray-500 text-sm p-2">{now}</Text>
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
          <Text className="text-white justify-start text-base">Tổng số đơn hàng:</Text>
          <Text className="text-white text-base ml-10 text-xl">3</Text>
        </View>
        <View className="flex-row items-center w-full mt-3">
          <Text className="text-white justify-start text-base">Doanh thu:</Text>
          <Text className="text-white text-base ml-10 text-xl">{formatPrice(mca)}</Text>
        </View>

      </View>
      <View className="absolute bottom-0 flex-row w-screen h-14 ">
        <TouchableOpacity className="bg-[#242F41] items-center justify-center w-6/12 flex-row "
        >

          <Text className="text-white font-semibold text-xl ml-3">Tất cả đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-6/12 flex-row"
          onPress={() => nav.navigate('CreateRequest',{type:"withdrawmoney"})}
        >
          <MaterialCommunityIcons name="cash" size={28} color="white" />
          <Text className="text-white font-semibold text-xl ml-3">Rút tiền</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}