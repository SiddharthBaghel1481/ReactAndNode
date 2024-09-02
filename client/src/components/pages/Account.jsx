import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../nav/Navbar';
import { FaBell } from "react-icons/fa";

const Account = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const id = localStorage.getItem('id'); 
                if (id) {
                    const response = await axios.get(`http://localhost:3000/api/auth/account?id=${id}`);
                    setUser(response.data);
                    setEditedUser(response.data);
                }
            } catch (err) {
                alert('Error in fetching user');
            }
        };
        fetchUser();
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = localStorage.getItem('id');
            if (id) {
                const response = await axios.put(`http://localhost:3000/api/auth/account?id=${id}`, editedUser);
                setUser(response.data);
                setIsEditing(false);
            }
        } catch (err) {
            alert('Error in updating user');
        }
    };

    const uploadImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const id = localStorage.getItem('id');
            const response = await axios.post(`http://localhost:3000/api/auth/account?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUser(prevState => ({ ...prevState, image: response.data.image }));
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            console.log(response, '---res from front');
        } catch (err) {
            console.log(err);
        }
    }

    const [showFriend, setShowFriend] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [friendReq, setFriendReq] = useState('');
    const [display, setDisplay] = useState('No Friends');

    const toggleDropdown = async () => {
        setIsDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen) { 
            const id = localStorage.getItem('id');
            try {
                const response = await axios.get(`http://localhost:3000/api/connect/addfriend?id=${id}`);
                setShowFriend(response.data.friends[0]);
                setFriendReq(response.data.friends[0]);
            } catch (err) {
                console.error(err, 'Error in fetching friend requests');
            }
        }
    };

    const AcceptFriend = async () => {
        try {
            if (showFriend.length) {
                setDisplay(showFriend);
                
            } else {
                setDisplay('No Friends');
            }
        } catch (err) {
            console.log(err, '----err in acceptFriend ');
        }
    };

    const DeclineFriend = async () => {
                    const id = localStorage.getItem('id');
             const response =  await  axios.delete(`http://localhost:3000/api/connect/addfriend?id=${id}`)
              setFriendReq(response.data.friends[10])
    };

    return (
        <>
            <Navbar />
            <section className="account-body201 ">
                <div className="w-full px-4 mx-auto ">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg mt-5 bg-zinc-500">
                        <div className="px-6 relative">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">   
                                    <div className="relative">
                                        <img
                                            alt="Profile"
                                            src={user.image ? `../../build/Images/${user.image}` : `../../build/default.png`}
                                            className="shadow-xl rounded-lg h-auto border-none mt-5 img-user-single1 object-cover"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <input type="file" accept='image/*' onChange={e => setFile(e.target.files[0])} ref={fileInputRef} />
                                    <button type='submit' className='mt-3 p-2 bg-zinc-700 text-white rounded' onClick={uploadImage}>Upload</button>
                                    <button onClick={handleEditClick} className='mt-3 ms-2 p-2 bg-zinc-700 text-white rounded'>
                                        {isEditing ? 'Cancel' : 'Edit'}
                                    </button>
                                </div>
                                <div onClick={toggleDropdown} className='ms-5 p-2 rounded-full cursor-pointer absolute top-0 left-52'><FaBell /></div>
                                {isDropdownOpen && (
                                    <ul className='py-1 absolute top-5 left-52 bg-white border mt-3 border-gray-300 rounded shadow-lg'>
                                        <li className='px-4 py-2'>
                                            <p>you have a friend request: {friendReq || 'No Friends'}</p>
                                            <button onClick={AcceptFriend} className='p-1 bg-green-500 text-white rounded-lg'>Accept</button>
                                            <button onClick={DeclineFriend} className='p-1 ms-2 bg-red-500 text-white rounded-lg'>Decline</button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            <div className="text-center mt-12">
                                {isEditing ? (
                                    <form onSubmit={handleSubmit}>
                                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={editedUser.firstName || ''}
                                                onChange={handleInputChange}
                                                className="border-2 border-gray-300 rounded p-1"
                                                placeholder="First Name"
                                            />
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={editedUser.lastName || ''}
                                                onChange={handleInputChange}
                                                className="border-2 border-gray-300 rounded p-1 ms-2"
                                                placeholder="Last Name"
                                            />
                                        </h3>
                                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                                            <input
                                                type="text"
                                                name="contact"
                                                value={editedUser.contact || ''}
                                                onChange={handleInputChange}
                                                className="border-2 border-gray-300 rounded p-1"
                                                placeholder="Contact"
                                            />
                                        </h3>
                                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                                            <textarea
                                                name="bio"
                                                value={editedUser.bio || ''}
                                                onChange={handleInputChange}
                                                className="border-2 border-gray-300 rounded p-1 w-full"
                                                placeholder="Bio"
                                            />
                                        </h3>
                                        <button type="submit" className="mt-3 p-2 bg-zinc-700 text-white rounded">Save</button>
                                    </form>
                                ) : (
                                    <>
                                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                                            Name : {user.firstName} {user.lastName}
                                        </h3>
                                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                                            Contact : {user.contact}
                                        </h3>
                                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                                            Bio : {user.bio}
                                        </h3>
                                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                                            Friends : {display}
                                        </h3>
                                    </>
                                )}


                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        India
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                Your labor is not just about the tasks you perform or the hours you put in. It's about the commitment you show, the challenges you overcome, and the pride you take in your work. Every project completed, every problem solved, every day you push through difficulties, you are making a difference...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    };

    export default Account;
