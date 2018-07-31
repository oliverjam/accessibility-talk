import React, { Component, Fragment } from 'react';

class Menu extends Component {
  state = {
    open: false,
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

  handleKeyDown = e => {
    if (e.keyCode === 27) this.close();
  };

  render() {
    const { open, highlighted } = this.state;
    return (
      <div onKeyDown={this.handleKeyDown}>
        <button
          aria-haspopup="true"
          aria-expanded={open}
          onClick={this.toggle}
          ref={this.buttonRef}
        >
          Difficulty
          <span aria-hidden="true">&#x25be;</span>
        </button>
        <div role="menu" hidden={!open}>
          <button role="menuitem" tabIndex="-1" ref={this.firstChildRef}>
            Easy
          </button>
          <button role="menuitem" tabIndex="-1">
            Medium
          </button>
          <button role="menuitem" tabIndex="-1">
            Hard
          </button>
        </div>
      </div>
    );
  }
}

export default Menu;
