import React, { useEffect, useState } from "react";
import Video from './Video';
import { getAllVideos } from "../modules/videoManager";
import VideoForm from "./VideoForm";
import VideoSearch from "./VideoSearch";


const VideoList = () => {
    
    //Array destructuring
    const [videos, setVideos] = useState([]);
    
    // get videos from videoManagers (function getAllVideos)
    const getVideos = () => {
        getAllVideos().then(videos => setVideos(videos));
    };
    
    useEffect(() => {
        getVideos();
    }, []);

    

    return (
        <div className="container">
            
            <div className="row justify-content-center">
                <VideoSearch setVideos={setVideos}/>
            </div>
            <br/>
            <div className="row justify-content-center">
                <VideoForm getVideos={getVideos} />
            </div>
            <br/>
            <div className="row justify-content-center">
                {videos.map((video) => (
                    <Video video={video} key={video.id} />
                ))}
            </div>
        </div>

    );
}

export default VideoList;
