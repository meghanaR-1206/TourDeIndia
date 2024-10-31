"use client"
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';

// Dynamically import the component and disable SSR
const Navbar = dynamic(() => import('../components/Navbar.jsx'), {
  ssr: false, // Disable server-side rendering
});
import store from '../redux/store';
import { Provider } from 'react-redux'
export default function RootLayout({ children }) {
    return (
        <>
            <Provider store={store}>
                <Navbar />

                <section className='min-h-screen '>
                {children}
                </section>
                <Footer />
            </Provider>

        </>

    );
}