import { View, Text, StatusBar, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { Url } from '../contexts/constants'
import axios from 'axios'

const { width, height } = Dimensions.get('screen');

export default function StatisticalScreen() {
    const [topFiveCourse, setTopFiveCourse] = useState([]);
    let data = {
        labels: ['Top 1', 'Top 2', 'Top 3', 'Top 4', 'Top 5'],
            datasets: [
                {
                    data: [5, 4, 3, 2, 1],
                },
            ],
    };
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
        setTopFiveCourse(list.slice(0, 5));
    }
    const getData = () =>{
        data.datasets[0].data.push(5);
        data.datasets[0].data.push(4);
        data.datasets[0].data.push(3);
        data.datasets[0].data.push(2);
        data.datasets[0].data.push(1);
        console.log(data.datasets);
    }
    useEffect(()=>{
        //getTopFileCourse();
        getData();
    },[])
    return (
        <SafeAreaView className="bg-[#0A0909] flex-1 items-center ">
            <StatusBar backgroundColor={"#0A0909"} />
            <BarChart
                data={data}
                width={width*0.95}
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
                }}
            />
        </SafeAreaView>
    )
}