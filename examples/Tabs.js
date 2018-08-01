import React, { Component } from 'react';
import styled from 'styled-components';

const Tablist = styled.ul`
  display: flex;
  height: 3rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Tabitem = styled.li``;

const Tablink = styled.a`
  display: grid;
  place-items: center;
  height: 3rem;
  padding: 0 1rem;
  font-size: 1.25rem;
  background-color: ${p => p.theme.colors.background};
  color: inherit;
  text-decoration: none;

  &[aria-selected='true'] {
    height: 3.125rem;
    border: 0.125rem solid magenta;
    border-bottom: 0;
  }

  &:focus,
  &:hover {
    outline: 0;
    box-shadow: inset 0 0 0 3px blue;
  }
`;

const Tabpanel = styled.section`
  border: solid 0.125rem magenta;
  padding: 0 1rem;
  font-size: 1.5rem;

  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 3px blue;
  }
`;

class Tabs extends Component {
  state = {
    selected: 0,
  };

  tabs = [React.createRef(), React.createRef(), React.createRef()];
  sections = [React.createRef(), React.createRef(), React.createRef()];

  changeTab = i => e => {
    e.preventDefault();
    this.setState({ selected: i });
  };

  handleKeyDown = e => {
    e.preventDefault();
    switch (e.key) {
      case 'ArrowRight':
        return this.move(1);
      case 'ArrowLeft':
        return this.move(-1);
      case 'ArrowDown':
        return this.sections[this.state.selected].current.focus();
    }
  };

  move = dir => {
    this.setState(
      ({ selected }) => ({
        selected: (selected + dir) % 3,
      }),
      () => this.tabs[this.state.selected].current.focus()
    );
  };

  render() {
    const { selected } = this.state;
    return (
      <div style={{ maxWidth: '50rem' }}>
        <Tablist role="tablist">
          <Tabitem role="presentation">
            <Tablink
              tabIndex={selected === 0 ? null : -1}
              href="#section1"
              role="tab"
              id="tab1"
              aria-selected={selected === 0}
              onClick={this.changeTab(0)}
              onKeyDown={this.handleKeyDown}
              innerRef={this.tabs[0]}
            >
              Section 1
            </Tablink>
          </Tabitem>
          <Tabitem role="presentation">
            <Tablink
              tabIndex={selected === 1 ? null : -1}
              href="#section2"
              role="tab"
              id="tab2"
              aria-selected={selected === 1}
              onClick={this.changeTab(1)}
              onKeyDown={this.handleKeyDown}
              innerRef={this.tabs[1]}
            >
              Section 2
            </Tablink>
          </Tabitem>
          <Tabitem role="presentation">
            <Tablink
              tabIndex={selected === 2 ? null : -1}
              href="#section3"
              role="tab"
              id="tab3"
              aria-selected={selected === 2}
              onClick={this.changeTab(2)}
              onKeyDown={this.handleKeyDown}
              innerRef={this.tabs[2]}
            >
              Section 3
            </Tablink>
          </Tabitem>
        </Tablist>
        <Tabpanel
          id="section1"
          role="tabpanel"
          tabIndex="-1"
          aria-labelledby="tab1"
          hidden={selected !== 0}
          innerRef={this.sections[0]}
        >
          <h2>Section 1</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            euismod, tortor nec pharetra ultricies, ante erat imperdiet velit,
            nec laoreet enim lacus a velit. <a href="#">Nam luctus</a>, enim in
            interdum condimentum, nisl diam iaculis lorem, vel volutpat mi leo
            sit amet lectus. Praesent non odio bibendum magna bibendum accumsan.
          </p>
        </Tabpanel>
        <Tabpanel
          id="section2"
          role="tabpanel"
          tabIndex="-1"
          aria-labelledby="tab2"
          hidden={selected !== 1}
          innerRef={this.sections[1]}
        >
          <h2>Section 2</h2>
          <p>
            Nullam at diam nec arcu suscipit auctor non a erat. Sed et magna
            semper, eleifend magna non, facilisis nisl. Proin et est et lorem
            dictum finibus ut nec turpis. Aenean nisi tortor, euismod a mauris
            a, mattis scelerisque tortor. Sed dolor risus, varius a nibh id,
            condimentum lacinia est. In lacinia cursus odio a aliquam.
          </p>
        </Tabpanel>
        <Tabpanel
          id="section3"
          role="tabpanel"
          tabIndex="-1"
          aria-labelledby="tab3"
          hidden={selected !== 2}
          innerRef={this.sections[2]}
        >
          <h2>Section 3</h2>
          <p>
            Phasellus ac tristique orci. Nulla maximus{' '}
            <a href="">justo nec dignissim consequat</a>. Sed vehicula diam sit
            amet mi efficitur vehicula in in nisl. Aliquam erat volutpat.
            Suspendisse lorem turpis, accumsan consequat consectetur gravida,{' '}
            <a href="#">pellentesque ac ante</a>. Aliquam in commodo ligula, sit
            amet mollis neque. Vestibulum at facilisis massa.
          </p>
        </Tabpanel>
      </div>
    );
  }
}

export default Tabs;
