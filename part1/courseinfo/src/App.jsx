import { v4 as uuidv4 } from 'uuid';

//Header module which calls the course field
function Header(props) {
  return (
    <h1>
      {props.course}
    </h1>
  );
}

//this Part module recieve from input the part (string) and the number of exercises (Number)
//this it´s a more a module way (or wrapped way) to abstract the functionality of a Content, instead of
// having only a Content Module which do all the work
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

//(I anticiped the correct use of Content)
//This Content module recieve 3 SingleContent and only display it with map
//in this way it's more general
const Content = (props) => {
  return (
    <>
      {props.parts.map((item, key) => (
        <Part 
          key={key} //use it for optimization in map
          part={item.name} 
          exercise={item.exercises} 
        />
      ))}
    </>
  );
};


//Total Content, this use the other sintaxis to recieve the props, dont use an object props, instead recieve all the separated fields
const Total = ({total}) => {
  return (
    <p>
      Number of exercises {total}
    </p>
  );
}

//totalExercises recieved the parts which it´s an array with objects with a exercises field
// and sum all of them, and by using 'reduce' does'nt matter how many items are in the array
const totalExercises = (parts) => {
  return parts.reduce((acc, item) => acc + item.exercises, 0)
}

const App = () => {
  //Variables keeps in the App Module
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id : uuidv4()
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id : uuidv4()
      },
      {
        name: 'State of a component',
        exercises: 14,
        id : uuidv4()
      }
    ]
  }
  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total total = {totalExercises(course.parts)} />
    </div>
  )
}

export default App