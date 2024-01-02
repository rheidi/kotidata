import { useState } from 'react'
import './App.css'
import Electricity from './components/Electricity'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Kotidata</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Electricity />
      </div>
      <p className="read-the-docs">
        All sorts of information.
      </p>
    </main>
  )
}

export default App
