import { Button, Col, Descriptions, List, Typography } from "antd";
import { DetailCourseModal } from "../../../screen/Course/components/DetailCourseModal";
import { useEffect, useState } from "react";
import axios from "axios";

export function ItemRequest(item) {
  const [visible, setVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [dataSource, setDateSource] = useState([]);
  const [dataIdRequest, setDataIdRequest] = useState();
  const getCourseById = async (id) => {
    try {
      const res = await axios.get(`/api/course/getInfoCourse/${id}`);
      console.log("getCourseByIdInRequest", res.data);

      // setListCourse(res.data);
      setDateSource(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  console.log("onSale", item?.Course.OnSale);
  return (
    <div>
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
                <Typography style={item?.Status==true?{fontWeight:"bold",color:"green"}:{fontWeight:"bold",color:"red"}}>{item?.Status==true?"Đã xử lý":"Chưa xử lý"}</Typography>
              </Descriptions.Item>
          
            <Descriptions.Item label={"Người gửi"}>
              <Typography>{item?.Sender?.Name}</Typography>
            </Descriptions.Item>
            <Descriptions.Item label={"Thời gian"}>
              <Typography>{item?.createdAt}</Typography>
            </Descriptions.Item>
          </Descriptions>
          <Button
            block
            ghost
            type="primary"
            onClick={() => {
              setSelectedCourse(getCourseById(item?.Course?._id));
              setVisible(true);
              setDataIdRequest(item?._id);
            }}
          >
            Chi tiết
          </Button>
        </Col>
      </List.Item>
      <DetailCourseModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        selectedOrder={dataSource}
        idRequest={dataIdRequest}
      />
    </div>
  );
}
