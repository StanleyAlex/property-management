import React from 'react';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { PropertyType } from '@/types';
import connectDB from '@/config/database';
import Property from '@/models/Property';

type PropertyParamType = {
    params: { slug: string };
}

const PropertyPage: React.FC<PropertyParamType> = async ({ params }) => {
    await connectDB();
    const property: PropertyType | null = (await Property.findById(params?.slug).lean()) as unknown as PropertyType;

    return(<>
        <PropertyHeaderImage image={property?.images[0]} />
        <section>
            <div className='container m-auto py-6 px-6'>
                <Link
                  href='/properties'
                  className='text-blue-500 hover:text-blue-600 flex items-center'
                >
                    <FaArrowLeft className='mr-2' /> Back to Properties
                </Link>
            </div>
        </section>
        <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                </div>
            </div>
        </section>
    </>);
}

export default PropertyPage;