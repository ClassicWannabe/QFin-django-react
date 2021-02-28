import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import axios from "../axios";
import ReactPagination from "../includes/ReactPagination";
import "./News.css"

function News(props) {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const fetchNews = async () => {
    const req = await axios.get("news-list");
    setNews(req.data);
  };

  const loader = () => {
    props.showLoader();
    fetchNews().then(() => props.hideLoader());
  };

  useEffect(() => loader(), []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <section className="text-center">
          <h4 className="mb-5 mt-3">
            <strong>Последние новости</strong>
          </h4>
          <Row>
            {currentPosts.map((post) => {
              return (
                <Col
                  key={post.pk}
                  lg="4"
                  md="12"
                  className="col-lg-4 col-md-12 mb-4"
                >
                  <Card style={{height:"400px"}}>
                    <div
                      className="bg-image hover-overlay ripple"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src={props.fixImageUrl(post.picture)}
                        className="img-fluid"
                        alt="Not found"
                      />
                      <Link to={"news/" + post.pk}>
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        >
                          {post.date}
                        </div>
                      </Link>
                    </div>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{props.truncateText(post.text)}</Card.Text>
                      <Link to={"news/" + post.pk} className="news-button btn btn-primary">
                        Читать
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <ReactPagination
            postsPerPage={postsPerPage}
            totalPosts={news.length}
            paginate={paginate}
            active={currentPage}
          />
        </section>
      </div>
    </div>
  );
}

export default News;
