import React, { useState } from 'react'
import NavBar from './NavBar'
import { api } from '../../api'

function ContactUsForm() {
    const [info, setInfo] = useState({})
    const [message, setMessage] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post("contact_us/", info)
            console.log(response)
            setMessage("Message sent Successfully")
            document.getElementById('ContactForm').reset();


        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div><NavBar />
            <section className="bg-white dark:bg-gray-900 mt-2">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                    {message ?
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span className="font-medium">{message}</span>
                        </div> : <></>}


                    <p className="mb-8 lg:mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                        Have anything to tell us? Fill out the form below and let us know !
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-8" id='ContactForm'>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Your email
                            </label>
                            <input
                                onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })}
                                name='email'
                                type="email"
                                id="email"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="name@HeyDoc.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Subject
                            </label>
                            <input
                                name='subject'
                                onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })}
                                type="text"
                                id="subject"
                                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="Let us know how we can help you"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                Your message
                            </label>
                            <textarea
                                name='message'
                                onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })}
                                id="message"
                                rows="6"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Leave a comment..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Send message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default ContactUsForm