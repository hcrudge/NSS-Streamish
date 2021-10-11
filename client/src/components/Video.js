import React from "react";
import { Card, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";

//Video card displays the video components - 
//posted by user, url(embedded YT video), title, description, and loops over comments
//the video data is passed in to the Video 
const Video = ({ video }) => {
    return (
        <Card >
            <p className="text-left px-2">Posted by: {video.userProfile.name}</p>
            <CardBody>
                <iframe className="video"
                    src={video.url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />

                <p>
                    <Link to={`/videos/${video.id}`}>
                        <strong>{video.title}</strong>
                    </Link>
                </p>
                <p>{video.description}</p>

                <strong>Comments:</strong>
                <CardText >
                    {video.comments?.length !== 0 ? (
                        video.comments?.map((c) => <p><em>{c.message}</em></p>)) :
                        (<em> No Comments</em>)}


                </CardText>
            </CardBody>
            <br />
        </Card>
    );
};

export default Video;
