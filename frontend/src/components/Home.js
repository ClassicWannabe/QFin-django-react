import React, { useEffect, useState } from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";
import image1 from "../images/home1.jpg";
import image2 from "../images/home2.png";
import image3 from "../images/home3.jpg";
import axios from "../axios";

function Home(props) {
  const [index, setIndex] = useState(0);
  const [news, setNews] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  async function fetchNews() {
    const req = await axios.get("home-news-list/");
    setNews(req.data);
  }

  useEffect(() => fetchNews(), []);

  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className="home-slides">
          <img className="d-block w-100" src={image1} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="home-slides">
          <img className="d-block w-100" src={image2} alt="Second slide" />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="home-slides">
          <img className="d-block w-100" src={image3} alt="Third slide" />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container>
        <Row className="mb-2 mt-5">
          {news.map((post, index) => {
            return (
              <Col key={index} md="6">
                <Row className="g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <Col className="p-4 d-flex flex-column position-static">
                    <h3 className="mb-0">{post.title}</h3>
                    <div className="mb-1 text-muted">{post.date}</div>
                    <p className="card-text mb-auto">
                      {props.truncateText(post.text)}
                    </p>
                    <Link to={"news/" + post.pk} className="stretched-link">
                      Продолжить читать
                    </Link>
                  </Col>
                  <Col className="col-auto d-none d-lg-block">
                    <img
                      style={{ zIndex: "100" }}
                      width="200"
                      height="250"
                      src={props.fixImageUrl(post.picture)}
                      alt="Not found"
                    />
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
