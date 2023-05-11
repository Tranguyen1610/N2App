import { Col, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  InputNumber,
  InputNumber as InputNumber2,
} from "../../../components/Input/InputNumber";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
export const VideoModal = ({ selectedOrder, visible, onClose, onSubmitOk }) => {
  const [data, setData] = useState([]);
  const [formNameType, setFormNameType] = useState();
  const player=useRef(null)
  useEffect(()=>{
    console.log("video",selectedOrder);
    setData(selectedOrder)
  })

  return (
    <Modal
      onCancel={onClose}
      open={visible}
      title={<>Video</>}
      style={{ top: 20 }}
      width={1000}
      afterClose={() => {
       
        player.current.load()
        setData(selectedOrder)
      }}
    >
      <Player
      ref={
        player
      }
      videoId="video-1"
      height={100}>
        <source
          src={data?.LinkVideo}
          type="video/mp4"
        />
      </Player>
    </Modal>
  );
};