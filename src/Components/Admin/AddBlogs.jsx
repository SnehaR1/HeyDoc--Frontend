import React, { useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi } from '../../api';
import { useNavigate } from 'react-router-dom';
function AddBlogs() {
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        content: '',
        image: null,
        add_images: []
    });
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setBlog((prevBlog) => ({
            ...prevBlog,
            [name]: files
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog((prevBlog) => ({
            ...prevBlog,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('author', blog.author);
        formData.append('content', blog.content);
        if (blog.image) {
            formData.append('image', blog.image[0]);
        }
        for (let i = 0; i < blog.add_images.length; i++) {
            formData.append('add_images', blog.add_images[i]);
        }
        try {
            const response = await adminapi.post("blogs/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(response)
            navigate("/adminBlogs")
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div><AdminNavBar />
            <div className='my-4 mx-12'>


                <form className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <h1 className='text-2xl font-bold'>Add Blog</h1>
                    <div className="my-6">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input onChange={handleChange} name="title" type="text" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Blog Title" required />
                    </div>
                    <div className="my-6">
                        <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                        <input onChange={handleChange} name="author" type="text" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Author" required />
                    </div>
                    <div className='flex flex-col my-6'>
                        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                        <textarea onChange={handleChange} name="content" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus" placeholder="Content" required />
                    </div>
                    <div class="max-w-lg mx-auto p-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload Image</label>
                        <input onChange={handleFileChange} name='image' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="blog_img" type="file" />

                    </div>
                    <div class="max-w-lg mx-auto p-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload Additional Images</label>
                        <input onChange={handleFileChange} multiple name='add_images' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="add_img" type="file" />

                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                </form></div>
        </div>
    )
}

export default AddBlogs