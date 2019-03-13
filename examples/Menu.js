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
  /* border: 2px solid; */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
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
    index: 0,
  };

  buttonRef = React.createRef();
  firstChildRef = React.createRef();
  childRefs = [React.createRef(), React.createRef(), React.createRef()];

  open = () => {
    this.setState(
      ({ open }) => ({ open: !open }),
      () => this.childRefs[0].current.focus()
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

  handleKeyDown = ({ key }) => {
    console.log(key);
    switch (key) {
      case 'Escape':
        this.close();
      case 'ArrowUp':
        return this.setState(
          prevState => ({ index: (prevState.index - 1 + 3) % 3 }),
          () => this.childRefs[this.state.index].current.focus()
        );
      case 'ArrowDown':
        return this.setState(
          prevState => ({ index: (prevState.index + 1) % 3 }),
          () => this.childRefs[this.state.index].current.focus()
        );
    }
  };

  render() {
    const { open, difficulty } = this.state;
    return (
      <Container onKeyDown={this.handleKeyDown}>
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
            innerRef={this.childRefs[0]}
          >
            easy
          </MenuItem>
          <MenuItem
            role="menuitem"
            tabIndex="-1"
            onClick={this.handleItemClick}
            innerRef={this.childRefs[1]}
          >
            medium
          </MenuItem>
          <MenuItem
            role="menuitem"
            tabIndex="-1"
            onClick={this.handleItemClick}
            innerRef={this.childRefs[2]}
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
