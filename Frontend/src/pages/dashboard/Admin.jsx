import React, { useState, useEffect } from 'react';
import { FaEdit, FaCheckCircle, FaExclamationCircle, FaHourglassHalf } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { Modal } from 'antd';
import axios from "axios";
import { CiSquarePlus } from "react-icons/ci";
import { FaUserSecret } from "react-icons/fa";
import admin from "../../../public/admintwo.png"

const AdminDashboard = () => {


    /*==============Title List================*/
    const [title, setTitle] = useState([]);
    const [list, setList] = useState([]); // Assuming you want to store processed titles

    useEffect(() => {
        // Check if `title` is an array and process it
        if (Array.isArray(title)) {
            const titles = title.map(item => item.title); // Extract titles
            console.log(titles);
            setList(titles); // Update state with the list of titles
        }
    }, [title]); // Dependency array ensures this runs when `title` changes
     /*==============Title List================*/



    /*=================Fetching Title start =================*/
     useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:3100/user/gettitle');
                const data = await response.json();
                setTitle(data);
                 // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching blog data:', error);
                
            }
        };

        fetchBlogs();
     }, []);
    /*=================Fetching Title End =================*/


    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(blogs);
    

    /*🕋========================(First Modal Start)=====================🕋*/
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openImageModal = (image) => {
        setSelectedImage(image);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
        setIsImageModalOpen(false);
    };
    /*🕋========================(First Modal End)=====================🕋*/


    

    /*===============handle Submited============================*/

    const [comment, setComment] = useState(""); // State for the comment
    console.log(comment); // To debug the current comment state

   const handleSubmit = async (title) => {
        if (!comment.trim()) {
            alert("Comment cannot be empty");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:3100/user/admincomment/${title}`,
                { comment }
            );

            if (response.status === 200) {
                window.location.reload();
                alert("Comment submitted successfully");
                setComment(""); // Clear the textarea after successful submission
              }
            } 
            catch (error) {
            console.error("Error submitting comment:", error);

            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("Failed to submit the comment. Please try again.");
            }
            }
    };
    

    /*===============handle Submited============================*/




    /*===============handle create title start============================*/

    const handleCreateBlog = async () => {
        // Show the prompt and capture the user's input for the title
        const title = prompt('Please enter a blog title:');
        
        // Check if the title is empty or the user canceled the prompt
        
    
        try {
          const response = await axios.post('http://localhost:3100/user/createtitle', { title });
          window.location.reload();
          alert(response.data.message); // Show the response message

        } catch (error) {
          console.error('Error creating title:', error);
          
        }
      };

    /*===============handle create title end============================*/





 
    /*===============handle Deleted option with modal start============================*/
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [titleToDelete, setTitleToDelete] = useState("");
  
    const openDeleteModal = (title) => {
      setTitleToDelete(title);
      setIsDeleteModalOpen(true);
    };
  
    const closeDeleteModal = () => {
      setTitleToDelete("");
      setIsDeleteModalOpen(false);
    };
  
    const handleDelete = async () => {
      try {
        const response = await axios.delete(`http://localhost:3100/user/delete/${titleToDelete}`);
        if (response.status === 200) {
          window.location.reload();
          alert("Deleted successfully");
          
        }
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Failed to delete. Please try again.");
      } finally {
        closeDeleteModal();
      }
    };
    /*===============handle Deleted option end============================*/





   /*=================Fetching Data start =================*/
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:3100/user/allblog');
                const data = await response.json();
                setBlogs(data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setLoading(false); // Ensure loading stops even if there's an error
            }
        };

        fetchBlogs();
    }, []);
    /*=================Fetching Data End =================*/


    /*=================Title Delete Start =================*/
     let titleDelete= async(title) =>{
       console.log(title);
        //  now  http://localhost:3100/user/createtitle/:title  delete
        try {
            const response = await axios.delete(`http://localhost:3100/user/getTitleDelete/${title}`);
            if (response.status === 200) {
              window.location.reload();
              alert("Deleted successfully");
            }
          } catch (error) {
            console.error("Error deleting:", error);
            alert("Failed to delete. Please try again.");
          } finally {
            closeDeleteModal();
          }
     }


   
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex flex-col overflow-x-scroll">
                {/* Header start*/}
                <header className="bg-gradient-to-r from-purple-600 absolute w-full z-30 via-indigo-500 to-blue-500 text-white shadow-md px-8 py-6 flex items-center justify-between">
                   <div className='flex items-center gap-x-8'>
                     <FaUserSecret className='text-3xl' />
                    <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
                   </div>
                  
                </header>
                {/* Header End */}
                <h1 className="mt-28"></h1>

                <div className='ml-8 p-6 w-[300px] mt-4 border rounded-lg shadow-lg bg-white'>
                    <div className='flex items-center justify-between'>
                    <h1 className=' text-2xl font-bold text-gray-800'>Title List</h1>
                    
                    <CiSquarePlus className="text-2xl" onClick={handleCreateBlog} />
                    </div>
                    <div className='mt-3 space-y-4'>
                        {list.map(item => (
                            <div                            
                                className='p-4 flex justify-between items-center bg-gray-100 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300'
                            >
                                <h4 className='text-xl font-semibold text-gray-700'>{item}</h4>
                                <MdOutlineDelete  className='text-xl cursor-pointer' onClick={()=>titleDelete(item)} />
                            </div>
                        ))}
                    </div>
                </div>


                

                 

                {/* Blog List Start */}
                <div className="p-8">
                    <h3 className="text-xl font-bold mb-4">All Submission List</h3>
                    {loading ? (
                        <p>Loading blogs...</p>
                    ) : blogs.length > 0 ? (
                        <div className="space-y-6">
                            {blogs.map((blog) => (
                                <div key={blog._id} className="p-4 bg-white rounded-lg shadow-md w-[560px]">
                                    {/* Blog Header */}
                                    <div className="flex justify-between items-center border-b-2 border-red-400 pb-3 mb-3">
                                        <h4 className="text-2xl font-semibold">
                                            <span className="text-blue-700">Title:</span> {blog.title}
                                        </h4>
                                        <div className="flex items-center gap-x-3">
                                            
                                            <div className="flex items-center">
                                                <p className="mr-2">{blog.status}</p>
                                                {blog.status === 'solve' && (
                                                    <FaCheckCircle className="text-green-500 text-xl" title="Solved" />
                                                )}
                                                {blog.status === 'problem' && (
                                                    <FaExclamationCircle className="text-red-500 text-xl" title="Problem" />
                                                )}
                                                {blog.status === 'pending' && (
                                                    <FaHourglassHalf className="text-yellow-500 text-xl" title="Pending" />
                                                )}
                                            </div>

                                            <MdDelete
                                            className="text-2xl text-red-500 cursor-pointer"
                                            onClick={() => openDeleteModal(blog.title)}
                                           />

                                        </div>
                                    </div>

                                    {/* Blog Description */}
                                    <div>
                                        <p className="font-rubik text-xl text-sky-700">Description</p>
                                        <h4 className="text-justify">{blog.description}</h4>
                                    </div>

                                    {/* Blog Images start */}
                                    <div className="py-5">
                                        <h1 className="font-rubik text-xl text-sky-700 mt-2">Images</h1>
                                        <div className="flex flex-wrap gap-4 mt-4">
                                            {blog.images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="relative group w-40 h-40 bg-gray-200 rounded overflow-hidden shadow-md"
                                                    onClick={() => openImageModal(`http://localhost:3100/${image}`)}
                                                >
                                                    {/* Image */}
                                                    <img
                                                        src={`http://localhost:3100/${image}`}
                                                        alt={`Blog ${blog._id} Image ${index + 1}`}
                                                        className="w-full h-full object-cover cursor-pointer"
                                                    />
                                                    {/* Label */}
                                                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
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
                                     {/* Blog Images end */}

                                     {/* Admin Comment Box */}
                                      { blog.comment != "undefined" &&
                                          <div>
                                          <p className="font-rubik text-base text-sky-700">Admin Comment</p>
                                            {blog.comment}
                                          </div>
                                      }
                                    

 
                                    {/* Comment Box */}
                                    {/* Admin Comment Box */}
                                    <div className="mt-4">
                                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Admin Update Comment</h4>
                                        <textarea
                                            className="w-full h-20 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Add your comment here..."
                                            value={comment} // Bind to the state
                                            onChange={(e) => setComment(e.target.value)} // Update state on change
                                        ></textarea>
                                        <button
                                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                                            onClick={() => handleSubmit(blog.title)} // Pass blog.title to the handler
                                        >
                                            Submit Comment
                                        </button>
                                    </div>



                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No Submission available.</p>
                    )}
                </div>
                 {/* Blog List End*/}

                {/*=========Image Preview  Modal===========*/}
           
                <Modal open={isImageModalOpen} footer={null} onCancel={closeImageModal} centered>
                {selectedImage && <img src={selectedImage} alt="Selected" className="w-full h-auto object-contain" />}
                </Modal>

               {/*=========Ant Design Modal===========*/}

               {/* Delete Modal set */}
                    <Modal
                title="Confirm Deletion"
                open={isDeleteModalOpen}
                onOk={handleDelete}
                onCancel={closeDeleteModal}
                okText="Yes, Delete"
                cancelText="Cancel"
                >
                <p>Are you sure you want to delete "{titleToDelete}"?</p>
                </Modal>


            </div>
        </div>
    );
};

export default AdminDashboard;
