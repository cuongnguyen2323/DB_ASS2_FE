import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";

const tableHead = [
  "Mã sản phẩm",
  "Loại",
  "Tên",
  "Giá tiền/sản phẩm",
  "Số lượng",
  "DeliveryId",
  "Tình trạng",
  "",
];

export default function DetailPage() {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/order/views?id=${orderId}`)
      .then((res) => {
        console.log(res.data.content);
        setOrderDetail(res.data.content);
      })
      .catch((err) => {
        // console.error(err);
      });
  }, []);

  const [orderItem, setOrderItem] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/order/views/${orderId}/details`)
      .then((res) => {
        console.log(res.data);
        setOrderItem(res.data);
      })
      .catch((err) => {
        // console.error(err);
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div>
        <div
          className="text-center mt-4"
          style={{ fontFamily: "Work Sans", fontSize: 30 }}
        >
          Thông tin đơn hàng số {orderId}
        </div>
        {/* <div className="d-flex mt-4 " style={{ marginLeft: "10%" }}>
          <Button
            type="submit"
            size="sm"
            className="rounded-3 d-flex align-items-center justify-content-center mt-0.3"
            style={{
              backgroundColor: "#218187",
              width: 30,
              height: 30,
            }}
          >
            <AddIcon />
          </Button>
          <div style={{ fontFamily: "Work Sans", fontSize: 20, marginLeft: 5 }}>
            Thêm sản phẩm
          </div>
        </div> */}
        <div style={{ width: "100%", marginLeft: 40 }}>
          <Table responsive className="mt-4" style={{}}>
            <thead>
              <tr>
                {tableHead.map((h, index) => (
                  <th
                    key={index}
                    style={{
                      backgroundColor: "#E1F2F3",
                      fontFamily: "Work Sans",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {orderItem.map((product, index) => (
                <tr>
                  <td>{product.id}</td>
                  <td>{product.type}</td>
                  <td>{product.itemName}</td>
                  <td>{product.priceEach}</td>
                  <td>{product.quantity}</td>
                  <td>{product.deliveryId}</td>
                  <td>{product.deliveryStatus}</td>
                  {/* <td>
                  <div style={{ display: "flex" }}>
                    <Button
                      size="sm"
                      style={{
                        color: "#218187",
                        border: "1px solid #218187",
                        backgroundColor: "white",
                        fontWeight: 500,
                        flex: 1,
                        width: "100px",
                        marginRight: "5px",
                        // marginLeft: "5px",
                      }}
                    >
                      Sửa
                    </Button>

                    <Button
                      size="sm"
                      style={{
                        color: "red",
                        border: "1px solid red",
                        backgroundColor: "white",
                        fontWeight: 500,
                        flex: 1,
                        // marginLeft: "5px",
                      }}
                    >
                      Xoá
                    </Button>
                  </div>
                </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div style={{ marginLeft: "10%", marginTop: 20 }}>
          <div className="d-flex flex-row">
            <div style={{ fontFamily: "Work Sans", fontSize: 22 }}>
              Thành tiền:{" "}
            </div>
            <div
              style={{
                fontFamily: "Work Sans",
                fontSize: 22,
                color: "#218187",
                marginLeft: 10,
              }}
            >
              {orderDetail.length > 0 && orderDetail[0].price}
            </div>
          </div>

          <div style={{ marginTop: 30 }}>
            <div style={{ fontFamily: "Work Sans", fontSize: 22 }}>
              Tình trạng:
            </div>
            <div
              style={{
                fontFamily: "Work Sans",
                fontSize: 18,
                color: "#868686",
              }}
            >
              {orderDetail.length > 0 && orderDetail[0].status}
            </div>
          </div>

          <div style={{ marginTop: 30 }}>
            <div style={{ fontFamily: "Work Sans", fontSize: 22 }}>
              Thời gian tạo đơn:{" "}
            </div>
            <div
              style={{
                fontFamily: "Work Sans",
                fontSize: 18,
                color: "#868686",
              }}
            >
              {/* {orderDetail.length > 0 && orderDetail[0].createdTime} */}
              {orderDetail.length > 0 && orderDetail[0].createdTime[0]}
              {"-"}
              {orderDetail.length > 0 && orderDetail[0].createdTime[1]}
              {"-"}
              {orderDetail.length > 0 && orderDetail[0].createdTime[2]}{" "}
              {orderDetail.length > 0 && orderDetail[0].createdTime[3]}
              {":"}
              {orderDetail.length > 0 && orderDetail[0].createdTime[4]}
              {":"}
              {orderDetail.length > 0 && orderDetail[0].createdTime[5]}
            </div>
          </div>

          <div style={{ fontFamily: "Work Sans", fontSize: 22, marginTop: 30 }}>
            <div style={{ fontFamily: "Work Sans", fontSize: 22 }}>
              Địa chỉ giao hàng:{" "}
            </div>
            <div
              style={{
                fontFamily: "Work Sans",
                fontSize: 18,
                color: "#868686",
              }}
            >
              {orderDetail.length > 0 && orderDetail[0].deliveryAddress}
            </div>
          </div>

          <div style={{ fontFamily: "Work Sans", fontSize: 22, marginTop: 30 }}>
            <div style={{ fontFamily: "Work Sans", fontSize: 22 }}>
              Tên khách hàng:{" "}
            </div>
            <div
              style={{
                fontFamily: "Work Sans",
                fontSize: 18,
                color: "#868686",
              }}
            >
              {orderDetail.length > 0 && orderDetail[0].customerName}
            </div>
          </div>

          <div style={{ fontFamily: "Work Sans", fontSize: 22, marginTop: 30 }}>
            <div style={{ fontFamily: "Work Sans", fontSize: 22 }}>
              Số điện thoại:{" "}
            </div>
            <div
              style={{
                fontFamily: "Work Sans",
                fontSize: 18,
                color: "#868686",
              }}
            >
              {orderDetail.length > 0 && orderDetail[0].phoneNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
