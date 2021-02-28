import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "../includes/ReactNavbar";
import Footer from "../includes/ReactFooter";
import Home from "../components/Home";
import News from "../components/News";
import Post from "../components/Post";
import Reviews from "../components/Reviews";
import Contacts from "../components/Contacts";
import Basic from "../components/services/Basic";
import { useEffect } from "react";

function App(props) {
  const fixImageUrl = (url) => {
    return url.replace("images", "static");
  };

  const loader = document.querySelector(".loader");
  const showLoader = () => loader.classList.remove("loader--hide");
  const hideLoader = () => loader.classList.add("loader--hide");

  useEffect(() => hideLoader(), []);

  const truncateText = (str) => {
    return str.length > 50 ? str.substring(0, 50) + "..." : str;
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <div className="App">
      <div className="content">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route
            path="/home"
            render={(props) => (
              <Home
                {...props}
                truncateText={truncateText}
                fixImageUrl={fixImageUrl}
                showLoader={showLoader}
                hideLoader={hideLoader}
              />
            )}
          />
          <Route
            path="/news/:postId"
            render={(props) => (
              <Post
                {...props}
                fixImageUrl={fixImageUrl}
                showLoader={showLoader}
                hideLoader={hideLoader}
              />
            )}
          />
          <Route
            path="/news"
            render={(props) => (
              <News
                {...props}
                truncateText={truncateText}
                fixImageUrl={fixImageUrl}
                showLoader={showLoader}
                hideLoader={hideLoader}
              />
            )}
          />
          <Route
            path="/reviews"
            render={(props) => (
              <Reviews
                {...props}
                getCookie={getCookie}
                showLoader={showLoader}
                hideLoader={hideLoader}
              />
            )}
          />
          <Route
            path="/contacts"
            render={(props) => <Contacts {...props} getCookie={getCookie} />}
          />
          <Route
            path="/services/basic"
            render={(props) => <Basic {...props} getCookie={getCookie} />}
          />
        </Switch>

        
      </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
