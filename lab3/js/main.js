
// import {track_list} from 'data.js'

// let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let repeat_btn = document.querySelector(".fa-repeat");
let fav_btn = document.querySelector(".bottom-heart");  
let entbtn = document.querySelector(".favorite-button");

let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let isRepeat = false;
let isFav = false;
let updateTimer;

let curr_track = document.createElement('audio');
const favoriteSongs = favFilter(track_list);






function random_bg_color() {

  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  let gradient = "linear-gradient(180deg, " + bgColor + "0%, rgba(18,18,18,1) 50%)";
  let element = document.getElementById("main");  
  // element.style.transition = "all 2s linear";
  // element.style.background = bgColor;

  try{
    element.style.background = gradient;
  }
  finally{

  }

}

function loadTrack(track_index) {
  
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ") ";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  if (track_list[track_index].isFavorite){
    fav_btn.style = "color:rgb(40, 186, 20);";
  }else{
    fav_btn.style = "color: #d3d0d0";
  }
  
//   now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function repeatSong(){
  if (isRepeat == false){
    isRepeat = true;
    curr_track.loop = true;
    repeat_btn.style = "color: rgb(40, 186, 20);";
  }else{
    isRepeat = false;
    curr_track.loop = false;
    repeat_btn.style = "color: #d3d0d0";
  }
}

function addToFav(){
  if (isFav == false){
    isFav = true;
    track_list[track_index].isFavorite = true;
    fav_btn.style = "color:rgb(40, 186, 20);";
  }else{
    track_list[track_index].isFavorite = false;
    isFav = false;
    fav_btn.style = "color: #d3d0d0";
  }
  try{
  favoriteSongs = favFilter(track_list);
  filltheContentOfLibrary();
  }
  finally{
  fillPlaylistPage(track_list,false);
  }

}

function shuffleSongs(){
  shuffle(track_list);
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


loadTrack(track_index);


function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
  
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa-solid fa-circle-pause">';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa-solid fa-circle-play">';
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}













function addAnother() {
    let ul = document.getElementById("playlist-list");
    let li = document.createElement("li");
    let children = ul.children.length + 1
    li.setAttribute("id", "playlist"+children)
    let liInner = `<a href=\"#favorite\"><span onclick="startEditing(this)" onblur="this.contentEditable=false;" class="editable-name"> <i>playlist ${children}</i></span></a>`
    li.innerHTML = liInner
    ul.appendChild(li)
}


function fillPlaylistPage(songs, isFav){

try{
  const table = document.getElementById("empty-table");
  table.innerHTML = tableInner;
  const songCount = document.getElementById("song-count");
  const playlistName = document.getElementById("playlist-name");
  const playlistImg = document.getElementById("playlist-img");
  let index = 0;
  songs.forEach(element => {
    
    if(element.isFavorite == true){
      let row = table.insertRow();
      let num = row.insertCell(0);
      num.innerHTML = ++index;
      let img = row.insertCell(1);
      img.innerHTML = `<img src=${element.image} alt="" width="50px">`;
      let name = row.insertCell(2);
      name.innerHTML = `<div class="table-title">
      ${element.name}
    </div>
    <div class="table-title-description font-xs-grayed">
      ${element.artist}
    </div>`
      let album = row.insertCell(3);
      album.innerHTML = element.album;
      let date = row.insertCell(4);
      date.innerHTML = element.date;
      let time = row.insertCell(5);
      time.innerHTML = element.time;
      let icon = row.insertCell(6);
      icon.innerHTML = `<i class="fa-solid fa-ellipsis"></i>`;
    }
  });


  songCount.innerHTML = index + " Songs";
  playlistImg.src = `${songs[0].image}`;
}
finally{

}
}


function filltheContentOfLibrary(){
  let box = document.getElementById("liked-box");

  box.innerHTML = `<div class="fav-songs-details">
  <span class="display-songs font-md-grayed"
    >${track_list[0].name.toLocaleLowerCase()} by ${track_list[0].artist.toLocaleLowerCase()} 
    * ${track_list[1].name.toLocaleLowerCase()} by ${track_list[1].artist.toLocaleLowerCase()} 
    * ${track_list[2].name.toLocaleLowerCase()} by ${track_list[2].artist.toLocaleLowerCase()}
  </span>
  <span class="fav-songs font-md-white">favorite songs</span>
  <span class="songs-number font-sm-white">${favoriteSongs.length} favorite songs</span>
</div>`;
  
}



function favFilter(songs){
  newSongs = [];
  for (i = 0; i < songs.length; i++){
    if (songs[i].isFavorite == true){
        newSongs.push(songs[i]);
    }
  }
  return newSongs;
}

function startEditing(element){
  element.contentEditable=true;
  setTimeout(function() {
    if (document.activeElement !== element) {
      element.contentEditable = false;
    }
  }, 300);

}