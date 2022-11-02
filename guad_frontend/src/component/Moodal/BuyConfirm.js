import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../../source/Moodal6.module.css";

function BuyConfirm({ closeModal2, modalChange2, item, presentPrice, price }) {
  const [dto, setDto] = useState([]);
  const [purchasePrice, setPurchasePrice] = useState();
  const [member, setMember] = useState({});
  const [result, setResult] = useState(0);

  useEffect(() => {
    setDto(item)
    setPurchasePrice(presentPrice)
  }, [item, presentPrice]);

  useEffect(() => {
    axios.get("http://localhost:8080/member")
    .then(response => {
      console.log(response.data)
      setMember(response.data)
      const tempResult = response.data.mileage - price
      console.log(tempResult)
      setResult(tempResult)
    })
    .catch(error => console.log(error))
  }, [price])

  return (
    <>
      <div className={style.modal2} ref={modalChange2}>
        <div className={style.modalcontent2}>
          <div className={style.modalheader2}>
            <h2>결제 내역</h2>
          </div>
          <div className={style.modalbody2}>
            <div className={style.info_b}>
              <img src={require("../../source/img/item01.png")} alt="상품이미지" />
              <div className={style.info_in}>
                <span className={style.info1}>상품 정보</span>
                <span className={style.info2}>{dto.itemSub}</span>
                <span className={style.info3}>상품 가격</span>
                <span className={style.info4}>{purchasePrice}</span>
              </div>
            </div>
            <div className={style.info_c}>
              <span>
                내 마일리지<strong>{member.mileage}</strong>
              </span>
              <span>
                상품 가격<strong>- {purchasePrice}</strong>
              </span>
            </div>

            <div className={style.info_d}>
              <span>배송 정보</span>
              <div className={style.input_b1}>
                <p>주소</p>
                <input type="text" className={style.input1} />
                <button type="button">검색</button>
              </div>
              <div className={style.input_b2}>
                <p>상세주소</p>
                <input type="text" className={style.input2} />
              </div>
            </div>
          </div>
          <div className={style.modalfooter2}>
            <h2>거래결과</h2>
            <p>
              거래 후 마일리지 <strong>{member && result}</strong>
            </p>

            <button
              type="button"
              className={style.outbtn1}
              onClick={closeModal2}
            >
              결제완료
            </button>
            <button
              type="button"
              className={style.outbtn2}
              onClick={closeModal2}
            >
              결제취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BuyConfirm;
