import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Sidebar() {
  return (
    //<div className="container-fluid">
    <div style={{ width: 300 }}>
      <div className="row " style={{ height: "100%" }}>
        <div
          className=" col-auto  min-vh-100 "
          style={{
            backgroundColor: "white",
            borderRight: " 1px solid grey",
          }}
        >
          <div className="d-flex align-items-center justify-content-center">
            <img
              alt="logo"
              style={{
                width: "90%",
                objectFit: "contain",
              }}
              src={require("./images/logo.png")}
            />
          </div>
          <div className="text-center">
            <span
              style={{
                color: "#032B91",
                fontSize: 35,
                fontFamily: "Train One",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              BB
            </span>
            <span
              style={{
                color: "#1488DB",
                fontSize: 35,
                fontFamily: "Train One",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              PET
            </span>
          </div>
          <ul className="nav nav-pills flex-column mt-2 ">
            <li className="nav-item ms-3 ">
              <a
                href="/list"
                className="nav-link fs-5 text-black"
                aria-current="page"
              >
                <i className="bi bi-card-list"></i>
                <span
                  className="ms-2"
                  style={{ fontSize: 20, fontFamily: "Work Sans" }}
                >
                  Danh sách 1
                </span>
              </a>
            </li>
            <li className="nav-item ms-3 ">
              <a
                href="/otherlist"
                className="nav-link fs-5 text-black"
                aria-current="page"
              >
                <i className="bi bi-list-task"></i>
                <span
                  className="ms-2"
                  style={{ fontSize: 20, fontFamily: "Work Sans" }}
                >
                  Danh sách 2
                </span>
              </a>
            </li>
            <li className="nav-item fs-4 ms-3">
              <a
                href="/statistic"
                className="nav-link text-black fs-5"
                aria-current="page"
              >
                <i className="bi bi-bar-chart"></i>
                <span
                  className="ms-2 "
                  style={{ fontSize: 20, fontFamily: "Work Sans" }}
                >
                  Thống kê
                </span>
              </a>
            </li>

            <div style={{ marginTop: 240 }}>
              <li className="nav-item fs-4 ms-3">
                <a
                  href="#"
                  className="nav-link text-black fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-person-circle"></i>
                  <span
                    className="ms-2 "
                    style={{ fontSize: 20, fontFamily: "Work Sans" }}
                  >
                    cuong.nguyen
                  </span>
                </a>
              </li>
              <li className="nav-item fs-4 ms-3 ">
                <a href="#" className="nav-link fs-5 " aria-current="page">
                  <i
                    className="bi bi-box-arrow-right"
                    style={{ color: "red" }}
                  ></i>
                  <span
                    className="ms-2 "
                    style={{
                      fontSize: 20,
                      fontFamily: "Work Sans",
                      color: "red",
                    }}
                  >
                    Đăng xuất
                  </span>
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
