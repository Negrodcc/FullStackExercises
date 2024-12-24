import { v4 as uuidv4 } from 'uuid';

//Header module which calls the course field
function Header(props) {
  return (
    <h1>
      {props.course}
    </h1>
  );
}

//this SingleContent module recieve from input the part (string) and the number of exercises (Number)
//this it´s a more a module way (or wrapped way) to abstract the functionality of a Content, instead of
// having only a Content Module which do all the work
const SingleContent = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

//This Content module recieve 3 SingleContent and only display it with map
//in this way it's more general
const Content = (props) => {
  return (
    <>
      {props.parts.map((item, key) => (
        <SingleContent 
          key={key} //use it for optimization in map
          part={item.part} 
          exercise={item.exercise} 
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


const App = () => {
  //Variables keeps in the App Module
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  //for render the Content module, we need to pass the parts array with the 3 SingleContent
  const parts = [
    { part: 'Fundamentals of React', exercise: 10 },
    { part: 'Using props to pass data', exercise: 7 },
    { part: 'State of a component', exercise: 14 }
  ];
  // Add a unique id to each item in the parts array, to optimize the map function in the Content module
  const partsWithId = parts.map((item) => ({
    ...item,
    id: uuidv4()
  }));  

  return (
    <div>
      <Header course = {course} />
      <Content parts = {partsWithId} />
      <Total total = {exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App