// Footer.js
import React from "react";
import { IconButton } from "@mui/material";
import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import "./styles.css";

const Footer = ({ currentPage, totalPage, onPageChange }) => {
  const handleFirstPageClick = () => {
    onPageChange(1);
  };

  const handleLastPageClick = () => {
    onPageChange(totalPage);
  };

  const handlePreviousPageClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPageClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <footer className="pagination">
      <IconButton onClick={handleFirstPageClick} disabled={currentPage === 1}>
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handlePreviousPageClick}
        disabled={currentPage === 1}
      >
        <NavigateBefore />
      </IconButton>
      {[...Array(totalPage)].map((_, index) => (
        <IconButton
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          disabled={currentPage === index + 1}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </IconButton>
      ))}
      <IconButton
        onClick={handleNextPageClick}
        disabled={currentPage === totalPage}
      >
        <NavigateNext />
      </IconButton>
      <IconButton
        onClick={handleLastPageClick}
        disabled={currentPage === totalPage}
      >
        <LastPage />
      </IconButton>
    </footer>
  );
};

export default Footer;
