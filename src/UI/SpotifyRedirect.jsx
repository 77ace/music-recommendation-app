import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FaSpotify } from "react-icons/fa";
export default function SpotifyRedirect({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      className="flex h-14 min-w-14 items-center justify-center rounded-xl bg-green-700 transition hover:bg-green-800"
    >
      <FaSpotify size={30} />
    </a>
  );
}
