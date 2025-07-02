'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

const deleteMessage = async (messageId: string): Promise<void> => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required!');
  }

  const { userId } = sessionUser;

  await connectDB();

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('Message not found!');
  }

  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized!');
  }

  await Message.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteMessage;