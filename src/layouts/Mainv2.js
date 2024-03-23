import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navigation from '../components/Template/Navigation';
import ScrollToTop from '../components/Template/ScrollToTop';

const Mainv2 = ({ children, title, description }) => (
  <HelmetProvider>
    <ScrollToTop />
    <Helmet titleTemplate="%s | Robert Tabor" defaultTitle="Robert Tabor" defer={false}>
      {title && <title>{title}</title>}
      <meta name="description" content={description} />
    </Helmet>

    <div id="wrapperV2">
      <Navigation />
      <div id="main">
        {children}
      </div>
    </div>
  </HelmetProvider>
);

Mainv2.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
  description: PropTypes.string,
};

Mainv2.defaultProps = {
  children: null,
  title: null,
  description: "Robert Tabor's personal website.",
};

export default Mainv2;
