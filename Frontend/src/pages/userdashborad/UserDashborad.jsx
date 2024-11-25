import React, { useRef, useState, useEffect } from "react";
import { FaRegImage } from "react-icons/fa6";
import { Modal,Select, Input, Button } from 'antd';
import { MdOutlineRestartAlt } from "react-icons/md";
import { FaEdit} from "react-icons/fa";
import { FaCheckCircle, FaExclamationCircle, FaHourglassHalf } from 'react-icons/fa';
import axios from "axios";
import { IoIosPerson } from "react-icons/io";

const UserDashboard = () => {

    /*==============title part start ======================*/
    const [titlesMap, setTitlesMap] = useState([]);
      
    useEffect(() => {
      const fetchTitles = async () => {
        try {
          const response = await fetch('http://localhost:3100/user/gettitle');
          const data = await response.json();
    
          if (Array.isArray(data)) {
            setTitlesMap(data.map(item => item.title));
          } else {
            console.error('Unexpected data format:', data);
          }
        } catch (error) {
          console.error('Error fetching blog titles:', error);
        }
      };
    
      fetchTitles();
    }, []); // Empty dependency array ensures this runs only once on mount
    
    /*============== title part end ======================*/



    /*============== Blog part start ======================*/

    const [blogs, setBlogs] = useState([]);
    console.log(blogs);
    

    useEffect(() => {
      console.log(titlesMap);
    
      // Check condition for titlesMap length
     
        const fetchBlogs = async () => {
          try {
            const response = await axios.get('http://localhost:3100/user/allblog');
            setBlogs(response.data); // Set the fetched data into state
          } catch (error) {
            console.error('Error fetching blogs:', error);
          }
        };
    
        fetchBlogs();
      
    }, [titlesMap]); // Run this effect whenever titlesMap changes
    
     /*============== Blog part end ======================*/





 
  

  /*🕋========================(First Modal Start)=====================🕋*/
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);


    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };
  /*🕋========================(First Modal End)=====================🕋*/

 
  /*🕋========================(State Start)=====================🕋*/

  const [newTitles, setNewTitles] = useState([]);
  const [forms, setForms] = useState([]);
  const fileInputRefs = useRef([]);

  console.log(blogs);
  
  /*🕋========================(State End)=====================🕋*/

   

  
  const titleArray = ['Car font Site',"Car Back Site","Car Engine Site"]




  /*🕋===============(Update forms and newTitles based on the blogs Start)============🕋*/
  useEffect(() => {
   
    

    const newTitleArray =titleArray.filter(
      (title) => !blogs.some((blog) => blog.title === title)
    );
   console.log(newTitleArray);
   
    
    setNewTitles(newTitleArray);

    // Dynamically create forms for new titles
    setForms(
      newTitleArray.map((title) => ({
        title,
        description: "",
        status: "",
        images: [],
        photoPreviews: [],
      }))
    );
  }, [blogs]);
  /*🕋===============(Update forms and newTitles based on the blogs End)============🕋*/



  /*🕋===============(Handle form input changes description, status)============🕋*/
  const handleInputChange = (index, field, value) => {
    setForms((prevForms) =>
      prevForms.map((form, i) =>
        i === index ? { ...form, [field]: value } : form
      )
    );
  };
  /*🕋===============(Handle form input changes description, status)============🕋*/


  
  /*🕋===============(Handle file selection)============🕋*/
  const handleFileSelection = (index, files) => {
    const fileArray = Array.from(files);
    const previewUrls = fileArray.map((file) => URL.createObjectURL(file));

    setForms((prevForms) =>
      prevForms.map((form, i) =>
        i === index
          ? {
              ...form,
              images: [...form.images, ...fileArray],
              photoPreviews: [...form.photoPreviews, ...previewUrls],
            }
          : form
      )
    );
   };
  /*🕋===============(Handle file selection)============🕋*/


  
  /*🕋===============( Handle file change when a file is selected)============🕋*/
  const handleFileChange = (index, e) => {
    const files = e.target.files;
    if (files) {
      handleFileSelection(index, files);
    }
  };
  /*🕋===============( Handle file change when a file is selected)============🕋*/



  /*🕋===============( Handle form submission )============🕋*/
  const handleSubmit = async (index, e) => {
    e.preventDefault();
    const form = forms[index];
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("status", form.status);
    formData.append("comment", form.comment);

    form.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3100/user/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      window.location.reload();
      // Reset the form after submission
      setForms((prevForms) =>
        prevForms.map((f, i) =>
          i === index
            ? {
                title: form.title,
                description: "",
                status: "",
                images: [],
                photoPreviews: [],
              }
            : f
        )
      );
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };
  /*🕋===============( Handle form submission )============🕋*/


  /*🕋===============( Handle photo removal )============🕋*/
  const handleRemovePhoto = (formIndex, photoIndex) => {
    setForms((prevForms) =>
      prevForms.map((form, i) => {
        if (i === formIndex) {
          // Create new arrays without the photo being removed
          const updatedPhotoPreviews = form.photoPreviews.filter(
            (_, idx) => idx !== photoIndex
          );
          const updatedImages = form.images.filter(
            (_, idx) => idx !== photoIndex
          );

          return {
            ...form,
            photoPreviews: updatedPhotoPreviews,
            images: updatedImages,
          };
        }
        return form;
      })
    );
  };
  /*🕋===============( Handle photo removal )============🕋*/



/*🕋===============( Handle Update Status start )============🕋*/ 
const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
const [currentBlog, setCurrentBlog] = useState({}); // Store the blog being edited
const [updatedStatus, setUpdatedStatus] = useState("");
const [updatedDescription, setUpdatedDescription] = useState("");

const openUpdateModal = (blog) => {
    setCurrentBlog(blog);
    setUpdatedStatus(blog.status);
    setUpdatedDescription(blog.description);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentBlog({});
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3100/user/status/${currentBlog.title}`,
        {
          status: updatedStatus,
          description: updatedDescription,
        }
      );

      if (response.status === 200) {
        alert("Status and description updated successfully!");
        // Update the blogs state
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.title === currentBlog.title
              ? { ...blog, status: updatedStatus, description: updatedDescription }
              : blog
          )
        );
        closeUpdateModal();
      } else {
        alert("Failed to update status and description. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status and description:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

/*🕋===============( Handle Update Status start )============🕋*/ 

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
        alert("Deleted successfully");
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.title !== titleToDelete));
        }
    } catch (error) {
        console.error("Error deleting:", error);
        alert("Failed to delete. Please try again.");
    } finally {
        closeDeleteModal();
    }
    };
/*===============handle Deleted option end============================*/

   


  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-x-scroll">
        {/* Header */}
        <header className="bg-gradient-to-r absolute w-full z-30 from-purple-600 via-indigo-500 to-blue-500 text-white shadow-md px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-x-[780px]">
            <h2 className="text-2xl font-semibold ">User Dashboard</h2>
            <div className="flex items-center gap-x-5">
            <IoIosPerson  className="text-xl"/>
            <h2>Tanvir Ahamed</h2>
            </div>
          </div>    
        </header>

        <h1 className="mt-28"></h1>
        {/* Forms for each new title */}
        {forms.length > 0 &&
          forms.map((form, index) => (
            <div key={index} className="w-[650px]  mb-5 ml-8">
              <div className="border rounded-lg shadow-md bg-white">
                <form onSubmit={(e) => handleSubmit(index, e)}>
                  <div className="p-4">
                    {/*============ Header start ==============*/}
                    <div className="flex items-center justify-between bg-white">
                      <h3 className="text-2xl font-semibold text-cyan-600">
                        {form.title}
                      </h3>
                    {/*============ Header end ==============*/}

                      {/*============ Status Start ==============*/}
                      <div>
                        {/* Status */}
                        <div className="mt-2">
                          <div className="flex gap-6">
                            {["solve", "problem", "notSolve"].map((status) => (
                              <label
                                key={status}
                                className="flex items-center text-gray-800 font-medium hover:text-cyan-600 cursor-pointer transition-colors duration-200"
                              >
                                <input
                                  type="radio"
                                  name={`status-${index}`}
                                  value={status}
                                  checked={form.status === status}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "status",
                                      e.target.value
                                    )
                                  }
                                  className="hidden"
                                />
                                <span
                                  className={`py-2 px-3 border-2 rounded-sm flex items-center justify-center transition-all duration-200 relative ${
                                    form.status === status
                                      ? status === "solve"
                                        ? "bg-green-500 border-green-500 text-white"
                                        : status === "problem"
                                        ? "bg-red-500 border-red-500 text-white"
                                        : "bg-yellow-500 border-yellow-500 text-white"
                                      : "bg-white border-gray-300 text-slate-500"
                                  }`}
                                >
                                  <span
                                    className={`text-sm font-bold transition-all duration-200 ${
                                      form.status === status
                                        ? "text-lg font-bold"
                                        : ""
                                    }`}
                                  >
                                    {status}
                                  </span>
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
              

                       {/*============ Status End ==============*/}
                    </div>
                     {/*============ Header start ==============*/}

                    {/*============== Description start===============*/}
                    <div className="mt-4">
                      <label className="block text-gray-700 font-bold">
                        Description
                      </label>
                      <textarea
                        value={form.description}
                        onChange={(e) =>
                          handleInputChange(index, "description", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter a description"
                      />
                    </div>
                    {/*============== Description End===============*/}

                    {/*===============Image Upload==================*/}
                    <div className="mt-4">
                      <label className="block text-gray-700 font-bold">
                        Upload Images
                      </label>
                      <div
                        className="border p-4 rounded-md text-center cursor-pointer"
                        onClick={() => fileInputRefs.current[index].click()}
                      >
                        <span className="flex justify-center text-3xl">
                          <FaRegImage />
                        </span>
                        <input
                          type="file"
                          ref={(el) => (fileInputRefs.current[index] = el)}
                          onChange={(e) => handleFileChange(index, e)}
                          className="hidden"
                          multiple
                        />
                      </div>

                      {/* Image Previews */}
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {form.photoPreviews.map((preview, photoIndex) => (
                          <div key={photoIndex} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${photoIndex + 1}`}
                              className="w-full h-32 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleRemovePhoto(index, photoIndex)
                              }
                              className="absolute top-2 right-2  text-white p-1 rounded-full"
                            >
                              ❌
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                     {/*===============Image Upload==================*/}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ))}
        {/* Forms for each new title */}


        {/*============Display Blogs================*/}
        {blogs.length > 0 ? (            
               blogs.map((blog) => (
                <div key={blog._id} className="p-4 ml-3 ">
                 <div className="w-[650px] border-2">
                     {/* title part start */}
                    <div className="flex border-b-2 border-red-400 justify-between items-center py-3 px-3">
                        <h4 className="text-2xl rubik font-semibold">
                            <span className="text-blue-700 font-kanti-regular">Title:</span> {blog.title}
                        </h4>

                       
                        <div className="flex items-center gap-x-3">  

                           <MdOutlineRestartAlt  
                            className="text-2xl mr-4 cursor-pointer"
                            onClick={() => openDeleteModal(blog.title)}
                            />

                            <FaEdit
                            className="text-xl cursor-pointer"
                            onClick={() => openUpdateModal(blog)}
                            />
                         
               
                           <div className="flex items-center">
                           <p className="mr-2">{blog.status}</p>
                            {blog.status === "solve" && (
                            <FaCheckCircle className="text-green-500 text-xl" title="Solved" />
                            )}
                            {blog.status === "problem" && (
                            <FaExclamationCircle className="text-red-500 text-xl" title="Problem" />
                            )}
                            {blog.status === "pending" && (
                            <FaHourglassHalf className="text-yellow-500 text-xl" title="Pending" />
                            )}

                           </div>
                          
                        </div>
                    </div>
                    {/* title part start */}

                    {/* Display blog description */}
                    <div className="px-3">
                       <p className="font-rubik text-xl text-sky-700 mt-2">Description</p>
                       <h4 className="text-xl .rubik text-justify">{blog.description}</h4>
                    </div>

                    {/* Display all images */}
                    {/* Display all images */}
                    <div className="py-5">
                    <h1 className="font-rubik text-xl text-sky-700 mt-2 ml-3">Image</h1>
                    <div className="flex flex-wrap gap-4 mt-4 px-3">
                        {blog.images.map((image, index) => (
                        <div
                            key={index}
                            className="relative group w-40 h-40 bg-gray-200 rounded overflow-hidden shadow-md"
                            onClick={() => openModal(`http://localhost:3100/${image}`)} // Pass image URL to openModal
                        >
                            {/* Image */}
                            <img
                            src={`http://localhost:3100/${image}`}
                            alt={`Blog ${blog._id} Image ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer" // Add cursor-pointer for better UX
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
                    {/* Display all images */}     

                    {/* admin comment add */}
                    { blog.comment != "undefined" &&
                       <div className="px-4 mb-3">
                         <p className="font-rubik text-base text-sky-700">Admin Comment</p>
                        {blog.comment}
                       </div>
                    }
                    {/* admin comment add */}


                  </div>                  
                </div>
            ))
        ) : (
            <p>Loading blogs...</p>
        )}
        {/*==========Display Blogs=============*/}


        {/*=========Ant Design Modal===========*/}
        <Modal
        open={isModalOpen} // Use `open` instead of `visible`
        footer={null} // No footer buttons
        onCancel={closeModal} // Close on cancel or overlay click
        centered // Center the modal on the screen
        width={600} // Fixed width
        height={600} // Fixed height
        bodyStyle={{
            padding: 0, // Remove default padding
            height: '100%', // Make the body fill the modal
            overflow: 'hidden', // Hide overflow
        }}
        >
        {selectedImage && (
            <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-auto object-contain"
            />
        )}
        </Modal>

         {/*=========Ant Design Modal===========*/}


         {/*=====Ant Design with status and descritption=====*/}
         <Modal
          open={isUpdateModalOpen}
          title={`Update Blog: ${currentBlog.title}`}
          onCancel={closeUpdateModal}
          footer={[
            <Button key="cancel" onClick={closeUpdateModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleUpdate}>
              Update
            </Button>,
          ]}
        >
          <div>
            <label className="block text-gray-700 font-bold mb-2">Status</label>
            <Select
              value={updatedStatus}
              onChange={setUpdatedStatus}
              className="w-full"
            >
              <Option value="solve">Solve</Option>
              <Option value="problem">Problem</Option>
              <Option value="pending">Pending</Option>
            </Select>

            <label className="block text-gray-700 font-bold mt-4 mb-2">
              Description
            </label>
            <Input.TextArea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              rows={4}
            />
          </div>
        </Modal>
        {/*=====Ant Design with status and descritption=====*/}


        {/*=====Ant Design Delete Title=====*/}
        <Modal
                title="Confirm Deletion"
                open={isDeleteModalOpen}
                onOk={handleDelete}
                onCancel={closeDeleteModal}
                okText="Yes, Delete"
                cancelText="Cancel"
                >
                <p>Are you sure you want to Reset "{titleToDelete}"?</p>
     </Modal>


      </div>
    </div>
  );
};

export default UserDashboard;
