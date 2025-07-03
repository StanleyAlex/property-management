'use client';

import { useState } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import { toast } from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';

const MessageCard = ({message} : { message: any }) => {
    const [isRead, setRead] = useState<boolean>(message.read);
    const [isDeleted, setDeleted] = useState<boolean>(false);
    // @ts-ignore
    const { setUnreadCount } = useGlobalContext();

    const handleReadClick = async () => {
        const read = await markMessageAsRead(message._id);

        setRead(read);
        setUnreadCount((prevCount: number) => read ? --prevCount : ++prevCount);
        toast.success(`Mark as ${read ? 'Read' : 'New'}`);
    }

    const handleDeleteClick = async () => {
        await deleteMessage(message._id);

        setDeleted(true);
        setUnreadCount((prevCount: number) => isRead ? prevCount : ++prevCount);
        toast.success('Message Deleted!');
    }

    if (isDeleted) {
        return (<p>Message has been deleted!</p>)
    }

    return (<div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
        { !isRead && (<div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>New</div>) }
        <h2 className='text-xl mb-4'>
            <span className='font-bold'>Property Inquiry:</span>{' '}
            {message.property.name}
        </h2>
        <p className='text-gray-700'>{message.body}</p>
        <ul className='mt-4'>
            <li>
                <strong>Reply Email:</strong>{' '}
                <a href={`mailto:${message.email}`} className='text-blue-500'>
                    {message.email}
                </a>
            </li>
            <li>
                <strong>Reply Phone:</strong>{' '}
                <a href={`tel:${message.phone}`} className='text-blue-500'>
                    {message.phone}
                </a>
            </li>
            <li>
                <strong>Received:</strong>{' '}
                {new Date(message.createdAt).toLocaleString()}
            </li>                        
        </ul>
        <button className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md cursor-pointer' onClick={handleReadClick}>{isRead ? 'Mark As New' : 'Mark As Read'}</button>
        <button className='mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer' onClick={handleDeleteClick}>Delete</button>
    </div>);
}

export default MessageCard;