import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BsBell, BsSearch } from "react-icons/bs";
import { Navbar, Nav, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const tableHead = [
  "Mã vận đơn",
  "Ngày giao hàng",
  "Người giao hàng",
  "Tình trạng",
  "Tổng tiền ",
  "",
];

const productOrder = [
  {
    id: "111",
    date: "23/06/2023",
    shipper: "Nguyen Van A",
    status: "pending",
    total: "200.000 VNĐ",
  },
  {
    id: "222",
    date: "23/06/2023",
    shipper: "Tran Tuan B",
    status: "pending",
    total: "200.000 VNĐ",
  },
  {
    id: "333",
    date: "23/06/2023",
    shipper: "Le Vu C",
    status: "pending",
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
  const handleEditButton = (e) => {
    e.preventDefault();
    navigate("/detail");
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
          Quản lý đơn hàng
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

          <Button
            type="submit"
            size="sm"
            className="rounded-3 "
            style={{
              backgroundColor: "#218187",
              marginLeft: 100,
              width: "150px",
            }}
          >
            Thêm đơn
          </Button>
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
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.shipper}</td>
                <td>{order.status}</td>
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
                        marginRight: "5px",
                      }}
                      onClick={handleEditButton}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      size="sm"
                      style={{
                        color: "red",
                        border: "1px solid red",
                        backgroundColor: "white",
                        fontWeight: 500,
                        flex: 1,
                        marginLeft: "5px",
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
