import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import "./app.css";

import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import Search from "./views/search/search";
import AllBooks from "./views/all-books/all-books";
import AddBook from "./views/add-book/add-book";
import EditBook from "./views/edit-book/edit-book";

const NotFoundRedirect = () => <Redirect to='/all-books' />

class App extends Component {

   constructor(props) {
      super(props);
      this.state = {
         showNavbar: true
      }
   }

   componentDidMount() {
      this.onRouteChanged();
   }

   componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
         this.onRouteChanged();
      }
   }

   onRouteChanged() {
      // Hide navbar if user is on edit book page
      if (this.props.location.pathname.includes("/edit-book")) {
         this.setState({
            showNavbar: false
         });
      } else {
         this.setState({
            showNavbar: true
         });
      }
   }

   render() {
      return (
         <React.Fragment>
            <Header></Header>
            <section id="main-section">
               <Navbar showNavbar={this.state.showNavbar} />
               <section
                  className={this.state.showNavbar ? "app-components" : "app-components full-width"}
               >
                  <Switch>
                     <Route exact path="/all-books" component={AllBooks} />
                     <Route exact path="/add-book" component={AddBook} />
                     <Route exact path="/search-books" component={Search} />
                     <Route path="/edit-book/:bookId" component={EditBook} />
                     <Route component={NotFoundRedirect} />
                  </Switch>
               </section>
            </section>
            <Footer></Footer>
         </React.Fragment>
      );
   }
}

export default withRouter(App);