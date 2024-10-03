import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { adminapi } from '../../api';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
function Blogs() {
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()

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
    return (
        <div>
            <NavBar />
            <section className="py-12 ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">Our Blogs</h2>
                    {
                        blogs.length > 0 ? blogs.map((blog, key) => (
                            <div className="flex flex-wrap lg:flex-nowrap lg:justify-between lg:gap-x-8">
                                <div className="group w-full max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl overflow-hidden">
                                    <img src={`http://127.0.0.1:8000${blog.image}`} alt="blogs tailwind section" className="w-full h-48 object-cover rounded-t-2xl" />
                                    <div className="p-4 lg:p-5 transition-all duration-300 group-hover:bg-gray-50">
                                        <span className="text-indigo-600 font-medium block mb-2">{blog.date}</span>
                                        <h4 className="text-xl text-gray-900 font-medium leading-tight mb-3">{blog.title}</h4>
                                        <p className="text-gray-500 leading-relaxed mb-1 line-clamp-2">{blog.content}</p>
                                        <p className="text-lg text-blue-500 font-semibold cursor-pointer hover:text-blue-700" onClick={() => navigate("/blogPage", { state: { blog: blog } })}>Read more..</p>
                                        <span className="text-gray-600 font-medium block mt-2">{blog.author}</span>
                                    </div>
                                </div>
                            </div>


                        )) : <><h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">No Blogs</h2></>
                    }

                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Blogs