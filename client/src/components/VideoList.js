import React, { useEffect, useState } from "react";
import Video from './Video';
import { getAllVideos } from "../modules/videoManager";


const VideoList = () => {
    
    //Array destructuring
    const [videos, setVideos] = useState([]);
    
    // get videos from videoManagers (function getAllVideos)
    const getVideos = () => {
        getAllVideos().then(videos => setVideos(videos));
    };

  

    useEffect(() => {
        getVideos();
        getVideosComments();

    }, []);

    // const handleSearch = () => {
    //     // console.log(searchInput.current.value);
    //     const searchedVideo = searchInput.current.value;
    //     if (searchedVideo === "") {
    //       window.alert("Please Search For a Video");
    //     } else {
    //       searchVideo(searchedVideo).then((response) => {
    //         console.log(response.results);
    //         setVideos(response.results);
    //       });
    //     }
    //   };

    return (
        <div className="container">
            {/* <div className="search_wrapper">
                <input ref={searchInput} type="text" required autofocus placeholder="Search Videos" className="search_input"></input>
                <div className="button_div">
                    <button className="search_button button is-rounded" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div> */}
            <div className="row justify-content-center">
                {videos.map((video) => (
                    <Video video={video} key={video.id} />
                ))}
            </div>
        </div>

    );
}

export default VideoList;
