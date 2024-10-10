import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { useNavigate } from 'react-router-dom'
import { adminapi } from '../../api'
import { MdOutlineModeEdit } from "react-icons/md";
function AdminBlogs() {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await adminapi.get("blogs/")
                console.log(response)
                setBlogs(response.data.blogs)

            } catch (error) {
                console.log(error)
            }
        }; fetchBlogs();
    }, [])

    const truncateText = (text, wordLimit) => {
        const words = text.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
    };
    return (
        <div><AdminNavBar />
            <div className='ml-24'>

                <h1 className='text-blue-800 text-2xl my-3 font-bold'>BLOGS</h1>
                <button className="text-white font-bold p-3 rounded  my-3 bg-blue-700" onClick={() => navigate("/addBlogs")}>Add Department +</button>
                {

                    blogs.length !== 0 ? <div className="relative overflow-x-auto flex justify-center items-center ">
                        <table className="w-full mr-24 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-blue-900 dark:bg-blue-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Images
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Additional Images
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Author
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Content
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    blogs.length !== 0 && (
                                        blogs.map((blog) => (
                                            <tr key={blog.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                                                <td className="px-6 py-4">




                                                    <img className="w-10 h-10 rounded-full" src={`http://127.0.0.1:8000${blog.image}`} alt="Main Blog Image" />



                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className='flex flex-row'>
                                                        {
                                                            blog.additional_images.map((image, key) => (

                                                                <img key={key} className="w-8 h-8 my-2 rounded-full" src={`http://127.0.0.1:8000${image["add_images"]}`} alt={`Additional Image ${key}`} />

                                                            ))

                                                        }

                                                    </div>

                                                </td>

                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                                                    {blog.title}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {blog.author}
                                                </td>
                                                <td>
                                                    <p className="line-clamp-1">
                                                        {truncateText(blog.content, 10)}
                                                    </p>
                                                </td>


                                                <td className="px-6 py-4">

                                                    {blog.date}

                                                </td><td className="px-8 py-4">

                                                    <MdOutlineModeEdit
                                                        onClick={() => { navigate("/editBlog", { state: { blogInfo: blog } }) }}
                                                        className='mr-2 text-xl text-blue-900'

                                                    />

                                                </td>

                                            </tr>
                                        ))
                                    )
                                }







                            </tbody>
                        </table>
                    </div> : <div className='flex justify-center items-center'>
                        <h2 className="font-manrope text-4xl font-bold text-blue-900 text-center my-32">No Blogs</h2>
                    </div>
                }

            </div>

        </div>
    )
}

export default AdminBlogs