import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "../axios";

function Post(props) {
  const pk = props.match.params.postId;
  const [post, setPost] = useState({picture:""});
    console.log(post.picture)
  async function getPost() {
    const req = await axios.get(`get-post/${pk}`);
    setPost(req.data);
  }

  useEffect(() => getPost(), []);

  return (
    <div>
      <Container>
        <img className="mt-4" height="500" src={props.fixImageUrl(post.picture)} />
        <h4 className="mt-4">{post.title}</h4>
        <p className="services-description">{post.text}</p>
      </Container>
    </div>
  );
}

export default Post;
