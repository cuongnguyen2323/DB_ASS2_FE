import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BsBell, BsSearch } from "react-icons/bs";
import { Navbar, Nav, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const tableHead = [
  "Mã đơn hàng",
  "Mã vận đơn",
  "Ngày giao hàng",
  "Người giao hàng",

  "Tổng tiền ",
  "",
];

const productOrder = [
  {
    orderId: "1",
    id: "111.1, 111.2",
    date: "02/05/2024",
    shipper: "Nguyen Van A",

    total: "200.000 VNĐ",
  },
  {
    orderId: "2",
    id: "222",
    date: "02/05/2024",
    shipper: "Tran Tuan B",

    total: "200.000 VNĐ",
  },
  {
    orderId: "3",
    id: "333",
    date: "02/05/2024",
    shipper: "Le Vu C",

    total: "200.000 VNĐ",
  },
  {
    orderId: "4",
    id: "444",
    date: "03/04/2024",
    shipper: "Ly Thi D",

    total: "200.000 VNĐ",
  },
];

const HomePageScreen = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const [result, setResult] = useState(productOrder);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredResults = productOrder.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setResult(filteredResults);
  };
  const navigate = useNavigate();
  const handleEditButton = (orderId) => {
    // e.preventDefault();
    navigate(`/detail/${orderId}`);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      {/* table */}
      <div
        style={{
          width: "100%",
          marginLeft: "5%",
          marginRight: "5%",
          marginTop: "5%",
        }}
      >
        <div
          className="text-center"
          style={{ fontFamily: "Work Sans", fontSize: 40, fontWeight: 500 }}
        >
          Quản lý đơn hàng chưa được giao
        </div>
        {/* <div style={{ display: "flex" }}> */}
        <Form
          inline={+true}
          style={{
            display: "flex",
            width: "100%",
            marginTop: 20,
          }}
          onSubmit={handleSearchSubmit}
        >
          <Form.Control
            type="text"
            placeholder="Tìm kiếm"
            className=" mr-sm-2 rounded-0"
            onChange={handleSearchChange}
          />
          <Button
            type="submit"
            className="rounded-0"
            style={{ backgroundColor: "#218187" }}
          >
            <BsSearch />
          </Button>

          {/* <Button
            type="submit"
            size="sm"
            className="rounded-3 "
            style={{
              backgroundColor: "#218187",
              marginLeft: 100,
              width: "190px",
            }}
          >
            Thêm kiện hàng
          </Button> */}
        </Form>
        {/* </div> */}
        <Table responsive className="mt-4" bordered>
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
            {result.map((order, index) => (
              <tr>
                <td>{index}</td>
                <td>{order.orderId}</td>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.shipper}</td>

                <td>{order.total}</td>
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
                        width: "60px",
                        marginRight: "5px",
                        // marginLeft: "5px",
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      style={{
                        color: "#218187",
                        border: "1px solid #218187",
                        backgroundColor: "white",
                        fontWeight: 500,
                        flex: 1,
                        marginRight: "5px",
                        width: "60px",
                      }}
                      onClick={() => handleEditButton(order.orderId)}
                    >
                      Chi tiết
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
      </div>
    </div>
  );
};

export default HomePageScreen;
