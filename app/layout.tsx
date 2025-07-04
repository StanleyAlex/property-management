import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GlobalProvider } from '@/context/GlobalContext';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
    title: 'Property Management',
    description: 'Find your perfect place!',
    keywords: 'rental, property, real estate'
}

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
      <AuthProvider>
        <GlobalProvider>
            <html>
                <body>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <ToastContainer />
                    <Footer />
                </body>
            </html>
        </GlobalProvider>
      </AuthProvider>)
}

export default MainLayout;