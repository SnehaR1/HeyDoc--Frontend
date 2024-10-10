import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { api } from '../../api'
import { useSelector } from 'react-redux'
import { MdOutlineModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
function Profile() {
  const [patients, setPatients] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const user_id = useSelector(state => state.auth.user_id)
  const [patientInfo, setPatientInfo] = useState({ "user": user_id })
  const email = useSelector(state => state.auth.email)
  const phone = useSelector(state => state.auth.phone)
  const [userInfo, setUserInfo] = useState({ "email": email, "phone": phone })
  const [refresh, setRefresh] = useState(false)
  const [message, setMessage] = useState("")
  const [editProfile, setEditProfile] = useState(false)
  const [editMessage, setEditMessage] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("profile/", { params: { user: user_id } })
        console.log(response)
        setPatients(response.data.patients)

      } catch (error) {
        console.log(error)
      }
    }; fetchPatients();
  }, [refresh, user_id])

  const handlePatientSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("patient_form/", patientInfo)
      console.log(response)
      setOpenModal(false)
      setRefresh(refresh => !refresh)
      setMessage(response.data.message)

    } catch (error) {
      console.log(error)
    }
  }

  const handleEditProfile = async (e) => {
    e.preventDefault()
    try {
      const response = await api.put("edit_profile/", userInfo, { params: { user_id: user_id } })
      console.log(response)

      const elements = document.getElementsByClassName("profileEdit");
      for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("readonly", true);
      }
      setEditProfile(false)
      setEditMessage("Profile Updated Successfully!")
      setRefresh(refresh => !refresh)


    } catch (error) {
      console.log(error)

    }

  }
  return (
    <div><NavBar />

      <div className='overflow-x-auto flex- justify-center mt-4'>


        {editProfile ? <form className="max-w-md mx-auto shadow-lg p-5 my-3" onSubmit={handleEditProfile}>
          <h4 className='flex justify-center text-2xl font-bold text-blue-700 my-4'>PROFILE</h4>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} value={userInfo.email} type="email" id="email" name="email" className="profileEdit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Email" />
          </div>
          <div className="mb-5">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <input onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })} name='phone' value={userInfo.phone} type="text" id="phone" className="profileEdit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Phone Number" />
          </div>
          <div className='flex flex-row justify-center'>
            <button
              type="button"
              className="mx-3 p-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                setEditProfile(false);
              }}
            >
              Back
            </button>
            <button
              type="submit"
              className="text-white mx-3 p-6  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

            >
              Update
            </button>
          </div>
        </form>
          :
          <form className="max-w-md mx-auto shadow-lg p-5 my-3">
            <h4 className='flex justify-center text-2xl font-bold text-blue-700 my-4'>PROFILE</h4>
            {
              editMessage ?
                <div className="p-4 mb-4 flex justify-between text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 w-3/4 md:w-1/2 mx-auto" role="alert">
                  <span className="font-medium">{editMessage}</span>
                  <RxCross2 onClick={setEditMessage("")} />
                </div> : <></>

            }
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input value={userInfo.email} type="email" id="email" name="email" className="profileEdit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Email" readOnly />
            </div>
            <div className="mb-5">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
              <input name='phone' value={userInfo.phone} type="text" id="phone" className="profileEdit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Phone Number" readOnly />
            </div>

            <button
              type="button"
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                setEditProfile(true);
              }}
            >
              Edit
            </button>

          </form>




        }



      </div>

      <div className='my-6'>
        <h4 className='flex justify-center text-2xl font-bold text-blue-700 my-4'>Patients Registered From This Account</h4>
        <div>


          <div className="relative overflow-x-hidden">
            {
              message ?
                <div className="p-4 mb-4 flex justify-between text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 w-3/4 md:w-1/2 mx-auto" role="alert">
                  <span className="font-medium">{message}</span>
                  <RxCross2 onClick={setMessage("")} />
                </div> : <></>

            }
            {
              patients.length !== 0 ?



                <table className="w-full text-sm text-left rtl:text-right mx-24 my-3  text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Active
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Report
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Edit
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      patients.map((patient, key) => (


                        <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {patient.name}
                          </th>
                          <td className="px-6 py-4">
                            {patient.phone}
                          </td>
                          <td className="px-6 py-4">
                            {patient.is_active ? <span className='text-green-500'>Active</span> : <span className='text-red-600'>Not Active</span>}
                          </td>

                          <td className="px-6 py-4 text-blue-600 underline" onClick={() => navigate("/reports", { state: { name: patient.name, age: patient.age, gender: patient.gender } })}>
                            Click Here
                          </td>
                          <td className="px-6 py-4">
                            <MdOutlineModeEdit
                              className='mr-2 text-xl text-blue-900'
                              onClick={() => navigate("/editPatient", { state: { patient: patient } })}


                            />
                          </td>
                        </tr>








                      ))






                    }

                  </tbody>
                </table> : <div className='flex flex-col'>
                  <h5 className='font-bold text-xl text-blue-800 flex justify-center items-center'>No Registered Patients</h5>
                  <button
                    className="w-half mx-auto mt-3 rounded-xl bg-blue-600 px-6 py-3 text-xl font-medium text-white"
                    onClick={() => setOpenModal(true)}>
                    Register a Patient
                  </button>

                  {openModal && (
                    <div
                      id="authentication-modal"
                      tabIndex="-1"
                      aria-hidden="true"
                      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">


                      <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setOpenModal(false)}></div>

                      <div
                        className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Fill Out Patient Info
                          </h3>
                          <button
                            onClick={() => setOpenModal(false)}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14">
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>

                        <div className="p-4 md:p-5">
                          <form className="space-y-4" onSubmit={handlePatientSubmit}>
                            <div>
                              <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Name
                              </label>
                              <input
                                onChange={(e) => setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value })}
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Patient's Name"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="age"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Age
                              </label>
                              <input
                                onChange={(e) => setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value })}
                                type="text"
                                name="age"
                                id="age"
                                placeholder="Patient's Age"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="gender"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Gender
                              </label>
                              <select
                                onChange={(e) => setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value })}
                                name="gender"
                                id="gender"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Choose a gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                              </select>
                            </div>

                            <div>
                              <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Phone
                              </label>
                              <input
                                onChange={(e) => setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value })}
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="Available Phone Number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              Register Patient
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

            }
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile