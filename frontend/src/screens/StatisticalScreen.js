import { View, Text, StatusBar, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { Url } from '../contexts/constants'
import axios from 'axios'

const { width, height } = Dimensions.get('screen');

export default function StatisticalScreen() {
    const [topFiveCourse, setTopFiveCourse] = useState([]);
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    });
    const getTopFileCourse = async () => {
        let list = [];
        try {
            const res = await axios.get(`${Url}/course/getCourseofTeacherSort`);
            // console.log(res.data);
            const listcourse = res.data;
            for (let index = 0; index < listcourse.length; index++) {
                list.push(listcourse[index])
            }
        } catch (err) {
            console.log(err);
        }

        let dataa =
        {
            labels: [],
            datasets: [
                {
                    data: [],
                },
            ],
        };
        setTopFiveCourse(list.slice(0, 5));
        let top5 = list.slice(0, 5);
        top5.forEach((c,i)=>{
            dataa.labels.push("Top "+ Number(i+1))
            dataa.datasets[0].data.push(c.NumSale);
        })
        setData(dataa);
    }
    useEffect(() => {
        getTopFileCourse();
    }, [])
    return (
        <SafeAreaView className="bg-[#0A0909] flex-1 p-5">
            <StatusBar backgroundColor={"#0A0909"} />
            <Text className="text-[#1273FE] text-lg text-center mb-3">Top 5 khóa học bán chạy</Text>
            <BarChart
                data={data}
                width={width * 0.95}
                height={200}
                chartConfig={{
                    backgroundColor: "#004FE2",
                    backgroundGradientFrom: "#1566FD",
                    backgroundGradientTo: "#598AFA",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,

                    },

                }}
                showValuesOnTopOfBars={true}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    alignItems:'center',
                    marginBottom:20
                }}
            />
            {topFiveCourse.map((c,i)=>(
                <View className="items-start flex-row mt-5" key={i}>
                    <Text className="text-white text-base w-1/6">Top {i+1}:</Text>
                    <Text className="text-white text-base w-4/6">{c.Name}</Text>
                    <Text className="text-white text-base w-1/6 text-center">{c.NumSale}</Text>
                </View>
            ))}
        </SafeAreaView>
    )
}