import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Wave from "@foobar404/wave";

// Local components
import PrevBtn from "./components/PrevBtn";
import PlayBtn from "./components/PlayBtn";
import NextBtn from "./components/NextBtn";
import audios from "./statics/audios";
import WaveOptions from "./components/WaveOptions";
import ColorPallets from "./components/ColorPallets";

function App() {
  // Audio element state container
  const songRef = useRef(null);

  // Wave element initiation state
  const [wave] = useState(new Wave());

  // Bar value state
  const [barValue, setBarValue] = useState(0);

  // Current index of audios state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Is paused? button state
  const [isPaused, setIsPaused] = useState(true);

  // Has changed? audio element state
  const [hasChanged, setHasChanged] = useState(false);

  // Object of current song
  const currentSong = audios[currentIndex];

  // Wave type state container
  const [waveType, setWaveType] = useState("flower");

  // Wave colors state container
  const [waveColors, setWaveColors] = useState(["#000000", "#ffffff"]);

  useEffect(() => {
    // Audio loaded DOM
    window.document
      .getElementById("audioElement")
      .addEventListener("loadedmetadata", (e) => {
        // Define songRef as audiio element
        songRef.current = e.target;
      });

    // Wave element definition
    wave.fromElement("audioElement", "canvasElement", {
      type: waveType,
      colors: waveColors,
    });

    // Wave type on changed DOM
    window.document
      .getElementById("waveType")
      .addEventListener("change", (e) => {
        // Set wave type value
        setWaveType(e.target.value);
      });

    // Wave colorA on changed DOM
    window.document.getElementById("colorA").addEventListener("change", (e) => {
      // Set wave colorA valueA
      setWaveColors([e.target.value, waveColors[1]]);
    });

    // Wave colorB on changed DOM
    window.document.getElementById("colorB").addEventListener("change", (e) => {
      // Set wave colorB value
      setWaveColors([waveColors[0], e.target.value]);
    });
  }, [wave, waveType, waveColors]);

  // Changed audio track function
  const changedTrack = (value) => {
    const nextIndex = currentIndex + value;
    const firsIndex = 0;
    const lastIndex = audios.length - 1;

    if (nextIndex >= audios.length) {
      setCurrentIndex(firsIndex);
    } else if (nextIndex < firsIndex) {
      setCurrentIndex(lastIndex);
    } else {
      setCurrentIndex(nextIndex);
    }
    setHasChanged(true);
    setIsPaused(false);
  };

  // Generate background color
  const generatColor = () => {
    let hue = Math.ceil(Math.random() * (360 - 1) + 1);

    let saturation = Math.ceil(Math.random() * (90 - 10) + 10);
    let lightness = Math.ceil(
      (songRef.current?.duration / 280) * Math.random() * (90 - 10) + 10
    );

    let color = `hsl(${hue},${saturation}%,${lightness}%)`;

    return color;
  };

  return (
    <div
      className="root"
      style={{
        background: generatColor(),
        transition: "background .6s ease-in",
      }}
    >
      <div className="container">
        <div className="img-container">
          <LazyLoadImage
            effect="blur"
            placeholderSrc={currentSong.placeholder}
            src={currentSong.img}
            alt="404 not found"
            width="350px"
            className={`img ${!isPaused ? "animation-spin" : ""}`}
          ></LazyLoadImage>
          <canvas width="360px" height="360px" id="canvasElement" />
        </div>
        <div className="song-info">
          <h1 className="my-2">{currentSong.title}</h1>
          <p>{currentSong.singer}</p>
          <audio
            onEnded={() => {
              changedTrack(1);
            }}
            autoPlay={hasChanged}
            src={currentSong.src}
            id="audioElement"
            onTimeUpdate={() => setBarValue(songRef.current.currentTime)}
          />
        </div>
        <div>
          <input
            value={barValue}
            type="range"
            min={0}
            max={songRef.current?.duration}
            className="input"
            onChange={(e) => {
              songRef.current.currentTime = e.target.value;
            }}
          />
        </div>
        <div className="controller">
          <PrevBtn changedTrack={changedTrack} />
          <PlayBtn
            songRef={songRef}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />
          <NextBtn changedTrack={changedTrack} />
        </div>
        <div className="setting mt-3 p-3">
          <WaveOptions />
          <ColorPallets colorsValue={waveColors} />
        </div>
      </div>
    </div>
  );
}

export default App;
