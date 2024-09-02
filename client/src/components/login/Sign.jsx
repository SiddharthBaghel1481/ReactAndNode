import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sign = () => {
  const [changePass, setChangePass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    bio: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    const { firstName, email, password, contact, bio } = fields;

    if (!firstName) formErrors.firstName = 'First name is required';
    if (!email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = 'Email is invalid';

    if (!password) formErrors.password = 'Password is required';
    else if (password.length < 8) formErrors.password = 'Password must be at least 8 characters long';

    if (!contact) formErrors.contact = 'Contact is required';
    else if (!/^[6-9]\d{9}$/.test(contact)) formErrors.contact = 'Contact must be a 10-digit number starting with 6, 7, 8, or 9';

    if (!bio) formErrors.bio = 'Bio is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const postFormData = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", fields);
      const { success, message } = res.data;
      if (success) {
        toast.success(message);
        setFields({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          contact: '',
          bio: ''
        });
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6">
          <h1 className="text-3xl font-bold text-indigo-600 text-center">Sign Up</h1>
          <hr />
          <p className="text-center text-gray-600">It's quick and easy.</p>
          <form className="space-y-4" onSubmit={postFormData}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                onChange={handleChange}
                type="text"
                value={fields.firstName}
                id="firstName"
                name="firstName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                onChange={handleChange}
                type="text"
                value={fields.lastName}
                id="lastName"
                name="lastName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                onChange={handleChange}
                type="email"
                value={fields.email}
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                onChange={handleChange}
                type={changePass ? "text" : "password"}
                id="password"
                value={fields.password}
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm pr-10"
              />
              <div
                onClick={() => setChangePass(!changePass)}
                className="absolute inset-y-0 right-0 flex items-center px-3 mt-5 text-gray-600 cursor-pointer"
              >
                {changePass ? <FaEye /> : <FaEyeSlash />}
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
              <input
                onChange={handleChange}
                type="tel"
                id="contact"
                value={fields.contact}
                name="contact"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm"
              />
              {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <select
                onChange={handleChange}
                id="bio"
                value={fields.bio}
                name="bio"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm"
              >
                <option value="">Select</option>
                <option value="client">Client</option>
                <option value="labour">Labour</option>
              </select>
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 py-2 px-4 rounded-md font-semibold text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center text-gray-600 text-sm">
            Already have an account? <Link to={'/login'} className="text-indigo-600 font-semibold">Log in</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Sign;
