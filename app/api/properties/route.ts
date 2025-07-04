import connectDB from '@/config/database';
import Property from '@/models/Property';

export const GET = async () => {
  try {
    await connectDB();

    const properties : any = await Property.find({}).lean();

    return new Response(properties, { status: 200 });
  } catch (error) {
    return new Response('Unable to fetch property data!', { status: 500 });
  }
}