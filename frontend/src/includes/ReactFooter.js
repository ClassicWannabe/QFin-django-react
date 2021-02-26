import React from "react";
import './ReactFooter.css'
import logo from "../images/QFin.png";

function ReactFooter() {
  return (
    <div>
      <footer className="page-footer mt-5">
        <hr className="my-4" />

        <div className="pb-4">
        <img src={logo} alt="Logo" />
        </div>

        <div className="footer-copyright py-3">
          © 2021 Copyright: 
          <a
            href="http://tst.qfin.kz/"
            target="_blank"
          >
            &nbsp;tst.qfin.kz
          </a>
        </div>
      </footer>
    </div>
  );
}

export default ReactFooter;
