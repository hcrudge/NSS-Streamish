import { getToken } from "./authManager";

const baseUrl = '/api/video';

export const getAllVideos = () => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/GetWithComments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get videos.");
      }
    });

  });
};

export const addVideo = (video) => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video)
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("An unknown error occurred while trying to save a new video.")
      }
    })
  });
};

export const getVideo = (id) => {
  return fetch(`${baseUrl}/${id}`).then((res) => res.json());
};


export const searchVideos = (searchTerm) => {
  return fetch(`${baseUrl}/search?q=${searchTerm}&sortDesc=false`)
    .then((resp) => resp.json());
};
