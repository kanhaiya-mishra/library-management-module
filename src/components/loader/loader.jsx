import React from "react";
import "./loader.css";

function Loader(props) {
   return props.showLoader ? (<div className="loading-container"><div className="loader"></div></div>) : null;
}

export default Loader;