'use client';

import { useState, useEffect } from 'react';
import { PropertyType } from '@/types';
import { FaBookmark, FaSpinner } from 'react-icons/fa';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const BookmarkButton = ({ property } : { property: PropertyType; }) => {

  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user?.id;

  const [isBookmarked, setBookmarked] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;    

    checkBookmarkStatus(property._id).then((response) => {
      // @ts-ignore
      if (response.error) {
        setLoading(false);

        // @ts-ignore
        return toast.error(response.error);
      }

      if (response.isBookmarked) setBookmarked(response.isBookmarked);

      setLoading(false);
    })
  }, [property._id, userId, checkBookmarkStatus])

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to be signed in to bookmark a listing!');

      return;
    }
  
    bookmarkProperty(property._id).then((response: any) => {
      if (response.error) {
        return toast.error(response.error);
      }

      setBookmarked(response.isBookmarked);
      toast.success(response.message);
    })
  }

  if (isLoading) {
    return (
      <button className='bg-gray-500 w-full py-2 px-4 rounded-full flex items-center justify-center cursor-no-drop'>
        <FaSpinner className='spinner-animation' />
      </button>
    );
  }

  return isBookmarked ? (
    <button className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center cursor-pointer' onClick={handleClick}>
      <FaBookmark className='mr-2' /> Remove Bookmark
    </button>) : (
    <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center cursor-pointer' onClick={handleClick}>
      <FaBookmark /> Bookmark Property
    </button>);
}

export default BookmarkButton;