import React from "react";
import Pagination from "react-bootstrap/Pagination";

interface SimplePaginationProps {
  itemsPerPage: number;
  totalItems: number;
  activePage: number;
}

const SimplePagination = (props: SimplePaginationProps) => {
  let active = props.activePage;
  const pageNumbers = [];

  for (
    let page = 1;
    page <= Math.ceil(props.totalItems / props.itemsPerPage);
    page++
  ) {
    pageNumbers.push(
      <Pagination.Item key={page} active={page === active} onClick={()=>{}}>
        {page}
      </Pagination.Item>
    );
  }

  let pagination;
  if (pageNumbers.length < 100000000) {
    pagination = (
      <div>
        <Pagination.Prev />
        <Pagination>{pageNumbers}</Pagination>
        <Pagination.Next />
      </div>
    );
  } else {

    pagination = (
      <div>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination></Pagination>
        <Pagination.Ellipsis />
        <Pagination>{pageNumbers}</Pagination>
        <Pagination.Ellipsis />
        <Pagination></Pagination>
        <Pagination.Next />
        <Pagination.Last />
      </div>
    );
  }
  return pagination;
};


export default SimplePagination;
