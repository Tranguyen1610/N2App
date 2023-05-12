import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Request({ item }) {
    const nav = useNavigation();
    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }
    // useEffect(() => {
    //     console.log(item);
    // })
    return (
        <TouchableOpacity className="bg-gray-700 mt-5 rounded-md p-3"
        onPress={() => nav.navigate('RequestDetailScreen', { request: item })}
        >
            <View className='flex-row'>
                <Text className="text-gray-200 text-sm font-medium">Yêu cầu:  </Text>
                <Text className="text-[#1273FE] text-sm font-medium">#{item._id.toUpperCase()}</Text>
            </View>
            <View className="mt-5">
                <Text className="text-white text-base">Loại yêu cầu:    {item.Content.Name}</Text>
            </View>
            {item.Content.Key === "buycourse" ?
                <View className="mt-2">
                    <Text className="text-white text-base">Tên khóa học:    {item.Course.Name}</Text>
                </View> : item.Content.Key === "withdrawmoney" ?
                    <View className="mt-2">
                        <Text className="text-white text-base">Số tiền:    {formatPrice(item.Amount)}</Text>
                    </View> : <></>}
            {item.Status && !item.isCancel?
            <View className="flex-row justify-end mt-2">
                <Text className="text-white text-right text-base">Trạng thái: </Text>
                <Text className="text-[#1273FE] text-right text-base font-medium">
                    {item.Result == 1 ? "Chấp nhận" : "Từ chối"}
                </Text>
            </View>:
            <View>

            </View>}
        </TouchableOpacity>
    )
}