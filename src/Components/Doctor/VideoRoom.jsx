import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useSelector } from 'react-redux'
import NavBar from '../User/NavBar';
import DocNavBar from './DocNavBar';
function VideoRoom() {
    const { roomId } = useParams();
    const user = useSelector(state => state.auth.user_id)



    const meeting = async (element) => {
        const appID = Number(process.env.REACT_APP_APPID);;
        const serverSecret = process.env.REACT_APP_SERVER_SECRET;


        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "HeyDoc");
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `http://localhost:3000/onlineRoom/${roomId}`

                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            }
        })
    }
    return (
        <div className='flex justify-center items-center mt-32 ' >

            <div ref={meeting}></div>
        </div>

    )
}

export default VideoRoom