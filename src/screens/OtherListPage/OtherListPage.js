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
  "Loại item",
  "Mã item",
  "Tổng tiền",
  "Trạng thái giao hàng",
  "Địa chỉ kho hàng",
];

const OtherListPage = () => {
  const [orders, setOrders] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/delivery-handling/deliverables")
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
    const filteredResults = orders.filter((order) =>
      ["id", "createdTime", "status", "customerName"].some((field) => {
        const value = order[field];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchText.toLowerCase());
        } else if (typeof value === "number" && !isNaN(searchText)) {
          return value === parseFloat(searchText);
        }
        return false;
      })
    );
    setResult(filteredResults);
  };

  const handleSortByStatus = () => {
    const sortedResult = [...result];

    sortedResult.sort((a, b) => {
      const nameA = a.deliveryStatus.toUpperCase();
      const nameB = b.deliveryStatus.toUpperCase();

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

  const handleSortByType = () => {
    const sortedResult = [...result];

    sortedResult.sort((a, b) => {
      const nameA = a.itemType.toUpperCase();
      const nameB = b.itemType.toUpperCase();

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
          Quản lý các sản phẩm và dịch vụ cần phải được giao
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
              <Dropdown.Item onClick={handleSortByType}>
                Loại Item
              </Dropdown.Item>
              <Dropdown.Item onClick={handleSortByStatus}>
                Trạng thái giao hàng
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
                <td>{order.orderId}</td>
                <td>{order.itemType}</td>
                <td>{order.orderItemIds}</td>
                <td>{order.totalPrice}</td>

                <td>{order.deliveryStatus}</td>
                <td>{order.sourceLocation}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OtherListPage;
