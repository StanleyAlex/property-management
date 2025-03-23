import React from 'react';
import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <InfoBoxes />
            <HomeProperties />
        </>
    )
}

export default HomePage;