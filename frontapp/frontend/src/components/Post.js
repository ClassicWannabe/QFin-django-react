import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "../axios";

function Post(props) {
  const pk = props.match.params.postId;
  const [post, setPost] = useState({ picture: "" });

  const getPost = async () => {
    const req = await axios.get(`get-post/${pk}`);
    setPost(req.data);
  }

  const loader = () => {
    props.showLoader();
    getPost().then(() => props.hideLoader());
  };

  useEffect(() => loader(), []);

  return (
    <div>
      <Container>
        <img
          className="mt-4"
          height="500"
          alt="Not Found"
          src={props.fixImageUrl(post.picture)}
        />
        <h4 className="mt-4">{post.title}</h4>
        <p className="services-description">{post.text}</p>
      </Container>
    </div>
  );
}

export default Post;
