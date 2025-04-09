import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import {Form, InputGroup, Button} from 'react-bootstrap';

function Footer(){
    const sections = [
        { name: "Home", link: "/" },
        { name: "Destinations", link: "/allDes" },
        { name: "Users", link: "/allUser" }
    ];

    return (
        <div className="container border-top" >
         <hr className="my-20 bold" />
        <footer className="py-5" style={{paddingLeft:"0px", paddingBottom: "0px"}}>
          <div className="row">
            <div className="col-6 col-md-2 mb-3">
              <h5>Section</h5>              
              <ul className="nav flex-column">
              {sections.map((sec, index) => (
                <li key={index} className="nav-item mb-2">
                <a href={sec.link} className="nav-link p-0 text-body-secondary">{sec.name}</a></li>
                ))}
              </ul>
            </div>

            <div className="col-md-7 offset-md-3 mb-3">
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what's new and exciting from us.</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Recipient's email"
                    aria-label="Recipient's email"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="dark">Subscribe</Button>{' '}
            </InputGroup>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© 2025 Company, Inc. All rights reserved.</p>
            <ul className="list-inline">
              <li className="ms-3">
                <a className="link-body-emphasis px-3" href="https://www.linkedin.com/in/raksha-agrawal-ba0924223/">
                  <FaLinkedin size={24} />
                </a>
                <a className="link-body-emphasis px-3" href="https://github.com/Raksha703">
                  <FaGithub size={24} />
                </a>
                <a className="link-body-emphasis px-3" href="https://github.com/Raksha703">
                  <FaInstagram size={24} />
                </a>
              </li>
            </ul>
          </div>


        </footer>
</div>
    );
}

export default Footer;

