import './App.css';
import './Firebase.js';

function App() {
  return (
    <div className="App">
      <form>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;