import React from 'react'
import NavBar from './NavBar'
import { useLocation } from 'react-router-dom'
import { TbChevronsDown } from 'react-icons/tb'

function BlogPage() {
    const location = useLocation()
    const { blog } = location.state || {}
    console.log(blog)

    const paragraphs = blog.content.split(/\n\s*\n/).filter(p => p.trim() !== '');
    return (
        <div><NavBar />
            <div class="w-full h-full bg-white dark:bg-gray-800 mt-3">
                <div class="w-full mx-auto py-5 bg-white dark:bg-gray-800">



                    <h1 class="w-[92%] mx-auto lg:text-4xl md:text-3xl xs:text-2xl text-center font-serif font-semibold pb-4 dark:text-white">
                        {blog.title}</h1>


                    <img src={`http://127.0.0.1:8000${blog.image}`} alt="Blog Cover" class="xl:w-[60%] xs:w-[40%] mx-auto lg:h-[480px] md:h-[400px] rounded-lg" />


                    <div class="w-[90%] mx-auto flex md:gap-4 xs:gap-2 justify-center items-center pt-4">
                        <div class="flex gap-2 items-center">

                            <h2 class="text-sm font-semibold dark:text-white">{blog.author}</h2>
                        </div>
                        <div class="dark:text-gray-500">|</div>

                        <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400">{blog.date}</h3>

                    </div>


                    <div class="py-6 bg-white dark:bg-gray-800">
                        {paragraphs.map((p, key) => (<>
                            <p key={key} className="md:w-[80%] xs:w-[90%] mx-auto pt-4 prose prose-lg dark:prose-dark">
                                {p}
                            </p>  <img
                                key={key}
                                src={key < blog.additional_images.length
                                    ? `http://127.0.0.1:8000${blog.additional_images[key]["add_images"]}`
                                    : ''}
                                alt={`Additional Image ${key}`}
                                className="w-[30%] xs:w-[50%] mx-auto my-2 rounded-lg"
                            /></>
                        ))}
                    </div>

                </div>
            </div>

        </div >
    )
}

export default BlogPage