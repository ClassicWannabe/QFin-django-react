import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import axios from "../axios";

function News(props) {
  const [news, setNews] = useState([]);

  async function fetchNews() {
    const req = await axios.get("news-list");
    setNews(req.data);
  }
  console.log(news);

  useEffect(() => fetchNews(), []);

  return (
    <div>
      <div className="container">
        <section className="text-center">
          <h4 className="mb-5 mt-3">
            <strong>Последние новости</strong>
          </h4>
          <Row>
            {news.map((post, index) => {
              return (
                <Col
                  key={index}
                  lg="4"
                  md="12"
                  className="col-lg-4 col-md-12 mb-4"
                >
                  <Card>
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
                      <Link to={"news/" + post.pk} className="btn btn-primary">
                        Читать
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </section>

        {/* <nav className="my-4" aria-label="...">
          <ul className="pagination pagination-circle justify-content-center">
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item active" aria-current="page">
              <a className="page-link" href="#">
                2 <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    </div>
  );
}

export default News;
