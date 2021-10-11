import React from "react";
import { searchVideos } from "../modules/videoManager";

const VideoSearch = ({setVideos}) => {
    return (
        <div className="searchDiv">
            <div className="searchBar">
               
                <div className="search"><strong>Search Video:</strong>
                 
                </div>
                <input type="text"
                    className="input--wide"
                    onKeyUp={(event) => {
                        searchVideos(event.target.value).then((videoResults) => {
                            setVideos(videoResults);
                        });
                    }}
                    placeholder="Search for a video..." />
            </div>
        </div>
    )
};
export default VideoSearch;