import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import StudentArrowFunction, { StudentClass, StudentFunction } from './Student';
import ClickCounter from './ClickCounter';
import RegistrationForm from './RegistrationForm';

class App extends Component {
  state = {
    students: [
      {
        id: 1,
        name: "Jared Kushner",
        address: {
          street: "123 Main Street",
          city: "Washington",
          state: "DC",
          zip: "11111"
        },
        grades: [95, 87, 92]
      },
      {
        id: 2,
        name: "Ivanka Kushner",
        address: {
          street: "123 Main Street",
          city: "Washington",
          state: "DC",
          zip: "11111"
        },
        grades: [96, 86, 93]
      }
    ]
  };

  getStudents() {
    //return this.state.students.map(student => <StudentFunction student={student} />);
    return this.state.students.map(student => <StudentArrowFunction key={student.id} student={student} />);
  }

  render() {
    // const students = this.state.students.map(student => <StudentFunction student={student} />);

    return (
      <div className="App">
        <header className="App-header">
          <ClickCounter />
          <RegistrationForm />
          <Clock />
          <StudentClass name="Donald Trump" address="1600 Pennsylvania Ave Washington DC 11111" />
          {/*<StudentFunction student={this.state.students[0]} />
          <StudentFunction student={this.state.students[1]} />}

          {
            this.state.students.map(student => <StudentFunction student={student} />)
          }

          {students*/}

          {this.getStudents()}
        </header>
      </div>
    );
  }
}

export default App;
