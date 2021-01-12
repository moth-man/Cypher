import React, { Component } from 'react';
import axios from 'axios';

// const videoGrid = document.getElementById('video-grid');
let myVideoStream;
const myVideo = document.createElement('video');
// myVideo.muted = true;

function addVideoStream(video, stream, grid) {
  setTimeout(10000);
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  grid.append(video);
}

function loadStream(grid) {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  }).then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, myVideoStream, grid);
  });
}

export default class Stream extends Component {
  constructor() {
    super();
    this.state = {
      stream: 'Stream not yet available.',
      roomID: null,
    };
  }

  componentDidMount = () => {
    const videoGrid = document.getElementById('video-grid');
    // const myVideo = document.createElement('video');
    myVideo.muted = true;
    axios.get('http://localhost:3030').then((res) => {
      console.log(res.data);
      this.state.roomID = res.data;
    });
    setTimeout(100000);
    loadStream(videoGrid);
  }

  render() {
    return (
      <div id="video-grid">
        {this.state.stream}
      </div>
    );
  }
}
