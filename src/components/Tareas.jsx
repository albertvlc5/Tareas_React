import React from 'react';
import './Tareas.css';
import Tarea from './Tarea.jsx';
import generateID from '../services/generateID.js';

class Tareas extends React.Component {
  constructor(props) {
    super(props);
    const INITIAL = {
      newTaskText: '',
      tasks: [],

    };

    this.state = JSON.parse(localStorage.getItem('TareasState')) || INITIAL;
  }
  saveToLocalStorage() {
    localStorage.setItem('TareasState', JSON.stringify(this.state));
  }
  setStateAndSave = update => {
    this.setState(update, this.saveToLocalStorage);
  };
  deleteTask = id => {
    this.setStateAndSave({
      tasks: this.state.tasks.filter(task => task.id !== id),
    });
  };
  addTask(text) {
    text = text.trim();
    if (text) {
      const newTask = {
        text: text,
        completed: false,
        background: '',
        color: '',
        id: generateID(),
      };

      this.setStateAndSave({
        newTaskText: '',
        tasks: [newTask, ...this.state.tasks],
      });
    }
  }
  toggleCompleteTask = function (task) {
    task.completed = !task.completed;
    this.setState({
      tasks: this.state.tasks.map(item => (item.id === task.id ? task : item)),
    });
  };
  changeTaskColor = (id, color) => {
    this.setStateAndSave({
      tasks: this.state.tasks.map(item => {
        if (item.id === id) {
          item.color = color;
        }
        return item;
      }),
    });
  };


  changeTaskBackground = (id, color) => {
    
    this.setStateAndSave({
      tasks: this.state.tasks.map(item => {
        if (item.id === id) {
          item.background = color;
        }

        return item;
      }),
    });
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.addTask(this.state.newTaskText);
    }
  };


  render() {
    
    return (
      <div className='Tareas'>
        <section className='addTask'>
          <input
            type='text'
            placeholder='📌 Anote sus tareas '
            value={this.state.newTaskText}
            onKeyPress={this.handleKeyPress}
            onChange={event =>

              this.setState({ newTaskText: event.target.value })
            }
          />
          {/* <button onClick={() => this.setState({ newTaskText: '' })}>
            clean
          </button> */}
        </section>
        <main className='taskList'>
          {this.state.tasks.map(task => (
            <Tarea
              key={task.id}
              data={task}
              onComplete={this.toggleCompleteTask.bind(this)}
              onDelete={this.deleteTask}
              onBackgroundChange={this.changeTaskBackground}
              onColorChange={this.changeTaskColor}
            />

          ))}
        </main>
      </div>
    );
  }
}

export default Tareas;
