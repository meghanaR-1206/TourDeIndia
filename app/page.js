"use client"
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import Footer from './components/Footer'

// Import the dynamic function
import dynamic from 'next/dynamic';

// Dynamically import the component and disable SSR
const Home = dynamic(() => import('./components/Home'), {
  ssr: false, // Disable server-side rendering
});
const Navbar = dynamic(() => import('./components/Navbar'), {
  ssr: false, // Disable server-side rendering
});
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