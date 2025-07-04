'use server';

import Cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

const deleteProperty = async (propertyId: string): Promise<void> => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required!');
  }

  const { userId } = sessionUser;

  await connectDB();

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error('Property not found!');
  }

  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorized!');
  }

  const publicIds = property.images.map((imageUrl: string) => {
    const parts = imageUrl.split('/');

    return parts?.at(-1)?.split('.').at(0);
  });

  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await Cloudinary.uploader.destroy('property-mgmt/' + publicId);
    }
  }

  await Property.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteProperty;