import React, { useState } from "react";
import "./ReactNavbar.css";
import {
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/QFin.png";

function ReactNavbar() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const showDropdown = () => {
    setShow(true);
  };

  const hideDropdown = () => {
    setShow(false);
  };

  const showSubMenu = () => {
    setShow1(true);
  };
  const hideSubMenu = () => {
    setShow1(false);
  };

  return (
    <div className="home-navbar">
      <Navbar bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand to="/home" as={Link}>
            <img className="logo" src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link to="/home" as={Link}>
                Главная
              </Nav.Link>
              <Nav.Link to="/news" as={Link}>
                Новости
              </Nav.Link>
              <Nav.Link to="/reviews" as={Link}>
                Отзывы
              </Nav.Link>
              <Nav.Link to="/contacts" as={Link}>
                Контакты
              </Nav.Link>
              <NavDropdown
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
                title="Услуги"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <NavDropdown
                    drop="left"
                    show={show1}
                    onMouseEnter={showSubMenu}
                    onMouseLeave={hideSubMenu}
                    title="Автоматизация финансовой деятельности ГУ, ГККП"
                  >
                    <NavDropdown.Item to="/services/basic" as={Link}>
                      Тариф "Старт"
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Тариф "Бухгалтерия"
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Тариф "Закупки"
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Тариф "Госфинансы"
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Тариф "Комплекс"
                    </NavDropdown.Item>
                  </NavDropdown>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">
                  Юридические услуги
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">
                  Разработка информационных систем программного обеспечения
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Организация тренингов, обучающих семинаров
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default ReactNavbar;
