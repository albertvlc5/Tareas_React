import React from 'react';
import './Tarea.scss';
import ColorPicker from './ColorPicker.jsx';
import { SketchPicker } from 'react-color';

class Tarea extends React.Component {
  state = {
    showPicker: false,
  }
  imprimirColor(color) {
    this.togglePicker();
  }
  togglePicker = () => this.setState({ showPicker: !this.state.showPicker })
  // eliminar = () => {this.props.onDelete(this.props.data.id)} 

  render() {

    return (
      <div
        className={`Tarea ` + (this.props.data.completed ? 'completed' : '')}
        style={{ borderColor: this.props.data.color, background: this.props.data.background }}
      >

        <span className='text'> {this.props.data.text}</span>
        <div className='actions'>

          <img src="lax.png" onClick={(props) => this.props.onDelete(this.props.data.id)} />
          <img src="tickok.png" onClick={() => this.props.onComplete(this.props.data)}/>

          {/* <SketchPicker
            color={this.props.data.background}
            onChangeComplete={(color) => this.props.onBackgroundChange(this.props.data.id, color.hex)}
          //onChangeComplete={(color) => console.log(color.hex)}
          >
            <button>Fondo</button>
          </SketchPicker> */}

          <ColorPicker
            color={this.props.data.color}
            onColorSelect={color => this.props.onColorChange(this.props.data.id, color)}
          >
            <img src="cuadrado.png"/>
          </ColorPicker>

          <img onClick = { this.togglePicker } src="pincel.png" />

         <div className="color-picker">
         { this.state.showPicker && <SketchPicker
            color={this.props.data.background}
            onChangeComplete={(color) =>  { this.props.onBackgroundChange(this.props.data.id, color.hex)} }

            />
          }
         </div>


        </div>
      </div>
    );


  }


}

export default Tarea;
