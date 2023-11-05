import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Table, Input, Select, Button, Spin } from "antd";
import "./home.css";

const { Column } = Table;
const { Option } = Select;

const Home = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("by_city");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://brewerybe-production.up.railway.app/brewery?searchType=${searchType}&searchTerm=${searchTerm}`
      );
      const result = await response.json();
      const dataWithEmptyValues = result.map((item) => {
        const updatedItem = { ...item };
        for (const key in updatedItem) {
          if (updatedItem[key] === null) {
            updatedItem[key] = "Null in Api Response";
          }
          if (key === "reviews") {
            console.log(updatedItem[key]);
          }
        }
        return updatedItem;
      });
      setData(dataWithEmptyValues);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.openbrewerydb.org/breweries?${searchType}=${searchTerm}`
  //       );
  //       const result = await response.json();
  //       const dataWithEmptyValues = result.map((item) => {
  //         const updatedItem = { ...item };
  //         for (const key in updatedItem) {
  //           if (updatedItem[key] === null) {
  //             updatedItem[key] = "Null in Api Response";
  //           }
  //         }
  //         return updatedItem;
  //       });
  //       setData(dataWithEmptyValues);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="brewery-home">
      <h2>Welcome to the Brewery Search {userData.username}</h2>
      <h5>The Select is for choosing on which criteria to search, by default, it is set to by_city</h5>
      <h5>Click on Brewery Name to open brewery information and reviews page</h5>
      <div className="search">
        <Input
          placeholder="Search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          defaultValue="by_city"
          style={{ width: 120 }}
          onChange={(value) => {
            setSearchType(value);
            setData("");
            setSearchTerm("");
          }}
        >
          <Option value="by_city">By City</Option>
          <Option value="by_name">By Name</Option>
          <Option value="by_type">By Type</Option>
        </Select>
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {loading ? (
        <Spin
          tip="...loading"
          size="large"
          style={{ position: "absolute", top: "50%", right: "50%" }}
        />
      ) : (
        <Table dataSource={data} rowKey="id">
          <Column
            title="Brewery Name"
            dataIndex="name"
            key="name"
            render={(text, record) => (
              <a
                onClick={() => navigate(`/brewery/${record.id}`)}
                style={{ cursor: "pointer" }}
              >
                {text}
              </a>
            )}
          />
          <Column title="Address" dataIndex="street" key="street" />
          <Column title="Phone Number" dataIndex="phone" key="phone" />
          <Column
            title="Website"
            dataIndex="website_url"
            key="website_url"
            render={(text) => (
              <a href={text} target="_blank" rel="noopener noreferrer">
                {text}
              </a>
            )}
          />
          <Column title="Rating" dataIndex="rating" key="rating" />
          <Column title="State" dataIndex="state" key="state" />
          <Column title="City" dataIndex="city" key="city" />
        </Table>
      )}
    </div>
  );
};

export default Home;
