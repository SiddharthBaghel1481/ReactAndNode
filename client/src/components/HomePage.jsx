import React, { useEffect, useState } from 'react'
import Navbar from './nav/Navbar'
import { Outlet } from 'react-router-dom'
import { FaUserPlus, FaEnvelope } from 'react-icons/fa'
import axios from 'axios';



const HomePage = () => {

  const [user, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/getuser')
        setUsers(response.data)
      } catch (err) {
        alert('error in get user');
        return;

      }
    }
    fetchUser()

  }, [])



  // addfriend-----------------------------------------

  const [addFriendBtn, setAddFriendBtn] = useState({})
  const handleAddFriend = async (userId) => {
    const id = localStorage.getItem('id')

    if (addFriendBtn[userId]) return; 

    setAddFriendBtn(prevState => ({
      ...prevState,
      [userId]: true
    }));

    try {
      const response = await axios.post(`http://localhost:3000/api/connect/addfriend?id=${userId}`,{user:id });
      console.log(response.data);
      setAddFriendBtn(prevState => ({
        ...prevState,
        [userId]: 'added' 
      }));
    } catch (err) {
      console.error('Error adding friend:', err);
    }
  };
  


  return (<>
    <Navbar />
    <Outlet />

    <div className='w-full min-h-screen bg-wheat-600'>
      <div className='flex flex-wrap justify-around p-4'>
        {user.map(user => (
          <div key={user._id} className='bg-zinc-700 text-white rounded-lg p-4 m-2 w-full sm:w-1/2 lg:w-1/4 text-center'>
            <div className='flex justify-center mb-4'>
              <img
                className='w-24 h-24 object-cover rounded-full'
                src={user.image ? `../../build/Images/${user.image}` : `../../build/default.png`}

                alt="Profile Image"
              />
            </div>
            <h2 className="font-semibold mb-2">Name: {user.firstName} {user.lastName}</h2>
            <h2 className="font-semibold mb-2">Email: {user.email}</h2>
            <h2 className="font-semibold mb-2">Contact: {user.contact}</h2>
            <h2 className="font-semibold mb-2">Bio: {user.bio}</h2>
            <div className="flex justify-around mt-4">
              <button className={`flex items-center p-2 rounded-lg ${addFriendBtn[user._id]
                ? 'bg-gray-500 '
                : 'bg-blue-500 hover:bg-blue-700'
                } text-white`} onClick={() => handleAddFriend(user._id)}>
                <FaUserPlus className="mr-2" />{addFriendBtn[user._id]?'Friend Added' : 'Add Friend'}
              </button>
              <button className="bg-green-500 text-white p-2 rounded-lg flex items-center">
                <FaEnvelope className="mr-2" /> Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>


  </>
  )
}

export default HomePage