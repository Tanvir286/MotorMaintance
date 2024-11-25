import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCarCrash } from "react-icons/fa";
import { FaCheckCircle, FaHourglassHalf, FaExclamationCircle } from "react-icons/fa";

const UserEdit = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        // Fetch data from the API
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3100/user/allblog');
                setBlogs(response.data); // Assuming the response data is the list of blogs
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleEditStatus = (blog) => {
        setSelectedBlog(blog); // Set the selected blog for editing
        setNewStatus(blog.status); // Set the current status in the modal
        setIsModalOpen(true); // Open the modal
    };

    const handleSaveStatus = async () => {
        try {
            // Send the updated status to the backend
            await axios.patch(`http://localhost:3100/user/updateStatus/${selectedBlog.id}`, { status: newStatus });
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                    blog.id === selectedBlog.id ? { ...blog, status: newStatus } : blog
                )
            );
            setIsModalOpen(false); // Close the modal after saving
        } catch (err) {
            console.error("Error saving status:", err);
            setError("Failed to update status");
        }
    };

    if (loading) {
        return <div className="h-screen flex justify-center items-center text-xl text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="h-screen flex justify-center items-center text-red-500 text-xl">Error: {error}</div>;
    }

    return (
        <div className='bg-gray-100'>
            {/* Dashboard */}
            <div>
                <header className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white shadow-md px-8 py-6 flex items-center justify-between">
                    <h2 className="text-3xl font-semibold">User Edit</h2>
                </header>
            </div>

            {/* Blog Content */}
            <div className='w-[650px] mt-7 ml-8'>
                <div className='border rounded-lg shadow-lg bg-white'>
                    {blogs.map((blog) => (
                        <div key={blog.id} className='p-5 border-b'>
                            <div className='flex justify-between items-center'>
                                <div className="flex gap-x-4 items-center ">
                                    <FaCarCrash className="text-3xl" />
                                    <h3 className="text-xl font-bold text-gray-800 bg-black">Car Front Site Picture</h3>
                                </div>
                            </div>

                            {/* Status Section with Icon and Badge */}
                            <div className="mt-4 flex items-center gap-3">
                                <div>
                                    {blog.status === 'solve' && (
                                        <div className="flex items-center text-green-500">
                                            <FaCheckCircle className="text-2xl mr-2" />
                                            <span className="text-sm font-semibold">Completed</span>
                                        </div>
                                    )}
                                    {blog.status === 'problem' && (
                                        <div className="flex items-center text-yellow-500">
                                            <FaHourglassHalf className="text-2xl mr-2" />
                                            <span className="text-sm font-semibold">In Progress</span>
                                        </div>
                                    )}
                                    {blog.status === 'notSolve' && (
                                        <div className="flex items-center text-red-500">
                                            <FaExclamationCircle className="text-2xl mr-2" />
                                            <span className="text-sm font-semibold">Pending</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleEditStatus(blog)}
                                    className="text-blue-500 text-sm underline ml-4"
                                >
                                    Edit Status
                                </button>
                            </div>

                            {/* Description Section */}
                            <p className="mt-3 text-gray-700">{blog.description}</p>

                            {/* Image Gallery */}
                            <div className="flex flex-wrap gap-4 mt-4">
                                {blog.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative group w-40 h-40 bg-gray-200 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105"
                                    >
                                        {/* Image */}
                                        <img
                                            src={`http://localhost:3100/${image}`} // Replace backslashes with forward slashes
                                            alt={`Blog ${blog._id} Image ${index + 1}`}
                                            className="w-full h-full object-cover rounded-lg transition-all duration-300"
                                        />

                                        {/* Label */}
                                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs p-2 rounded-md">
                                            {`Image ${index + 1}`}
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                            <p className="text-white text-sm font-medium">
                                                {`Preview ${index + 1}`}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Editing Status */}
            {isModalOpen && selectedBlog && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Edit Status for {selectedBlog.title}</h3>

                        <div className="mb-4">
                            <label className="block text-gray-700">Status</label>
                            <select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                            >
                                <option value="solve">Completed</option>
                                <option value="problem">In Progress</option>
                                <option value="notSolve">Pending</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 text-gray-700 p-2 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveStatus}
                                className="bg-blue-500 text-white p-2 rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserEdit;
