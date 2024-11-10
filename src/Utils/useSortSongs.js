//this custom hook will take the results and sort the songs

const useSortSongs = (targetFeatures, songList) => {
  let sortedSongs = []; //buffer array

  //normalize target tempo value
  let normalizedTargetTempo = normalizeTempo(targetFeatures.target_tempo);
  if (targetFeatures.target_popularity !== "Any")
    var normalizedTargetPopularity = normalizePopularity(targetFeatures.target_popularity);

  //iterate through the songs
  songList.forEach((song) => {
    //before anything. check if explicit
    if (targetFeatures.includeExplicit == false && song.explicit == true) return; //skip this song

    //normalize values
    //tempo values
    let normalizedSongTempo = normalizeTempo(song.features.tempo);

    //scoring system based on distance
    let score = 0;
    score += Math.pow(targetFeatures.target_acousticness - song.features.acousticness, 2);
    score += Math.pow(targetFeatures.target_danceability - song.features.danceability, 2);
    score += Math.pow(targetFeatures.target_energy - song.features.energy, 2);
    score += Math.pow(targetFeatures.target_instrumentalness - song.features.instrumentalness, 2);
    score += Math.pow(targetFeatures.target_valence - song.features.valence, 2);
    score += Math.pow(normalizedTargetTempo - normalizedSongTempo, 2);
    score += Math.pow(targetFeatures.target_liveness - song.features.liveness, 2);

    //only when pop is not "Any" we add it to the score
    if (targetFeatures.target_popularity !== "Any") {
      let normalizedSongPopularity = normalizePopularity(song.popularity);
      score += Math.pow(normalizedTargetPopularity - normalizedSongPopularity, 2);
    }

    sortedSongs.push({ song, score });
  });

  //lowest score is to be first on the list
  sortedSongs.sort((a, b) => a.score - b.score);

  return sortedSongs;
};

//func to normalize tempo values to the range 0-1
const normalizeTempo = (tempoValue) => {
  return (tempoValue - 55) / (180 - 55);
};

//func to normalize popularity values to the range 0-1
const normalizePopularity = (popularityValue) => {
  //for traget values (string input)
  if (typeof popularityValue == "string") {
    if (popularityValue == "High") return 1;
    else if (popularityValue == "Mid") return 0.5;
    else if (popularityValue == "Low") return 0;
  }
  //for song values (number input)
  else return popularityValue / 100;
};

export default useSortSongs;
