import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  min-width: 20rem;
  position: relative;
`;

const reset = css`
  border: 0;
  padding: 0;
  background: #fff;
  font-size: 1rem;
  font-family: inherit;
  &::-moz-focus-inner {
    border: 0;
  }
`;

const Button = styled.button`
  ${reset};
  padding: 0.5rem 1rem;
  border-radius: 4px;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 3px magenta;
  }
`;

const MenuBox = styled.div`
  position: absolute;
  top: 3rem;
  width: 8rem;
  border-radius: 4px;
`;

const MenuItem = styled.button`
  ${reset};
  height: 48px;
  width: 100%;
  text-transform: capitalize;

  &:first-child {
    border-radius: 4px 4px 0 0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }

  &:hover {
    background-color: #eee;
  }

  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 3px magenta;
  }
`;

class Menu extends Component {
  state = {
    open: false,
    difficulty: 'easy',
  };

  buttonRef = React.createRef();
  firstChildRef = React.createRef();

  open = () => {
    this.setState(
      ({ open }) => ({ open: !open }),
      () => this.firstChildRef.current.focus()
    );
  };

  close = () => {
    this.setState(
      ({ open }) => ({ open: !open }),
      () => this.buttonRef.current.focus()
    );
  };

  toggle = () => (this.state.open ? this.close() : this.open());

  handleItemClick = ({ target }) => {
    this.setState({ difficulty: target.textContent });
    this.close();
  };

  render() {
    const { open, difficulty } = this.state;
    return (
      <Container onKeyDown={({ keyCode }) => keyCode === 27 && this.close()}>
        <Button
          aria-haspopup="true"
          aria-expanded={open}
          onClick={this.toggle}
          innerRef={this.buttonRef}
        >
          Difficulty
          <span aria-hidden="true">{open ? '\u25B2' : '\u25BC'}</span>
        </Button>
        <MenuBox role="menu" hidden={!open}>
          <MenuItem
            role="menuitem"
            tabIndex="-1"
            onClick={this.handleItemClick}
            innerRef={this.firstChildRef}
          >
            easy
          </MenuItem>
          <MenuItem
            role="menuitem"
            tabIndex="-1"
            onClick={this.handleItemClick}
          >
            medium
          </MenuItem>
          <MenuItem
            role="menuitem"
            tabIndex="-1"
            onClick={this.handleItemClick}
          >
            hard
          </MenuItem>
        </MenuBox>
        <p>Difficulty set to: {difficulty}</p>
      </Container>
    );
  }
}

export default Menu;
