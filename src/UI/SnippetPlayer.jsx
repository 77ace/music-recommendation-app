import FeatherIcon from "feather-icons-react";
import React from "react";

export const SnippetPlayer = ({ track, handlePlay, isPlaying }) => {
  return (
    <button onClick={handlePlay}>
      <div className="ml-3 flex h-14 min-w-14 items-center justify-center rounded-xl bg-green-700 transition hover:bg-green-800">
        <FeatherIcon fill="white" icon={isPlaying ? "pause" : "play"} />
      </div>
    </button>
  );
};
