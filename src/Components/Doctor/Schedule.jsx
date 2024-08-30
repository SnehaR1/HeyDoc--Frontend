
import React, { useState, useEffect } from 'react'
import DocNavBar from './DocNavBar'
import { doctorapi } from '../../api'
import { useSelector } from 'react-redux'

function Schedule() {
    const [days, setDays] = useState([])
    const [slots, setSlots] = useState([])
    const doc_id = useSelector(state => state.doctorauth.doc_id)

    const [openForm, setOpenForm] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [scheduledDays, setScheduledDays] = useState([])
    const [scheduledInfo, setScheduledInfo] = useState({})
    const [day, setDay] = useState("")
    const [selectedSlot, setSelectedSlot] = useState("")
    const [notAvailable, setNotavailable] = useState(false)
    const [slotValue, setSlotvalue] = useState("")

    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const response = await doctorapi.post(`scheduleform/${doc_id}`)
                console.log(response)
                if (response.data.availability.length === 0) {
                    setOpenForm(true)
                } else {
                    const scheduled_days = []
                    const schedulded_info = {}
                    response.data.availability.forEach(item => {
                        if (item["day_of_week"]) {
                            scheduled_days.push(item["day_of_week"]);
                            schedulded_info[item["day_of_week"]] = item["slot"]
                        }
                    })
                    setScheduledDays(scheduled_days)
                    setScheduledInfo(schedulded_info)
                }
            } catch (error) {
                console.log(error)
            }

            try {
                const response = await doctorapi.get("scheduleform/")
                const dayList = response.data.day_choices.map(day => day[1])
                const slotList = response.data.slot_choices.map(slot => slot[1])
                setDays(dayList)
                setSlots(slotList)
            } catch (error) {
                console.log(error)
            }
        }
        fetchChoices()
    }, [refresh])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (day.trim() === "") {
            alert("Please select a day");
            return;
        }

        try {
            const scheduleToSubmit = {
                day_of_week: day,
                slot: notAvailable ? null : slotValue,
                isAvailable: notAvailable ? "false" : "true"
            };

            console.log("Submitting schedule:", scheduleToSubmit);

            await doctorapi.post(`schedule/${doc_id}`, scheduleToSubmit);

            setRefresh(!refresh);
            setDay("");
            setSlotvalue("");
            setOpenForm(false);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <DocNavBar />
            {openForm ? (
                <div className="container mx-auto mt-12 p-4 max-w-4xl">
                    <form className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8" onSubmit={handleSubmit} >
                        <h1 className='text-2xl font-bold'>Schedule</h1>
                        <div className="inline-flex rounded-md shadow-sm mt-4" role="group">
                            {days.map((dayName, key) => (
                                <button
                                    name="day_of_week"
                                    id={dayName}
                                    value={dayName}
                                    onClick={() => {
                                        if (!scheduledDays.includes(dayName)) {
                                            setDay(dayName);
                                            setOpenForm(true);
                                        } else {
                                            setOpenForm(false);
                                            setDay(dayName);
                                            setSelectedSlot(scheduledInfo[dayName] || "Not Available");
                                            console.log(selectedSlot);
                                        }
                                    }}
                                    key={key}
                                    type="button"
                                    className={`px-4 py-2 text-sm font-medium ${day === dayName ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'} border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:active:bg-blue-700 dark:focus:ring-blue-500 dark:focus:text-white`}
                                >
                                    {dayName}
                                </button>
                            ))}
                        </div>

                        <div className='flex flex-col my-6'>
                            <label htmlFor="slot" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available Slot</label>
                            <select
                                name="slot"
                                onChange={(e) => setSlotvalue(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose a Slot</option>
                                {slots.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-center items-center my-6">
                            <input checked={notAvailable} onChange={(e) => { setNotavailable(e.target.checked) }} name="notAvailable" id="inline-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="isAvailable" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Not Available</label>
                        </div>

                        <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                    </form>
                </div>
            ) : (
                <div className="inline-flex rounded-md shadow-sm mt-12" role="group">
                    <div className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8">
                        <h1 className='text-2xl font-bold'>Schedule</h1>
                        <div className="inline-flex rounded-md shadow-sm mt-4" role="group">
                            {days.map((dayName, key) => (
                                <button
                                    name="day_of_week"
                                    value={dayName}
                                    onClick={() => {
                                        if (!scheduledDays.includes(dayName)) {
                                            setOpenForm(true);
                                            setDay(dayName);
                                            setSelectedSlot("");
                                        } else {

                                            setDay(dayName);

                                            setSelectedSlot(scheduledInfo[dayName] || "Not Available");
                                            console.log(selectedSlot);
                                        }
                                    }}
                                    key={key}
                                    type="button"
                                    className={`px-4 py-2 text-sm font-medium ${day === dayName ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'} border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:active:bg-blue-700 dark:focus:ring-blue-500 dark:focus:text-white`}
                                >
                                    {dayName}
                                </button>
                            ))}
                        </div>
                        <p className='mt-4'>Scheduled Slot: {selectedSlot || "Select a day"}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Schedule
