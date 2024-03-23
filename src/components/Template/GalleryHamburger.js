// FixedSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../data/routes';
import ContactIcons from '../Contact/ContactIcons'

const FixedSidebar = () => {
  return (
    <div className="sidebar-container">
      <h1 className= "sidebar-name">Robert Tabor</h1>
      <nav className="sidebar-navigation">
        <ul className="sidebar-ul">
          {routes.map((route) => (
            <li key={route.label} className="sidebar-item">
              <NavLink to={route.path} activeclassname="active-link">
                <h3>{route.label}</h3>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-icons">
        <ContactIcons></ContactIcons>
      </div>
    </div>
  );
};

export default FixedSidebar;
