import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    // aspectRatio: 1,
  };
  const data = {
    labels: [
      "Đồ chơi cho chó",
      "Đồ chơi cho mèo",
      "Thức ăn cho hamster",
      "Dầu gội cho chó",
      "Dầu gội cho mèo",
      "Lồng cho hamster",
      "Dinh dưỡng cho hamster",
    ],
    datasets: [
      {
        label:
          "Tổng số lượng bán được cuả từng loại sản phẩm từ ngày x tới ngày y",
        data: [3000, 2000, 3000, 4000, 6000, 1000, 2000],
        borderColor: "rgb(75,192,192)",
      },
    ],
  };

  const dashboardData = [
    {
      name: "Tổng doanh thu",

      icon: "2px bi-currency-exchange",
    },
    {
      name: "Tổng sản phẩm bán ra",

      icon: "2px bi-box-seam-fill",
    },
    {
      name: "Tổng dịch vụ bán ra",

      icon: "2px bi-file-medical-fill",
    },
    {
      name: "Tổng đơn hàng",

      icon: "2px bi-stack",
    },
  ];

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
        <Line
          options={options}
          data={data}
          style={{ marginLeft: 20, marginTop: 50 }}
        />
      </div>
    </div>
  );
}
