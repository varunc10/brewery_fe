import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Table, Divider, Button } from "antd";

const BreweryInfo = () => {
  const [breweryInfo, setBreweryInfo] = useState({});
  const { breweryId } = useParams();
  const [reviews, setReviews] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [newReview, setNewReview] = useState({
    username: userData.username,
    rating: 1,
    description: "",
  });
  const [isAddingReview, setIsAddingReview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const breweryResponse = await axios.get(
          `https://brewerybe-production.up.railway.app/brewery/${breweryId}`
        );
        setBreweryInfo(breweryResponse.data);

        const reviewsResponse = await axios.get(
          `https://brewerybe-production.up.railway.app/reviews/${breweryId}`
        );
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [breweryId]);

  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const data = [
    { key: "1", field: "Name", value: breweryInfo.name },
    { key: "2", field: "Address", value: breweryInfo.address_1 },
    { key: "3", field: "City", value: breweryInfo.city },
    { key: "4", field: "State", value: breweryInfo.state_province },
    { key: "5", field: "Postal Code", value: breweryInfo.postal_code },
    { key: "6", field: "Country", value: breweryInfo.country },
    { key: "7", field: "Phone", value: breweryInfo.phone },
    {
      key: "8",
      field: "Website",
      value: (
        <a
          href={breweryInfo.website_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {breweryInfo.website_url}
        </a>
      ),
    },
    { key: "9", field: "Brewery Type", value: breweryInfo.brewery_type },
  ];

  const handleAddReviewClick = () => {
    setIsAddingReview(true);
  };

  const handleSubmitReview = async () => {
    try {
      await axios.post(
        `https://brewerybe-production.up.railway.app/reviews/${breweryId}`,
        newReview
      );
      const reviewsResponse = await axios.get(
        `https://brewerybe-production.up.railway.app/reviews/${breweryId}`
      );
      setReviews(reviewsResponse.data);
      setNewReview({
        username: userData.username,
        rating: 1,
        description: "",
      });

      setIsAddingReview(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>
      <Button
        style={{ position: "absolute", top: "6%", left: "3%" }}
        type="primary"
        onClick={() => navigate("/home")}
      >
        Home
      </Button>
      <h2>{breweryInfo.name}</h2>
      <Table columns={columns} dataSource={data} pagination={false} />

      <Divider />

      {isAddingReview ? (
        <>
          <h3>Add Review:</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <input
              style={{ maxWidth: "10rem" }}
              type="range"
              min="0"
              max="5"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
            />
            <textarea
              rows={8}
              value={newReview.description}
              onChange={(e) =>
                setNewReview({ ...newReview, description: e.target.value })
              }
              placeholder="Enter your review here..."
            />
            <Button
              type="primary"
              onClick={handleSubmitReview}
              style={{ maxWidth: "10rem" }}
            >
              Submit Review
            </Button>
          </div>
        </>
      ) : (
        <Button type="primary" onClick={handleAddReviewClick}>
          Add Review
        </Button>
      )}
      <h3>Reviews:</h3>
      {reviews.map((review) => (
        <div
          key={review._id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p style={{ fontWeight: "bold" }}>Username: {review.username}</p>
          <p style={{ fontWeight: "bold" }}>Rating: {review.rating}</p>
          <p style={{ fontStyle: "italic" }}>
            Description: {review.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BreweryInfo;
