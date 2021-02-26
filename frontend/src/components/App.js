import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../includes/ReactNavbar";
import Footer from "../includes/ReactFooter";
import Home from "../components/Home";
import News from "../components/News";
import Post from "../components/Post";
import Reviews from "../components/Reviews";
import Contacts from "../components/Contacts";
import Basic from "../components/services/Basic";

function App() {
  const fixImageUrl = (url) => {
    return url.replace("images", "static");
  };

  const truncateText = (str) => {
    return str.length > 50 ? str.substring(0, 50) + "..." : str;
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/home" render={props => <Home {...props} truncateText={truncateText} fixImageUrl={fixImageUrl} />} />
          <Route path="/news/:postId" render={props => <Post {...props} fixImageUrl={fixImageUrl} />} />
          <Route path="/news" render={props => <News {...props} truncateText={truncateText} fixImageUrl={fixImageUrl} />} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/services/basic" component={Basic} />
        </Switch>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
