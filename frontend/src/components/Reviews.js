import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Card, Form, Button, Col, Collapse } from "react-bootstrap";
import "./Reviews.css";
import ReactAlert from "../includes/ReactAlert";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    author: "",
    email: "",
    text: "",
    successMsg: { title: "", text: "" },
    errorMsg: { title: "", text: "" },
  });

  async function fetchNews() {
    const req = await axios.get("reviews-create-list");
    setReviews(req.data);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitReview = (e) => {
    e.preventDefault();

    axios
      .post("reviews-create-list/", newReview)
      .then((res) => {
        if (res.statusText === "Created") {
          setNewReview((prevValues) => {
            return {
              ...prevValues,
              successMsg: {
                title: "Отзыв был отправлен успешно",
                text:
                  "Администратор должен проверить Ваш отзыв. Спасибо за отзыв!",
              },
            };
          });
        } else {
          setNewReview((prevValues) => {
            return {
              ...prevValues,
              errorMsg: {
                title: "Что-то пошло не так...",
                text:
                  "Попробуйте повторить отправку или сделайте ее позже. Благодарю за понимание!",
              },
            };
          });
        }
      })
      .then(() =>
        setNewReview((prevValues) => {
          return { ...prevValues, author: "", text: "" };
        })
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchNews(), []);

  return (
    <div className="container">
      <h4 className="mb-5 mt-3">
        <strong>Отзывы</strong>
      </h4>
      {reviews.map((review, index) => {
        return (
          <Card key={index} className="mb-3">
            <Card.Header>{review.author}</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p> {review.text} </p>
                <footer className="blockquote-footer">
                  Отправлено <cite title="Source Title">{review.date}</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        );
      })}

      <Form className="mr-10 ml-10" onSubmit={submitReview}>
        <h5 className="form-title">Оставьте свой отзыв здесь</h5>
        <Form.Row>
          <Form.Group as={Col} md="12">
            {newReview.successMsg.title !== "" ? (
              <ReactAlert
                message={newReview}
                setSuccess={() =>
                  setNewReview((prevValues) => {
                    return {
                      ...prevValues,
                      successMsg: { title: "", text: "" },
                    };
                  })
                }
              />
            ) : null}
            {newReview.errorMsg.title !== "" ? (
              <ReactAlert
                message={newReview}
                setError={() =>
                  setNewReview((prevValues) => {
                    return { ...prevValues, errorMsg: { title: "", text: "" } };
                  })
                }
              />
            ) : null}
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="formGridEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@mail.com"
              name="email"
              value={newReview.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="formGridName">
            <Form.Label>Имя*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Имя"
              name="author"
              value={newReview.author}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="formGridText">
            <Form.Label>Ваш отзыв*</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Текст..."
              name="text"
              value={newReview.text}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form.Row>

        <Button className="form-button" variant="primary" type="submit">
          Отправить
        </Button>
      </Form>
    </div>
  );
}

export default Reviews;
