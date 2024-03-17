import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>Robert Tabor</h2>
        <p><a href="mailto:robert.tabor2001@gmail.com">robert.tabor2001@gmail.com</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m <strong>Robert Tabor</strong>, a
        <a href="https://northeastern.edu"> Northeastern University</a> grad with
        a passion for blending software engineering and economics to create
        innovative solutions. My experience ranges from developing a full-stack
        iOS application, <strong>Pocket Closet</strong>, to running a
        successful <strong>vintage clothing business</strong>. I
        thrive on tackling complex problems, whether in technology,
        e-commerce, or exploring new software to streamline operations.
        Outside of work, I love soccer, skiing, and the hunt for vintage
        finds. Connect with me at <a href="mailto:robert.tabor2001@gmail.com">
        robert.tabor2001@gmail.com
        </a>.
      </p>

      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/about" className="button">About Me</Link>}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
    </section>
  </section>
);

export default SideBar;
