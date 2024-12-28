//This recieve all the courses, which is a value in JSON format, meaning it is an array where each value in the array is a dictionary
const Courses = ({courses}) => {
  console.log(courses)
  return (
    <>
      {courses.map((course) => (
        <Course key = {course.id} course = {course} />
      ))}
    </>
  )
}


//Display all the course which each part, the header, content and total
 const Course = ({course}) => {
    return (
      <div>
        <Header course = {course.name} />
        <Content parts = {course.parts} />
        <Total total = {totalExercises(course.parts)} />
    </div>
    )
}
  
  
//Header module which calls the course field
function Header(props) {
    return (
      <h1>
        {props.course}
      </h1>
    );
}

//(I anticiped the correct use of Content)
//This Content module recieve 3 SingleContent and display it with the map function
//in this way it's more general
const Content = (props) => {
return (
    <>
    {props.parts.map((item) => (
        <Part 
        key={item.id} //use it for optimization in map
        part={item.name} 
        exercise={item.exercises} 
        />
    ))}
    </>
);
};


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

//Total Content, this use the other sintaxis to recieve the props, dont use an object props, instead recieve all the separated fields
const Total = ({total}) => {
return (
    <strong>
    Number of exercises {total}
    </strong>
);
}

//totalExercises recieved the parts which it´s an array with objects with a exercises field
// and sum all of them, and by using 'reduce' does'nt matter how many items are in the array
const totalExercises = (parts) => {
return parts.reduce((acc, item) => acc + item.exercises, 0)
}

export default Courses