import React from "react";

export default function PlayBtn({ isPaused, songRef, setIsPaused }) {
  return (
    <>
      {isPaused ? (
        <svg
          onClick={() => {
            songRef.current.play();
            setIsPaused(!isPaused);
          }}
          className="btn btn-play-pause"
          fill="#fff"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          onClick={() => {
            songRef.current.pause();
            setIsPaused(!isPaused);
          }}
          className="btn btn-play-pause"
          fill="#fff"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </>
  );
}
