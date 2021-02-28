import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import axios from "../../axios";
import ReactAlert from "../../includes/ReactAlert";
import "./Basic.css";

function Basic(props) {
  const [application, setApplication] = useState({
    name: "",
    email: "",
    text: "",
    type: "B",
    successMsg: { title: "", text: "" },
    errorMsg: { title: "", text: "" },
  });

  const [agreement, setAgreement] = useState(false);
  const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleChecked = () => setAgreement(!agreement);

  const handlePhoneChange = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const submitApplication = (e) => {
    e.preventDefault();

    const params = {
      email: application.email,
      name: application.name,
      text: application.text,
      phone: phone,
      agreement: agreement,
      service_type: application.type,
    };

    const csrftoken = props.getCookie("csrftoken");
    const config = {
      headers: {
        "X-CSRFToken": csrftoken,
      },
    };

    axios
      .post("service/", params, config)
      .then((res) => {
        if (res.statusText === "Created") {
          setApplication((prevValues) => {
            return {
              ...prevValues,
              successMsg: {
                title: "Ваш запрос был отправлен успешно",
                text:
                  "Мы постараемся связаться с Вами как можно скорее. Спасибо за терпение!",
              },
            };
          });
        } else {
          setApplication((prevValues) => {
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
      .then(() => {
        setAgreement(false);
        setApplication((prevValues) => {
          return { ...prevValues, text: "" };
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="service">
      <Container>
        <h4 className="mt-4">Тариф "Старт"</h4>
        <p className="services-description">
          Равным образом новая модель организационной деятельности в
          значительной степени обуславливает создание форм развития.
          Разнообразный и богатый опыт реализация намеченных плановых заданий
          играет важную роль в формировании системы обучения кадров,
          соответствует насущным потребностям. Равным образом реализация
          намеченных плановых заданий позволяет оценить значение систем
          массового участия. Товарищи! начало повседневной работы по
          формированию позиции представляет собой интересный эксперимент
          проверки новых предложений. Таким образом дальнейшее развитие
          различных форм деятельности в значительной степени обуславливает
          создание дальнейших направлений развития. Идейные соображения высшего
          порядка, а также реализация намеченных плановых заданий обеспечивает
          широкому кругу (специалистов) участие в формировании направлений
          прогрессивного развития.
        </p>
        <p className="services-description">
          С другой стороны консультация с широким активом представляет собой
          интересный эксперимент проверки модели развития. Значимость этих
          проблем настолько очевидна, что постоянный количественный рост и сфера
          нашей активности представляет собой интересный эксперимент проверки
          модели развития. Товарищи! начало повседневной работы по формированию
          позиции позволяет выполнять важные задания по разработке дальнейших
          направлений развития. С другой стороны консультация с широким активом
          обеспечивает широкому кругу (специалистов) участие в формировании
          системы обучения кадров, соответствует насущным потребностям.
        </p>

        <Form onSubmit={submitApplication}>
          <h4>Оформить заявку</h4>
          <Form.Row>
            <Form.Group as={Col} md="12">
              {application.successMsg.title !== "" ? (
                <ReactAlert
                  message={application}
                  setSuccess={() =>
                    setApplication((prevValues) => {
                      return {
                        ...prevValues,
                        successMsg: { title: "", text: "" },
                      };
                    })
                  }
                />
              ) : null}
              {application.errorMsg.title !== "" ? (
                <ReactAlert
                  message={application}
                  setError={() =>
                    setApplication((prevValues) => {
                      return {
                        ...prevValues,
                        errorMsg: { title: "", text: "" },
                      };
                    })
                  }
                />
              ) : null}
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="ФИО *"
                name="name"
                value={application.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="formBasicEmail">
              <Form.Control
                type="tel"
                pattern="^\(7|8)[0-9]{10}$"
                placeholder="Телефон *"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="example@mail.com *"
                name="email"
                value={application.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} md="9" controlId="formBasicText">
              <Form.Label>Ваше сообщение *</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Текст..."
                name="text"
                value={application.text}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="9" controlId="formBasicCheckbox">
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
      </Container>
    </div>
  );
}

export default Basic;
