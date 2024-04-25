import React, { Component } from 'react';
import Products from './Products';
import Rating from "./Rating";
import { Button } from "react-bootstrap";
class App extends Component {
  formatName(user){
    return user.firstName + " " + user.lastName;
  }

  render() {
    const user = {
      firstName: "James",
      lastName: "Nevin"
    };
    return (
      <div>
        <h1>Hello, {this.formatName(user)}</h1>
        <Products />
        <Button variant="primary" disabled>Default</Button>
        <Rating rating="1"/>
        <Rating rating="2"/>
        <Rating rating="3"/>
        <Rating rating="4"/>
        <Rating rating="5"/>
      </div>
    );
  }
  // render() {
  //   return (
  //     <div>
  //       <h1>My Second React App!</h1>
  //       <Products />

  //     </div>
  //   );
  // }
}
export default App;
