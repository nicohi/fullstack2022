const Test = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}
const App = () => {
  console.log('Hello from component')
  return (
    <Test name="sus"/>
  )
}

export default App
