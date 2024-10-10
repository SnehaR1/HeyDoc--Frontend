import React, { useRef } from 'react'
import NavBar from './NavBar'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from './Footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function BookingConfirmation() {
    const location = useLocation()
    const { data, doctor_name, payment_mode, payment_status, consultation_mode } = location.state || {};
    const navigate = useNavigate()
    const pdfRef = useRef();


    const handleDownload = async () => {
        const element = pdfRef.current;
        const div = document.getElementById('download-button');
        div.style.display = 'none';

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/jpeg");
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 0;


        if (imgHeight > pageHeight) {
            while (position < imgHeight) {
                pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
                position -= pageHeight;
                if (position < imgHeight) pdf.addPage();
            }
        } else {
            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        }

        pdf.save("reciept.pdf");
        div.style.display = "block"
    };

    return (
        <div>
            <NavBar />
            {/* <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Appointment Receipt</h2>
                <div className="space-y-4">
                    <p className="text-lg text-gray-700"><span className="font-semibold">Booked By: </span> </p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Booked Day: </span> </p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Booked Time: </span> }</p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Amount: </span></p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Doctor: </span></p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Consultaion Mode: </span> </p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Payment Mode: </span> </p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Payment Status: </span> </p>
                    { <p className="text-lg text-gray-700"><span className="font-semibold">Razor Payment ID: </span> </p> : <></>}
                </div>
             
            </div> */}
            <div ref={pdfRef} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 my-6 ">
                <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">Appointment Receipt</h2>
                <div className="space-y-4  p-3">
                    <div className='flex flex-row justify-between'>
                        <p className="text-lg text-gray-700 font-semibold ">Patient:</p>
                        <p className="text-md text-gray-600 ml-4"> {data["patient"]}</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <p className="text-lg text-gray-700 font-semibold ">Booked Day:</p>
                        <p className="text-md text-gray-600 ml-4"> {data["booked_day"]}</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <p className="text-lg text-gray-700 font-semibold ">Booked Time:</p>
                        <p className="text-md text-gray-600 ml-4"> {data["time_slot"]}</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <p className="text-lg text-gray-700 font-semibold ">Amount:</p>
                        <p className="text-md text-gray-600 ml-4"> ₹{data["amount"]}</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <p className="text-lg text-gray-700 font-semibold ">Doctor:</p>
                        <p className="text-md text-gray-600 ml-4"> Dr  {doctor_name}</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <p className="text-lg text-gray-700 font-semibold ">Consultaion Mode:</p>
                        <p className="text-md text-gray-600 ml-4">{consultation_mode}</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <p className="text-lg text-gray-700 font-semibold ">Payment Mode: </p>
                        <p className="text-md text-gray-600 ml-4"> {payment_mode}</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <p className="text-lg text-gray-700 font-semibold ">Payment Status: </p>
                        <p className="text-md text-gray-600 ml-4">{payment_status}</p>
                    </div>
                    {data["razorpay_payment_id"] &&
                        <div className='flex flex-row justify-between'>
                            <p className="text-lg text-gray-700 font-semibold ">Razor Payment ID:</p>
                            <p className="text-md text-gray-600 ml-4">  {data["razorpay_payment_id"]}</p>
                        </div>}

                    <div className="border-t mt-6 pt-4 text-center">
                        <p className="text-sm text-gray-500">Thank you for your booking!<span onClick={() => navigate("/")}>Go Home</span></p>

                    </div>
                </div>

            </div>
            <div className=' flex justify-center'>

                <button id='download-button' onClick={handleDownload} className='mt-4 p-2 bg-blue-500 text-white rounded my-3 '>
                    Download PDF
                </button>
            </div>

            <Footer />
        </div>
    )
}

export default BookingConfirmation