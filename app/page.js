"use client"
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'

import store from './redux/store'
import { Provider } from 'react-redux'
function App() {


  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Home />
        <Footer />
      </Provider>
      
    </>
  )
}

export default App