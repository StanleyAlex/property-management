import connectDB from '@/config/database';
import Property from '@/models/Property';

export const GET = async (request, { params } ) => {
  try {
    await connectDB();

    const property : any = await Property.findById(params.slug).lean();

    if (!property) {
      return new Response('Property not found!', { status: 500 });
    }

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new Response('Unable to fetch property data!', { status: 500 });
  }
}