import React, { Component } from 'react';
import GitHub from './GitHub';
import GitHubUser from './GitHubUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useParams } from "react-router-dom"
import { Nav } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
export default App;
class Header extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/github">GitHub</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>

          <Routes>

            <Route path="/github" element={<GitHub />} />
            <Route path="/github/user/:login/:id" element={<GitHubUser />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/contact" element={<Contact />} />

          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}
class Home extends Component {
  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}
class NotFound extends Component {
  render() {
    return <div>Not Found</div>
  }
}
class Contact extends Component {
  render() {
    return <div>Contact us here!</div>
  }
}
