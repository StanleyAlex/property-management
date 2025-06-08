'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PropertyType } from '@/types';
import { toast } from 'react-toastify';
import deleteProperty from '@/app/actions/deleteProperty';

const ProfileProperties = ({ properties }: { properties: PropertyType[] }) => {
  const [userProperties, setUserProperties] = useState<PropertyType[]>(properties);

  const handleDeleteProperty = async (property: PropertyType) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?');

    if (!confirmed) return;

    const { _id: propertyId, name: propertyName } = property;

    await deleteProperty(property._id);

    const updatedProperties = properties.filter((property: PropertyType) => property._id !== propertyId)

    setUserProperties(updatedProperties);

    toast.success(`${propertyName} has been deleted successfully!`);
  }

  return userProperties?.map((userProperty: PropertyType) => (
    <div key={`property-${userProperty._id}`} className="mb-10">
      <Link href={`/properties/${userProperty._id}`}>
        <img
          className="h-32 w-full rounded-md object-cover"
          src={userProperty.images[0]}
          alt="Property 2"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{userProperty.name}</p>
        <p className="text-gray-600"><span className='font-bold'>Address:</span> {userProperty.location.street}, {userProperty.location.city} {userProperty.location.state} {userProperty.location.zipcode}</p>
      </div>
      <div className="mt-2">
        <Link
          href={`properties/${userProperty._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDeleteProperty(userProperty)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
}

export default ProfileProperties;