import React from "react";
import { Pagination } from "react-bootstrap";

function ReactPagination(props) {
  const items = [];

  for (
    let number = 1;
    number <= Math.ceil(props.totalPosts / props.postsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => props.paginate(number)}
        active={number === props.active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default ReactPagination;
