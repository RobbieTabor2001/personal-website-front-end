import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={"Welcome to Robert Tabor's personal website. A Back-End Software"
  + 'Developer based in Boston with a BSc in Computer Science and Economics'
  + 'from Northeastern University. Explore the intersection of technology,'
  + 'software development, and economics'
  + 'through my projects and collaborations.'}
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2><Link to="/">About this site</Link></h2>
          <p>
            Exploring the synergy between software development,
            technology, and economics to build innovative solutions.
          </p>
        </div>
      </header>
      <p>
        I&apos;m Robert Tabor, a passionate Back-End Software Developer from Boston
        with a comprehensive background in Computer Science and Economics from
        Northeastern University. My technical proficiency spans multiple
        programming languages and development tools including Java, C#, Swift,
        Python, JavaScript, and SQL. This site is a portfolio of my journey,
        projects, and professional accomplishments. Feel
        encouraged to explore more
        <Link to="/about"> about me</Link>, glance through my
        <Link to="/resume"> resume</Link>, dive into my
        <Link to="/projects"> projects</Link>, or view
        <Link to="/stats"> site statistics</Link>.
        For collaborations, questions, or just to say hi, don&apos;t hesitate to
        <Link to="/contact"> contact</Link> me at robert.tabor2001@gmail.com.
      </p>
    </article>
  </Main>
);

export default Index;
