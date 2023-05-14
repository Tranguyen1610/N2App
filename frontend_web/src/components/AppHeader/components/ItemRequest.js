import { Button, Col, Descriptions, List, Typography } from "antd";
import { DetailCourseModal } from "../../../screen/Course/components/DetailCourseModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { DrawMoneyModal } from "./DrawMoneyModal";
import { Url } from "../../../contexts/constants";

export function ItemRequest(item) {
  const [visible, setVisible] = useState(false);
  const [DrawVisible, setDrawVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedDraw, setSelectedDraw] = useState();
  const [dataSource, setDateSource] = useState([]);
  const [dataIdRequest, setDataIdRequest] = useState();
  const [dataIdCancel, setDataIdCancel] = useState();
  const [dataRequest,setDataRequest]=useState();

  const getCourseById = async (id) => {
    try {
      const res = await axios.get(`${Url}/api/course/getInfoCourse/${id}`);
      console.log("getCourseByIdInRequest", res.data);
      // setListCourse(res.data);
      setDateSource(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const acceptRequest = async(id)=>{
    try {
        const res = await axios.put(`${Url}/api/request/acceptRequest/${id}`)
        if (res)
        window.location.reload(false);
    } catch (err) {
        
    }
}
const denyRequest = async(id)=>{
    try {
        const res = await axios.put(`${Url}/api/request/denyRequest/${id}`)
        if (res)
        window.location.reload(false);
    } catch (err) {
        
    }
}
  return (
    <div style={{
      backgroundColor:{},
      marginBottom:10
    }}>
      <List.Item className="ItemRequest">
        <Col
          style={{
            padding: 10,
          }}
        >
          <Descriptions column={1}>
          <Descriptions.Item label={"Yêu cầu"}>
                <Typography>{item?.Content?.Name}</Typography>
              </Descriptions.Item>
            
              <Descriptions.Item label={"Trạng thái"}>
                {item?.IsCancel==false?
                <Typography style={item?.Status==true?{fontWeight:"bold",color:"green"}:{fontWeight:"bold",color:"red"}}>
                  {item?.Status==true?"Đã xử lý":"Chưa xử lý"}
                </Typography>:
                <Typography style={item?.IsCancel==true?{fontWeight:"bold",color:"red"}:null}>{item?.IsCancel==true?"Đã hủy":null}</Typography>
                }
              </Descriptions.Item>
              <Descriptions.Item label={"Kết quả"}>
                {item?.IsCancel==false?
                <Typography style={item?.Result==1?{fontWeight:"bold",color:"green"}:item?.Result==0?{fontWeight:"bold",color:"red"}:{fontWeight:"bold",color:"gray"}}>
                  {item?.Result==1?"Được phê duyệt":item?.Result==0?"Từ chối":"Chờ phê duyệt"}
                  </Typography>:null}
              </Descriptions.Item>
            <Descriptions.Item label={"Người gửi"}>
              <Typography>{item?.Sender?.Name}</Typography>
            </Descriptions.Item>
            <Descriptions.Item label={"Thời gian"}>
              <Typography>{item?.createdAt}</Typography>
            </Descriptions.Item>
          </Descriptions>
          {item?.Content?.Key=="buycourse"?
          <Button
            block
            ghost
            type="primary"
            onClick={() => {
              setSelectedCourse(getCourseById(item?.Course?._id));
              setVisible(true);
              setDataIdRequest(item?._id);
              setDataRequest(item)
              setDataIdCancel(item?.IsCancel);
              console.log("dataIsCancel",item);
            }}
          >
            Chi tiết
          </Button>
          :item?.Content?.Key=="withdrawmoney"?(
            <div style={{display:"flex"}}>
            {/* {item?.Status==false&&item?.IsCancel==false?(
              <>
          <Button
            block
            ghost
            type="primary"
            onClick={() => {
              acceptRequest(item?._id)
            }}
          >
            Duyệt
          </Button>
          <Button
            style={{paddingLeft:5,paddingRight:5}}
            block
            ghost
            type="primary"
            onClick={() => {
              denyRequest(item?._id)
            }}
          >
            Từ chối
          </Button></>):null} */}
          <Button
            block
            ghost
            type="primary"
            onClick={() => {
              setDrawVisible(true)
              setSelectedDraw(item)
              console.log("dataDraw",item);
            }}
          >
            Chi tiết
          </Button>
          </div>
          )
          :null}
        </Col>
      </List.Item>
      <DetailCourseModal
      dataRequest={dataRequest}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        selectedOrder={dataSource}
        idRequest={dataIdRequest}
        isCancel={dataIdCancel}
      />
      <DrawMoneyModal
      accept={acceptRequest}
      deny={denyRequest}
      DrawVisible={DrawVisible}
      selectedDraw={selectedDraw}
      onClose={()=>{
        setDrawVisible(false)
      }}
      />
    </div>
  );
}
