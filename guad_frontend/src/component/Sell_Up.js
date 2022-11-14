import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import style from "../source/SellItem_u.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";
import Up_After from "./Up_After";
import Up_Before from "./Up_Before";


var stompClient = null
const token = `Bearer ${sessionStorage.getItem("token")}`
function Sell_Up({ match }) {
  const [start, setStart] = useState(false);
  const [item, setItem] = useState({});
  const [imgList, setImgList] = useState([]);
  const buyer = useRef();

  const clickStart = () => {
    if (sessionStorage.length != 0) {
      setStart(true);
    } else {
      alert("로그인해주세요!");
      setStart(false);
    }
  };
  console.log(item.itemNum);
  console.log(imgList);

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sellitem/${match.params.itemNum}`
      )
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
        imgList.push(response.data.itemImgName);
        imgList.push(response.data.itemImgNameSub2);
        imgList.push(response.data.itemImgNameSub3);
        setImgList(imgList);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(">>>>" + item.itemNum);

  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };


//////////////////////오름 경매/////////////////////////

const [bid, setBid] = useState();
const [presentBid, setPresentBid] = useState('');
const [change, setChange] = useState(false);
const [Dto, setDto] = useState({
    itemNum: match.params.itemNum,
    auctionPrice: 0,
    nickname: '',
    email: '',
});

useEffect(() => {
    connect();
}, [presentBid])

useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/bidlist`)
    .then(response => {
        console.log(response.data)
        // const newBidList = [...response.data]
        setPresentBid(response.data)
    })
    .catch(error => console.log(error))
    // connect();
}, [change])

const connect = () => {
    let Sock = new SockJS(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
}

const onConnected = () => {
    console.log(match.params.itemNum)
    stompClient.subscribe(`/sub/${match.params.itemNum}/bidlist`, onMessageReceived);
    // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
}

const onError = (err) => {
    console.log(err);
}

const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData)
    setPresentBid(payloadData.auctionPrice)
    setChange(!change);
}

const handlerBid = () => {
    stompClient.send(`/pub/bidlist/${match.params.itemNum}`, {Authorization: token}, JSON.stringify(Dto));
    // stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
}

const handlerBidPrice = e => {
    setBid(e.target.value)
    setDto({ ...Dto, "auctionPrice": e.target.value })
}





  return (
    <>
      <NotifyWrite
        closeModal={closeModal}
        modalChange={modalChange}
        itemNum={item.itemNum}
      />
      <div id={style.item_num} className={style.item_num}>
        {item.itemNum}
      </div>
      <div className={style.item_top}>
        <h2>
          <strong>오름</strong>판매
        </h2>
        <div className={style.img_item}>
          <img
            src={
              item.itemImgName &&
              `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${item.itemImgName}`
            }
            alt={"img" + item.notifyNum}
            className={style.item}
          />
          <img
            src={require("../source/img/del2_b.png")}
            alt="오름경매"
            className={style.up2}
          />
          <ul>
            {imgList?.map((img, index) => (
              <li key={index}>
                <img
                  src={
                    img
                      ? `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${img}`
                      : require("../source/img/no_photo.png")
                  }
                  alt={"img" + item.notifyNum}
                  className={style.item_o}
                />
              </li>
            ))}
          </ul>
        </div>
        {start == false && item && (
          <Up_Before
            openModal={openModal}
            clickStart={clickStart}
            item={item}
          />
        )}
        {start == true && item && (
          <Up_After openModal={openModal} item={item} buyer={buyer}/>
        )}
      </div>
      <div className={style.item_bot}>
        <h2>상품 설명</h2>
        <p>{item.itemContents}</p>
      </div>
    </>
  );
}
export default Sell_Up;
