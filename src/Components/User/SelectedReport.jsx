import React, { useRef } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
function SelectedReport({ name, age, gender, selectedReport }) {
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

        pdf.save("report.pdf");
        div.style.display = "block"
    };



    return (
        <div ref={pdfRef} className='w-full mb-6 bg-slate-100 mx-24 p-6 shadow-lg   col-span-5 max-sm:col-span-12'>
            <div className='flex p-2 justify-center items-center mx-12 flex-col'>
                <h3 className='font-bold text-blue-700 text-2xl mb-4'> REPORT</h3>
                <h5 className='font-bold text-blue-700 text-xl mb-2'>{name}</h5>
            </div>


            <div className='flex flex-row p-6 justify-between mx-6 '>
                <p className='text-gray-500  '>Report ID: {selectedReport.report_id}</p>
                <p className='text-gray-500  '>Dr. {selectedReport.doctor.name}</p>
                <p className='text-gray-500  '>Report Date: {selectedReport.report_date}</p>

            </div>
            <div>
                <div>
                    <div className='flex flex-row p-6 justify-center bg-slate-50 mx-32 my-2 '>
                        <p className='text-black font-bold mx-3'>Age: <span className='text-gray-700 font-normal'>{age}</span></p>
                        <p className='text-gray-black  font-bold mx-3'>Gender: <span className='text-gray-700 font-normal'>{gender}</span></p>

                    </div>
                    <div className='flex flex-row p-6 justify-center bg-slate-50  mx-32 my-2 '>
                        <p className='text-black font-bold mx-3'>Weight: <span className='text-gray-700 font-normal'>{selectedReport.weight}</span></p>
                        <p className='text-gray-black  font-bold mx-3'>Height: <span className='text-gray-700 font-normal'>{selectedReport.height}</span></p>

                    </div>
                    <div className='flex flex-col p-6 bg-slate-50  my-2'>
                        <p className='text-black font-bold my-3 flex flex-col'>Allergies: <span className='text-gray-700 font-normal'>{selectedReport.allergies}</span></p>
                        <p className='text-black font-bold my-3 flex flex-col'>Family History: <span className='text-gray-700 font-normal'>{selectedReport.family_history}</span></p>
                    </div>
                    <div className='flex flex-col p-6 bg-slate-50  my-2 justify-center'>
                        <p className='text-black font-bold my-3 flex flex-col justify-center '>Symptoms: <span className='mx-24 text-gray-700 font-normal'>{selectedReport.symptoms}</span></p>
                        <p className='text-black font-bold my-3 flex flex-col justify-center '>Diagnosis: <span className='mx-24 text-gray-700 font-normal'>{selectedReport.diagnosis}</span></p>
                        <p className='text-black font-bold my-3 flex flex-col justify-center '>Medications: <span className=' mx-24 text-gray-700 font-normal'>{selectedReport.medications}</span></p>
                    </div>

                </div>


            </div>

            <div className=' flex justify-center'>

                <button id='download-button' onClick={handleDownload} className='mt-4 p-2 bg-blue-500 text-white rounded '>
                    Download PDF
                </button>
            </div>

        </div>
    )
}

export default SelectedReport