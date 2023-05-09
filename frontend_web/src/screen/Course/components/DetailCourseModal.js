import { Avatar, Col, Descriptions, Image, Modal, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { VideoModal } from "./VideoModal";
import Link from "antd/es/typography/Link";

const {Column}=Table;

export const DetailCourseModal = (
    { 
    selectedOrder,
    visible,
    onClose,
    onSubmitOk,
    })=>{
        const [visibleVideo,setVisibleVideo]=useState(false);
        const [selectedCourse, setSelectedCourse] = useState();
        useEffect(()=>{
            console.log("dataCourseOfStudent:",selectedOrder);
        })
        

    return(
        <div>
        <Modal
        onCancel={onClose}
        open={visible}
        title={
            <>
              Chi tiết khóa học{" "}
                <span className="text-primary">{selectedOrder?._id}</span>
            </>
        }
        style={{ top: 20 }}
        width={1000}
        >
            <div style={{
                display:"flex"
            }}>
            <Col
            span={12}
            >
                <Descriptions
                column={1}
                title="Thông tin khóa học"
                contentStyle={{fontWeight:"bold"}}
                >
                    <Descriptions.Item
                    label="Mã khóa học"
                    >
                        <span>{selectedOrder?._id}</span>
                    </Descriptions.Item>
                    <Descriptions.Item
                    label="Thể loại"
                    >
                        <span>{selectedOrder?.Type?.Name}</span>
                    </Descriptions.Item>
                    <Descriptions.Item
                    label="Trạng thái"
                    >
                        <span style={{color:"red"}}>{selectedOrder?.OnSale==false?"Chưa bán":"Đang bán"}</span>
                    </Descriptions.Item>
                </Descriptions>
            </Col>
           
            </div>
            <Col>
            <Spin spinning={false}>
        <Table
        pagination={false}
         dataSource={selectedOrder?.ListVideo}
        // loading={loading}
        >
          <Column
          title="Video bài giảng"
          dataIndex="Name"
          key={"course.name"}
          render={(text,record)=>{
            return(
                <Link
                onClick={()=>{
                    setVisibleVideo(true)
                    setSelectedCourse(record)
                }}
                >
                {`${text}`}
                </Link>
            )
          }}
         
          ></Column>
          <Column
          title="Mô tả"
          dataIndex="Description"
          ></Column>
          {/* <Column
          title="Nổi bật"
          dataIndex="isHighlight"
          ></Column>
          <Column
          title="Trạng thái"
          dataIndex="isActive"
          ></Column> */}
        </Table>
      </Spin>
            </Col>
        </Modal>
        <VideoModal
      visible={visibleVideo}
      onClose={()=>{setVisibleVideo(false)}}
      selectedOrder={selectedCourse}
      />
        </div>
    )
}