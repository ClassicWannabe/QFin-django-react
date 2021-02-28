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

  async function fetchHomeNews() {
    const req = await axios.get("home-news-list/");
    setNews(req.data);
  }

  const loader = () => {
    props.showLoader();
    fetchHomeNews().then(() => props.hideLoader());
  };

  useEffect(() => loader(), []);

  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className="home-slides">
          <img className="d-block w-100" src={image1} alt="First slide" />
          <Carousel.Caption>
            <h3>Работаем мы - зарабатываете Вы!</h3>
            <p>Воспользуйтесь нашими потрясающими услугами</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="home-slides">
          <img  className="d-block w-100" src={image2} alt="Second slide" />

          <Carousel.Caption>
            <h3>ТОП-команда сотрудников!</h3>
            <p>В нашем организации работают люди с многолетним стажом</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="home-slides">
          <img className="d-block w-100" src={image3} alt="Third slide" />

          <Carousel.Caption>
            <h3>Применение передовых технологий!</h3>
            <p>
            Использование разработок, признанных мировыми компаниями
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container>
        <h2 className="mt-5">Статьи и новости</h2>
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
                      width="250"
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
