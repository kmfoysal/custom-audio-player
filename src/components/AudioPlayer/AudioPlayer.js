import React, { useRef, useState } from 'react';
import Song from '../../assets/audio/Kesariya.mp3';
import PauseIcon from "../../assets/icon/Pause.svg";
import PlayIcon from '../../assets/icon/play.png';
import './AudioPlayer.scss';

const AudioPlayer = () => {

    const audioPlayerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [mediaTime, setMediaTime] = useState(0);
    const [duration, setDuration] = useState(0);


    function formatTime(time) {
      let minutes = Math.floor(time / 60);
      let timeForSeconds = time - minutes * 60; // seconds without counted minutes
      let seconds = Math.floor(timeForSeconds);
      let secondsReadable = seconds > 9 ? seconds : `0${seconds}`; // To change 2:2 into 2:02
      return `${minutes}:${secondsReadable}`;
    }


    const togglePlaying = (event) => {
      setIsPlaying(!isPlaying);

      const audioPlayer = audioPlayerRef.current;
      isPlaying ? audioPlayer.pause() : audioPlayer.play();
    };


      const onLoadedMetadata = () => {
        // let minutes = Math.floor(audioPlayerRef.current.duration / 60);
        // let timeForSeconds = audioPlayerRef.current.duration - minutes * 60; // seconds without counted minutes
        // let seconds = Math.floor(timeForSeconds);
        // let secondsReadable = seconds > 9 ? seconds : `0${seconds}`; // To change 2:2 into 2:02

        setDuration((audioPlayerRef.current.duration));
      };;

      const onTimeUpdate = () => {

        // let minutes = Math.floor(audioPlayerRef.current.currentTime / 60);
        // let timeForSeconds = audioPlayerRef.current.currentTime - minutes * 60; // seconds without counted minutes
        // let seconds = Math.floor(timeForSeconds);
        // let secondsReadable = seconds > 9 ? seconds : `0${seconds}`; // To change 2:2 into 2:02
    
        setMediaTime((audioPlayerRef.current.currentTime));

      };

      const onTrackChange = (event) => {
        const playhead = Math.floor(event.target.value);
        setMediaTime(playhead);
        audioPlayerRef.current.currentTime = playhead;
      };

      const onChangeSpeed = (newSpeed) => {
        audioPlayerRef.current.playbackRate = newSpeed;
      };

    return (
      <div>
        <div className="custom-audio-player">
          <div className="action-bar">
            <div className="play">
              {isPlaying ? (
                <button className="play-pause" onClick={togglePlaying}>
                  <img src={PauseIcon} alt={PauseIcon} />
                  Click pause to stop listening
                </button>
              ) : (
                <button className="play-pause" onClick={togglePlaying}>
                  <img src={PlayIcon} alt={PlayIcon} />
                  Click play to listen to the blog
                </button>
              )}
            </div>
            <div className="speed-rate">
              <select>
                <option value="1">1X</option>
                <option value="2">1.5X</option>
                <option value="2">2X</option>
              </select>
            </div>
          </div>
          <div className="progress-track">
            <p>{mediaTime}</p>
            <input
              type="range"
              id="track"
              value={mediaTime}
              min={0}
              max={duration}
              onChange={onTrackChange}
            //   aria-valuetext={`${mediaTime} seconds`}
            />
            <p>{duration}</p>
          </div>
        </div>
        <audio
          ref={audioPlayerRef}
          src={Song}
          controls
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    );
};

export default AudioPlayer;