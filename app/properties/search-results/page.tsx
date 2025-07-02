import Link from 'next/link';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import type { PropertyType } from '@/types';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import convertToSerializableObject from '@/utils/convertToSerializableObject';

type SearchParamsType = {
    searchParams: {
        location: string;
        propertyType: string;
    }
}

const SearchResultsPage = async ({ searchParams: { location, propertyType } }: SearchParamsType) => {
    await connectDB();

    const locationPattern: RegExp = new RegExp(location, 'i');

    let query: { $or: { [key in string]: RegExp }[]; type: RegExp | boolean; } = {
        $or: [
            { name: locationPattern},
            { description: locationPattern},
            { 'location.street': locationPattern},
            { 'location.city': locationPattern},
            { 'location.state': locationPattern},
            { 'location.zipcode': locationPattern},
        ],
        type: propertyType !== 'All' && new RegExp(propertyType.replace(/\s/g, ''), 'i'),
    };

    const propertyQueryResults = await Property.find(query).lean();

    const properties = convertToSerializableObject(propertyQueryResults);


    return (
        <>
            <section className='bg-blue-700 py-4'>
                <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
                    <PropertySearchForm />
                </div>
            </section>
            <section className='px-4 py-6'>
                <div className='container-xl lg:container m-auto px-4 py-6'>
                    <Link href='/properties' className='flex items-center text-blue-500 hover:underline mb-3'>
                        <FaArrowAltCircleLeft className='mr-2' /> Back To Properties
                    </Link>
                    <h1 className='text-2xl mb-4'>Search Results</h1>
                    {properties.length === 0 ? (<p>No search results</p>) : (
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {properties.map((property: PropertyType) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default SearchResultsPage;