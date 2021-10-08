import React from "react";
import { Card, CardBody, CardText } from "reactstrap";

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
                    <strong>{video.title}</strong>
                </p>
                <p>{video.description}</p>

                <strong>Comments:</strong>
                <CardText>
                    {video.comments?.length !== 0 ? (
                        video.comments?.map((c) => <p>{c.message}</p>)) :
                        (<div> No Comments</div>)}


                </CardText>
            </CardBody>
        </Card>
    );
};

export default Video;
