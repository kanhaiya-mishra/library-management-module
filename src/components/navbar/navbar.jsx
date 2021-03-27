import React, { useRef, useEffect, useState } from "react";
import "./navbar.css";
import { useHistory } from 'react-router-dom';

function Navbar(props) {
   const history = useHistory();
   const ref = useRef();

   useEffect(() => {
      // When page is launched, add 'active' class to selected page
      const pathName = history.location.pathname;
      let aElement;
      switch (pathName) {
         case "/search-books":
            aElement = document.querySelector('a[data-href="search-books"]');
            break;
         case "/all-books":
            aElement = document.querySelector('a[data-href="all-books"]');
            break;
         case "/add-book":
            aElement = document.querySelector('a[data-href="add-book"]');
            break;
         default:
            aElement = document.querySelector('a[data-href="search-books"]');
            break;
      }
      if (pathName.includes("/edit-book/")) {
         return;
      }
      if (aElement) {
         aElement.classList.add("active");
      }
   })

   function onNavClick(event) {
      // On click, remove 'active' class from previously selected element and add to new
      let eventTarget = event.target;
      if (eventTarget.tagName === "A") {
         // Remove active class
         let ulRef = ref.current;
         const allA = ulRef.querySelectorAll("a");
         allA.forEach((a) => {
            a.classList.remove("active");
         })
         // Add active class to currently clicked element
         eventTarget.classList.add("active");
         history.push(`/${eventTarget.dataset.href}`);
      }
      event.stopPropagation();
   }

   if (!props.showNavbar) {
      return null;
   } else {
      return (
         <nav id="navbar">
            <ul ref={ref} onClick={onNavClick}>
               <li><a data-href="all-books">All books</a></li>
               <li><a data-href="add-book">Add book</a></li>
               <li><a data-href="search-books">Search books</a></li>
               {/* <li><a data-href="edit-book">Edit book</a></li> */}
            </ul>
         </nav>
      );
   }

}

export default Navbar;