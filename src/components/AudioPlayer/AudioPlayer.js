import React, { useEffect, useRef, useState } from "react";
import Song from "../../assets/audio/Kesariya.mp3";
import PauseIcon from "../../assets/icon/Pause.svg";
import PlayIcon from "../../assets/icon/play.png";
import "./AudioPlayer.scss";

const AudioPlayer = () => {
  const audioPlayerRef = useRef(null);
  const progressTrackRef = useRef(null); // reference our progress bar

  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaTime, setMediaTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlaying = (event) => {
    setIsPlaying(!isPlaying);
    const audioPlayer = audioPlayerRef.current;
    isPlaying ? audioPlayer.pause() : audioPlayer.play();
  };

  const onTimeUpdate = () => {
    setMediaTime(Math.floor(audioPlayerRef.current.currentTime));
  };

  const onLoadedMetadata = () => {
    setDuration(Math.floor(audioPlayerRef.current.duration));
  };

  const onTrackChange = (event) => {
    const playhead = parseFloat(event.target.value);
    setMediaTime(playhead);
    audioPlayerRef.current.currentTime = playhead;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeProgressTrackColor = () => {
    progressTrackRef.current.style.setProperty(
      "--track-before-width",
      `${(progressTrackRef.current.value / duration) * 100}%`
    );
  };

  useEffect(() => {
    changeProgressTrackColor();
  }, [changeProgressTrackColor]);

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
              </button>
            ) : (
              <button className="play-pause" onClick={togglePlaying}>
                <img src={PlayIcon} alt={PlayIcon} />
              </button>
            )}
            {isPlaying ? (
              <p>Click pause to stop listening</p>
            ) : (
              <p>Click play to listen to the blog</p>
            )}
          </div>
          <div className="speed-rate">
            <select onClick={(e) => onChangeSpeed(e.target.value)}>
              {[1, 1.5, 2].map((speedOption, i) => (
                <option key={i} value={speedOption}>
                  {speedOption}X
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="progress-track">
          <p>{formatTime(mediaTime)}</p>
          <input
            type="range"
            id="track"
            value={mediaTime}
            min={0}
            max={duration}
            ref={progressTrackRef}
            onChange={onTrackChange}
          />
          <p>{duration && !isNaN(duration) && formatTime(duration)}</p>
        </div>
      </div>
      <audio
        ref={audioPlayerRef}
        src={Song}
        // controls
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
