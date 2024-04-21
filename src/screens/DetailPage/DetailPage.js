import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";

const tableHead = [
  "Mã sản phẩm",
  "Tên sản phẩm",
  "Giá tiền/sản phẩm",
  "Số lượng",
  "Giá tiền",
  "",
];

const product = [
  {
    id: "11",
    name: "Hạt cho mèo gói siêu tiện lợi 300g",
    price_product: "100.000 VNĐ",
    unit: "1",
    total: "100.000 VNĐ",
  },
  {
    id: "22",
    name: "Hạt cho mèo gói siêu tiện lợi 300g",
    price_product: "100.000 VNĐ",
    unit: "1",
    total: "100.000 VNĐ",
  },
  {
    id: "33",
    name: "Hạt cho mèo gói siêu tiện lợi 300g",
    price_product: "100.000 VNĐ",
    unit: "1",
    total: "100.000 VNĐ",
  },
  {
    id: "44",
    name: "Hạt cho mèo gói siêu tiện lợi 300g",
    price_product: "100.000 VNĐ",
    unit: "2",
    total: "200.000 VNĐ",
  },
];

export default function DetailPage() {
  const { orderId } = useParams();
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
        <div className="d-flex mt-4 " style={{ marginLeft: "10%" }}>
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
        </div>
        <Table
          responsive
          className="mt-4 "
          style={{
            //border: "1px solid grey ",
            maxWidth: "80%",
            marginLeft: "10%",

            //borderRadius: "100px",
          }}
          //bordered
        >
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "#E1F2F3",
                  fontFamily: "Work Sans",
                  fontWeight: 600,
                }}
              >
                STT
              </th>

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
            {product.map((product, index) => (
              <tr>
                <td>{index}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price_product}</td>
                <td>{product.unit}</td>
                <td>{product.total}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
              500.000 VNĐ
            </div>
          </div>

          <div style={{ marginTop: 30 }}>
            <div style={{ fontFamily: "Work Sans", fontSize: 22 }}>
              Phương thức thanh toán:{" "}
            </div>
            <div
              style={{
                fontFamily: "Work Sans",
                fontSize: 18,
                color: "#868686",
              }}
            >
              Thanh toán khi nhận hàng
            </div>
          </div>

          <div style={{ marginTop: 30 }}>
            <div style={{ fontFamily: "Work Sans", fontSize: 22 }}>
              Trạng thái thanh toán:{" "}
            </div>
            <div
              style={{
                fontFamily: "Work Sans",
                fontSize: 18,
                color: "#868686",
              }}
            >
              Chưa thanh toán
            </div>
          </div>

          <div style={{ fontFamily: "Work Sans", fontSize: 22, marginTop: 30 }}>
            <div style={{ fontFamily: "Work Sans", fontSize: 22 }}>
              Thời gian đặt hàng:{" "}
            </div>
            <div
              style={{
                fontFamily: "Work Sans",
                fontSize: 18,
                color: "#868686",
              }}
            >
              21-04-2024 07:12
            </div>
          </div>

          <div style={{ fontFamily: "Work Sans", fontSize: 22, marginTop: 30 }}>
            Tên khách hàng:{" "}
          </div>

          <div style={{ fontFamily: "Work Sans", fontSize: 22, marginTop: 30 }}>
            Số điện thoại:{" "}
          </div>

          <div style={{ fontFamily: "Work Sans", fontSize: 22, marginTop: 30 }}>
            Địa chỉ nhận hàng:{" "}
          </div>
          <div style={{ fontFamily: "Work Sans", fontSize: 22, marginTop: 30 }}>
            Nhân viên giao hàng:{" "}
          </div>
          <div style={{ fontFamily: "Work Sans", fontSize: 22, marginTop: 30 }}>
            Mã vận đơn:{" "}
          </div>
          <div style={{ fontFamily: "Work Sans", fontSize: 22, marginTop: 30 }}>
            Mã đơn hàng:{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
