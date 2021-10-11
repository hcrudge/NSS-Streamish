import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { addVideo } from "../modules/videoManager";
import { useHistory } from 'react-router-dom';

export default function VideoAddForm(){
  const history = useHistory();
  const [video, setVideo] = useState();

// const VideoForm = ({ getVideos }) => {
//   const emptyVideo = {
//     title: '',
//     description: '',
//     url: ''
//   };


  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const videoCopy = { ...video };

    videoCopy[key] = value;
    setVideo(videoCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();
    addVideo(video)
      // .then(() => history.push("/"))
      // .catch((err) => alert(`An error occurred: ${err.message}`));
  };

  return (
    <Form>
        <div className="search"><strong>Add A New Video:</strong></div>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="text" name="title" id="title" placeholder="video title"
          value={video.title}
          onChange={handleInputChange} />
      </FormGroup>
      <FormGroup>
        <Label for="url">URL</Label>
        <Input type="text" name="url" id="url" placeholder="video link" 
          value={video.url}
          onChange={handleInputChange} />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description"
          value={video.description}
          onChange={handleInputChange} />
      </FormGroup>
      <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
    </Form>
  );
};


