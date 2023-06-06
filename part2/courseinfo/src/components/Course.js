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

export default Course
