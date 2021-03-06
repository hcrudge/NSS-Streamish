import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import VideoList from "./VideoList";
import VideoForm from "./VideoForm";

const ApplicationViews = ([isLoggedIn]) => {
  return (
    <Switch>
      <Route path="/" exact>
        { <VideoList /> }
      </Route>

      <Route path="/videos/add">
      { <VideoForm /> }
      </Route>

      <Route path="/videos/:id">{/* TODO: Video Details Component */}</Route>
    </Switch>
  );
};

export default ApplicationViews;
