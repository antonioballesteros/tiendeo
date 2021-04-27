import Provider from './context/Provider'

import { Cards } from './container'

import './App.scss'

const App = () => {
  return (
    <Provider>
      <div className="app">
        <header>
          <h1>AntonioApp</h1>
        </header>
        <Cards />
      </div>
    </Provider>
  )
}

export default App
