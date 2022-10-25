import React from "react";
import "../source/Login.css";
import axios from "axios";
import { useState } from "react";
import logo from "../source/img/login_logo.png";
import { Link } from "react-router-dom";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  // const handlerSubmit = () => {
  //   axios
  //     .post("http://localhost:8080/login", { email: email, pass: password })
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  // };

  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", { email: email, pass: password })
      .then((response) => {
        if (response.status === 200 && response.data !== " ") {
          sessionStorage.setItem("token", response.data);
          history.push("/");
        } else {
          sessionStorage.clear();
        }
        // console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        sessionStorage.clear();
      });
  };

  return (
    <>
      <div className="All_box">
        <div className="login_box">
          <img src={logo} className="Logo" alt="로고" />
          <span className="logintext">가입한 계정으로 로그인</span>
          <input
            className="in_box"
            placeholder="아이디"
            value={email}
            onChange={changeEmail}
          />
          <input
            className="in_box"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={changePassword}
          />
          <span className="check_b">아이디저장</span>
          <button
            className="login btn_bb"
            onClick={handlerSubmit}
            type="button"
          >
            로그인
          </button>
          <button className="g_join btn_bb">
            <img src={require("../source/img/gg2.png")} alt="구글 로그인" />
          </button>
          <Link to="/join">
            <button className="join btn_bb" type="button">
              회원가입
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
