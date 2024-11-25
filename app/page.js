"use client";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import Footer from "./components/Footer";

// Import the dynamic function
import dynamic from "next/dynamic";

// Dynamically import the component and disable SSR
const Home = dynamic(() => import("./components/Home"), {
  ssr: false, // Disable server-side rendering
});
const Navbar = dynamic(() => import("./components/Navbar"), {
  ssr: false, // Disable server-side rendering
});
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow px-4 sm:px-8 lg:px-16">
          <Home />
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
