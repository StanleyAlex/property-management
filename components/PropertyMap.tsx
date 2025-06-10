'use client';

// import { setDefaults, fromAddress } from 'react-geocode';
// import Map, { Marker } from 'mapbox-gl';
// import Image from 'next/image';
// import Pin from '@/assets/images/pin.svg';

import { useEffect, useState } from 'react'
import { PropertyType } from '@/types';
import Spinner from '@/components/Spinner';

const PropertyMap = ({ property }: { property?: PropertyType | null }) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const coordinates: { latitude: number; longitude: number; } = await new Promise(resolve => resolve({
          latitude: 40.7119429,
          longitude: 73.8172783,
        }));

        setLatitude(coordinates.latitude);
        setLongitude(coordinates.longitude);
        setViewport({
          ...viewport,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        })
      } catch (error) {
        setGeoCodeError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  if (geoCodeError) return <div className='text-xl'>No location data found!</div>;

  return (!loading && <div>{property?.location.street}, {property?.location.city} {property?.location.state} {property?.location.zipcode} [{latitude} - {longitude}]</div>);
}

export default PropertyMap;