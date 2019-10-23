import React from 'react';
import styled from 'styled-components';

const Color = styled.span`
  background: ${props => props.color};
  display: inline-block;
  width: 1em;
  height: 1em;
`;
const Popup = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, 10vw);
  grid-gap: 10px;
  justify-content: center;
  align-content: center;
  align-items: center;
  top: 0;
  right: 0;
  background: #000a;
  font-size: 10vw;
`;

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.colors = [
      '#333',
      '#0d47a1',
      '#e65100',
      '#194d33',
      
    ];
  }
  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
  colorSelected = color => {
    this.props.onColorSelect(color);
    this.toggleOpen();
  };
  render() {
    if (!this.state.isOpen) {
      return <span onClick={this.toggleOpen}>{this.props.children}</span>;
    } else {
      return (
        <Popup>
          {this.colors.map(color => (
            <Color
              key={color}
              color={color}
              onClick={() => this.colorSelected(color)}
            ></Color>
          ))}
        </Popup>
      );
    }
  }
}
export default ColorPicker;
