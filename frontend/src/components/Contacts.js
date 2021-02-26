import React, { useState } from "react";
import { Row, Form, Button, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faClock,
  faEnvelopeOpenText,
  faMobileAlt,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Contacts.css";
import axios from "../axios";
import ReactAlert from "../includes/ReactAlert"

function Contacts() {
  const [feedback, setFeedback] = useState({
    email: "",
    name: "",
    text: "",
    errorMsg:{title:"",text:""},
    successMsg:{title:"",text:""},
  });

  const [agreement, setAgreement] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  };

  const handleChecked = () => setAgreement(!agreement);

  const submitFeedback = (e) => {
    e.preventDefault();
    const params = {
      email: feedback.email,
      name: feedback.name,
      text: feedback.text,
      agreement: agreement,
    };

    axios
      .post("feedback/", params)
      .then((res) => {
        if (res.statusText === "Created") {
          setFeedback((prevValues) => {
            return { ...prevValues, successMsg: {title:"Ваше обращение отправлено успешно",text:"Мы свяжемся с Вами в скорое время. Благодарю за терпение!"} };
          });
        } else {
          setFeedback((prevValues) => {
            return { ...prevValues, errorMsg: {title:"Что-то пошло не так...",text:"Попробуйте повторить отправку или сделайте ее позже. Благодарю за понимание!"} };
          });
        }
      })
      .then(() => {
        setAgreement(false);
        setFeedback((prevValues) => {
          return { ...prevValues, text: "" };
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-4">
        
      <Row>
        <Col md="6">
          <h4>Контакты</h4>
          <Col md="12">
            <Table className="borderless">
              <thead>
                <tr>
                  <th>
                    <FontAwesomeIcon
                      className="contacts-icon"
                      icon={faMapMarkerAlt}
                    />
                  </th>
                  <th>Адрес</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>г. Нур-Султан, ул. Петрова 18/2</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md="12">
            <Table className="borderless">
              <thead>
                <tr>
                  <th>
                    <FontAwesomeIcon className="contacts-icon" icon={faClock} />
                  </th>
                  <th>Время работы</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>с 9.00 - 18.30 без выходных</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md="12">
            <Table className="borderless">
              <thead>
                <tr>
                  <th>
                    <FontAwesomeIcon
                      className="contacts-icon"
                      icon={faMobileAlt}
                    />
                  </th>
                  <th>Телефон</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    <a href="tel:87783155223">8(778)315-52-23</a>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md="10">
            <Table className="borderless">
              <thead>
                <tr>
                  <th>
                    <FontAwesomeIcon
                      className="contacts-icon"
                      icon={faEnvelopeOpenText}
                    />
                  </th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    <a href="mailto:info@qfin.kz">info@qfin.kz</a>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md="10">
            <Table className="borderless">
              <thead>
                <tr>
                  <th>
                    <FontAwesomeIcon
                      className="contacts-icon"
                      icon={faFileAlt}
                    />
                  </th>
                  <th>Реквизиты</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    БИН 200340001753 <br />
                    КБЕ 17, БИК TSESKZKA <br />
                    ИИК KZ95998UTB0000540860
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Col>

        <Col md="6">
          <Form onSubmit={submitFeedback}>
            <h4>Обратная связь</h4>
            <Form.Row>
            <Form.Group as={Col} md="12">
            {feedback.successMsg.title !== "" ? (
              <ReactAlert
                message={feedback}
                setSuccess={() =>
                  setFeedback((prevValues) => {
                    return {
                      ...prevValues,
                      successMsg: { title: "", text: "" },
                    };
                  })
                }
              />
            ) : null}
            {feedback.errorMsg.title !== "" ? (
              <ReactAlert
                message={feedback}
                setError={() =>
                  setFeedback((prevValues) => {
                    return { ...prevValues, errorMsg: { title: "", text: "" } };
                  })
                }
              />
            ) : null}
          </Form.Group>
            
              <Form.Group as={Col} md="5" controlId="formFeedbackEmail">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@mail.com"
                  name="email"
                  value={feedback.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="formFeedbackName">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Имя"
                  name="name"
                  value={feedback.name}
                  onChange={handleChange}
                />
              </Form.Group>
            
            <Form.Group as={Col} md="10" controlId="formFeedbackText">
              <Form.Label>Ваше сообщение *</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Текст..."
                name="text"
                value={feedback.text}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="formFeedbackCheckbox">
              <Form.Check
                name="agreement"
                onChange={handleChecked}
                checked={agreement}
                type="checkbox"
                label="Согласие на обработку персональных данных *"
                required
              />
            </Form.Group>
            </Form.Row>

            <Button className="form-button" variant="primary" type="submit">
              Отправить
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Contacts;
