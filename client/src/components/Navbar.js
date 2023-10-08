import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

const StyledNav = styled.nav`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  li {
    font-size: 1rem;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #ff9900;
    }
  }

  .menu-icon {
    cursor: pointer;
    font-size: 1.5rem;
  }
`;

function Navbar() {
  const [menu, setMenu] = useState(false);

  return (
    <StyledNav>
      <Logo>Event App</Logo>
      <Menu>
        {!menu ? (
          <div className="menu-icon" onClick={() => setMenu(!menu)}>
            <GiHamburgerMenu />
          </div>
        ) : (
          <ul>
            <li onClick={() => setMenu(!menu)}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => setMenu(!menu)}>
              <Link to="/events">Events</Link>
            </li>
            <li onClick={() => setMenu(!menu)}>
              <Link to="/registration">Registration</Link>
            </li>
            {/* Add more navigation links for other routes */}
          </ul>
        )}
      </Menu>
    </StyledNav>
  );
}

export default Navbar;


