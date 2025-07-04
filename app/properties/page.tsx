import React from 'react';
import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertiesPage : React.FC<{ searchParams: any; }> = async ({ searchParams: { page = 1, pageSize = 2 } } : { searchParams: any; }) => {
    
    await connectDB();

    const skip = (page - 1) * pageSize;

    const totalItems = await Property.countDocuments({});
    const properties: any[] = await Property.find({}).skip(skip).limit(pageSize);

    const showPagination = totalItems > pageSize;

    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                {properties.length === 0 ? (
                    <p>No properties found</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {
                            properties.map((property) => {
                                return <PropertyCard key={property._id} property={property} />;
                            })
                        }
                    </div>
                )}
                {showPagination && <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={totalItems} />}
            </div>
        </section>
    );
}

export default PropertiesPage;