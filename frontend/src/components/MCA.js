import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment';
import 'moment/locale/vi';

export default function MCA({ item }) {
    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }
    return (
        <TouchableOpacity className="bg-gray-700 mt-5 rounded-md p-3">
            <View className='flex-row justify-between mt-1'>
                <Text className='text-white text-base'>Thời gian:</Text>
                <Text className='text-gray-400 text-base'>{moment(item.Date).format('lll')}</Text>
            </View>
            <Text className='text-white text-base'>Nội dung:</Text>
            <Text className="text-[#1273FE] text-base text-center">{item.Description}</Text>
            <View className='flex-row justify-between mt-1'>
                <Text className='text-white text-base'>Giao dịch:</Text>
                <Text className='text-gray-400 text-base'>
                    {item.AmountAfter-item.Amount>0 ?"+":"" }
                    {formatPrice(item.AmountAfter-item.Amount)}
                    </Text>
            </View>
            <View className='flex-row justify-between mt-1'>
                <Text className='text-white text-base'>Số dư:</Text>
                <Text className='text-gray-400 text-base'>{formatPrice(item.AmountAfter)}</Text>
            </View>
        </TouchableOpacity>
    )
}