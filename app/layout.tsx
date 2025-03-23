import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/assets/styles/globals.css';

export const metadata = {
    title: 'Property Management',
    description: 'Find your perfect place!',
    keywords: 'rental, property, real estate'
}

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (<html>
    <body>
        <Navbar />
        <main>
            {children}
        </main>
        <Footer />
    </body>
    </html>)
}

export default MainLayout;