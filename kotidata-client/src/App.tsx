import './styles/App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Clock from './components/Clock'
import Electricity from './components/Electricity'

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <aside>
        <Clock />
      </aside>
      <main>
        <div className='middleStuff'>
          <Electricity />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
