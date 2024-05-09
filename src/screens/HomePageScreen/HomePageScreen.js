import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BsBell, BsSearch } from "react-icons/bs";
import { Navbar, Nav, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

const tableHead = [
  "Mã đơn hàng",
  "Thời gian tạo",
  "Tình trạng",
  "Tên khách hàng",
  "",
];

const HomePageScreen = () => {
  const [orders, setOrders] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/order/views")
      .then((res) => {
        console.log(res.data.content);
        setOrders(res.data.content);
        setResult(res.data.content);
      })
      .catch((err) => {
        // console.error(err);
      });
  }, []);

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredResults = orders.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setResult(filteredResults);
  };

  const navigate = useNavigate();
  const handleDetailButton = (order) => {
    navigate(`/detail/${order.id}`);
  };

  const handleSortByStatus = () => {
    const sortedResult = [...result];

    sortedResult.sort((a, b) => {
      const nameA = a.status.toUpperCase();
      const nameB = b.status.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setResult(sortedResult);
  };

  const handleSortByTime = () => {
    const sortedResult = [...result];

    // Sử dụng phương thức sort để sắp xếp các phần tử trong mảng theo thời gian tạo
    sortedResult.sort((a, b) => {
      // Chuyển đổi mảng createdTime thành chuỗi để so sánh
      const timeA = new Date(...a.createdTime).getTime();
      const timeB = new Date(...b.createdTime).getTime();

      return timeA - timeB;
    });

    // Lưu kết quả sắp xếp lại vào result
    setResult(sortedResult);
  };

  const handleSortByName = () => {
    const sortedResult = [...result];

    sortedResult.sort((a, b) => {
      const nameA = a.customerName.toUpperCase();
      const nameB = b.customerName.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setResult(sortedResult);
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
            Sắp xếp theo
          </Button> */}
          {/* sắp xếp theo status, createdTime, customerName */}
          <Dropdown style={{ marginLeft: 40 }}>
            <Dropdown.Toggle style={{ backgroundColor: "#218187" }}>
              Sắp xếp theo
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleSortByStatus}>
                Tình trạng
              </Dropdown.Item>
              <Dropdown.Item onClick={handleSortByTime}>
                Thời gian tạo
              </Dropdown.Item>
              <Dropdown.Item onClick={handleSortByName}>
                Tên khách hàng
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form>
        {/* </div> */}

        <Table responsive className="mt-4" bordered>
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
            {result.map((order, index) => (
              <tr>
                <td>{order.id}</td>
                {/* <td>{order.createdTime}</td> */}
                <td>
                  {order.createdTime[0]}
                  {"-"}
                  {order.createdTime[1]}
                  {"-"}
                  {order.createdTime[2]} {order.createdTime[3]}
                  {":"}
                  {order.createdTime[4]}
                  {":"}
                  {order.createdTime[5]}
                </td>
                <td>{order.status}</td>
                <td>{order.customerName}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    {/* <Button
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
                    </Button> */}
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
                      onClick={() => handleDetailButton(order)}
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
