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
  const [videoKey, setVideoKey] = useState(0);
  const [isPlayerReady, setPlayerReady] = useState(false);
  const player = useRef(null);

  useEffect(() => {
    console.log("video", selectedOrder);
    setData(selectedOrder);
    setPlayerReady(false); // Đặt lại giá trị isPlayerReady thành false khi video được thay đổi
  }, [selectedOrder]);

  useEffect(() => {
    if (isPlayerReady) {
      player.current.load();
    }
  }, [isPlayerReady]);

  const handlePlayerLoadStart = () => {
    setPlayerReady(false);
  };

  const handlePlayerCanPlayThrough = () => {
    setPlayerReady(true);
  };

  const handleModalClose = () => {
    player.current.pause();
    setVideoKey((prevKey) => prevKey + 1); // Tăng giá trị key để unmount và remount component Player
    onClose();
  };

  return (
    <Modal
      cancelButtonProps={{ hidden: true }}
      okButtonProps={{ hidden: true }}
      onCancel={handleModalClose}
      open={visible}
      title={<>Video</>}
      style={{ top: 20 }}
      width={1000}
      afterClose={() => {
        // player.current.load();
        // setData(selectedOrder);
      }}
    >
      <Player
        key={videoKey} // Thêm key để unmount và remount component
        ref={player}
        // videoId="video-1"
        height={100}
        // onLoadStart={handlePlayerLoadStart}
        onCanPlayThrough={handlePlayerCanPlayThrough}
      >
        <source src={data?.LinkVideo} type="video/mp4" />
      </Player>
    </Modal>
  );
};
