import './App.css';

function App() {
  function click(e) {
    console.log("HIs");
    return (null)
  }
  return (
    <>
      <h2>APP</h2>
      <input type="text" />
      <button>add</button>
      <button onClick={click}>clear</button>
    </>

  )

}



export default App;
