import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar, Nav, Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StatisticPage() {
  const [reportOverview, setReportOverView] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/report/overview")
      .then((res) => {
        console.log(res.data);
        setReportOverView(res.data);
      })
      .catch((err) => {
        // console.error(err);
      });
  }, []);

  const [startDate, setStartDate] = useState(new Date());

  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);
  const [endDate, setEndDate] = useState(tomorrowDate);

  const handleStartDateChange = (date) => {
    if (date > endDate) {
      alert("Ngày bắt đầu không thể sau ngày kết thúc. Vui lòng nhập lại!");
    } else {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date < startDate) {
      alert("Ngày kết thúc không thể trước ngày bắt đầu. Vui lòng nhập lại!");
    } else {
      setEndDate(date);
    }
  };

  const [intervalHours, setIntervalHours] = useState("");
  const handleChange = (e) => {
    setIntervalHours(e.target.value);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [info, setInfo] = useState([]);
  const [submitState, setSubmitState] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const sd = formatDate(startDate);
    const ed = formatDate(endDate);
    if (!intervalHours) {
      alert("Vui lòng nhập intervalHours");
      return;
    }
    axios
      .get(
        `api/v1/report/intervals?fromTime=${sd}T00:00:00&toTime=${ed}T00:00:00&intervalHours=${intervalHours}`
      )
      .then((response) => {
        setInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setSubmitState(true);
  };

  const intervalNumber = info.map((item) => item.intervalNumber);
  const orderCount = info.map((item) => item.orderCount);
  const deliveriesSuccess = info.map((item) => item.deliveriesSuccess);
  const deliveriesFailed = info.map((item) => item.deliveriesFailed);

  console.log(orderCount);

  const data = {
    labels: intervalNumber,
    datasets: [
      {
        label: `Tổng số lượng đơn hàng theo từng khoảng thời gian ${intervalHours}h từ ngày ${formatDate(
          startDate
        )} tới ngày ${formatDate(endDate)}`,
        data: orderCount,
        borderColor: "rgb(75,192,192)",
      },
      {
        label: `Tổng số lượng sản phẩm & dịch vụ giao thành công theo từng khoảng thời gian ${intervalHours}h từ ngày ${formatDate(
          startDate
        )} tới ngày ${formatDate(endDate)}`,
        data: deliveriesSuccess,
        borderColor: "rgba(122, 171, 226, 0.7)",
      },
      {
        label: `Tổng số lượng sản phẩm & dịch vụ giao thất bại theo từng khoảng thời gian ${intervalHours}h từ ngày ${formatDate(
          startDate
        )} tới ngày ${formatDate(endDate)}`,
        data: deliveriesFailed,
        borderColor: "rgba(241, 0, 0, 0.7)",
      },
    ],
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          width: "100%",
          height: 500,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 4 dashboard: tổng doanh thu, tổng sản phẩm bán ra, tổng dịch vụ bán ra, tổng đơn hàng */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#CCDCDE",
              minHeight: 100,
              width: "25%",
              marginRight: 10,
              borderRadius: 10,
              alignItems: "center",

              display: "flex",
            }}
          >
            <i
              className="2px bi-currency-exchange"
              style={{
                color: "#005D68",
                fontSize: 30,
                marginLeft: "5%",
              }}
            ></i>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10%",
              }}
            >
              <div
                style={{
                  fontFamily: "Work Sans",
                  fontSize: 15,

                  color: "#666666",
                }}
              >
                Tổng doanh thu
              </div>

              <div
                style={{
                  fontSize: 20,
                  fontFamily: "Work Sans",
                  color: "#0E3639",
                }}
              >
                {reportOverview.totalRevenue}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#CCDCDE",
              minHeight: 100,
              width: "25%",
              marginRight: 10,
              borderRadius: 10,
              alignItems: "center",

              display: "flex",
            }}
          >
            <i
              className="2px bi-box-seam-fill"
              style={{
                color: "#005D68",
                fontSize: 30,
                marginLeft: "5%",
              }}
            ></i>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10%",
              }}
            >
              <div
                style={{
                  fontFamily: "Work Sans",
                  fontSize: 15,

                  color: "#666666",
                }}
              >
                Tổng sản phẩm bán ra
              </div>

              <div
                style={{
                  fontSize: 20,
                  fontFamily: "Work Sans",
                  color: "#0E3639",
                }}
              >
                {reportOverview.productsSole}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#CCDCDE",
              minHeight: 100,
              width: "25%",
              marginRight: 10,
              borderRadius: 10,
              alignItems: "center",

              display: "flex",
            }}
          >
            <i
              className="2px bi-file-medical-fill"
              style={{
                color: "#005D68",
                fontSize: 30,
                marginLeft: "5%",
              }}
            ></i>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10%",
              }}
            >
              <div
                style={{
                  fontFamily: "Work Sans",
                  fontSize: 15,

                  color: "#666666",
                }}
              >
                Tổng dịch vụ bán ra
              </div>

              <div
                style={{
                  fontSize: 20,
                  fontFamily: "Work Sans",
                  color: "#0E3639",
                }}
              >
                {reportOverview.servicesSole}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#CCDCDE",
              minHeight: 100,
              width: "25%",
              marginRight: 10,
              borderRadius: 10,
              alignItems: "center",

              display: "flex",
            }}
          >
            <i
              className="2px bi-stack"
              style={{
                color: "#005D68",
                fontSize: 30,
                marginLeft: "5%",
              }}
            ></i>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10%",
              }}
            >
              <div
                style={{
                  fontFamily: "Work Sans",
                  fontSize: 15,

                  color: "#666666",
                }}
              >
                Tổng khách hàng
              </div>

              <div
                style={{
                  fontSize: 20,
                  fontFamily: "Work Sans",
                  color: "#0E3639",
                }}
              >
                {reportOverview.customerCount}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 20,
            marginTop: 40,
          }}
        >
          <div style={{ marginRight: 10 }}>Nhập ngày bắt đầu: </div>
          <DatePicker selected={startDate} onChange={handleStartDateChange} />
          <div style={{ marginRight: 10, marginLeft: 20 }}>
            Nhập ngày kết thúc:{" "}
          </div>
          <DatePicker selected={endDate} onChange={handleEndDateChange} />

          <Form
            inline={+true}
            style={{
              display: "flex",
              height: 30,
              paddingLeft: 40,
            }}
            onSubmit={handleSubmit}
          >
            <Form.Control
              type="text"
              placeholder="Nhập khoảng thời gian"
              className=" mr-sm-2 rounded-0"
              onChange={handleChange}
            />
            <Button
              type="submit"
              className="rounded-0"
              style={{ backgroundColor: "#218187" }}
            />
          </Form>
        </div>
        {submitState && info.length > 0 ? (
          <Line
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Số thứ tự của khoảng thời gian có hoạt động kinh doanh",
                  },
                },
              },
            }}
            data={data}
            style={{ marginLeft: 20, marginTop: 50 }}
          />
        ) : !submitState ? (
          <div></div>
        ) : (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
          >
            Không có hoạt động kinh doanh nào trong khoảng thời gian trên!
          </div>
        )}
      </div>
    </div>
  );
}
