const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
      {parts.map(p => <Part part={p} key={p.id}/>)}
  </>

const Course = ({ course: { name, parts }}) =>
  <div>
    <Header course={name} />
    <Content parts={parts} />
    <Total sum={parts.reduce((acc,part) => acc + part.exercises, 0)} />
  </div>

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'What is state really',
          exercises: 144,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course course={course} key={course.id} />)}
    </>
  )
}

export default App
