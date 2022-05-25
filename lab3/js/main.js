
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
// let entbtn = document.querySelector(".favorite-button");
// let playlistButtonFav = document.querySelector(".playlist-favorite")

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
let favoriteSongs = favFilter(track_list);
let favoritePlaylists = favFilter(playlists);

// console.log(favoritePlaylists);




function random_bg_color() {

  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  let gradient = "linear-gradient(180deg, " + bgColor + "0%, rgba(18,18,18,1) 50%)";
  let element = document.getElementById("main");  


  if (element !== null){
      element.style.background = gradient;
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
  
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}
// function loadPlaylist(playlist,num){
//   clearInterval(updateTimer);
//   resetValues();
//   curr_track.src = playlist.songs[num].path;
//   curr_track.load();

//   track_art.style.backgroundImage = "url(" + playlist.songs[num].image + ") ";
//   track_name.textContent = playlist.songs[num].name;
//   track_artist.textContent = playlist.songs[num].artist;
//   if (playlist.songs[num].isFavorite){
//     fav_btn.style = "color:rgb(40, 186, 20);";
//   }else{
//     fav_btn.style = "color: #d3d0d0";
//   }
//   updateTimer = setInterval(seekUpdate, 1000);
//   curr_track.addEventListener("ended", nextTrack);
//   random_bg_color();
// }
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
  let srcTrack = curr_track.src.split("/assets");
  let paths = srcTrack[1];
  paths = "../assets" + paths;
  let found = track_list.find(element => element.path === paths);
  console.log(paths);
  if (isFav == false){
    isFav = true;
    // curr_track.isFavorite = true;
    track_list[track_list.indexOf(found)].isFavorite = true;
    fav_btn.style = "color:rgb(40, 186, 20);";
  }else{
    track_list[track_list.indexOf(found)].isFavorite = false;
    // curr_track.isFavorite = false;
    isFav = false;
    fav_btn.style = "color: #d3d0d0";
  }
  try{
  favoriteSongs = favFilter(track_list);
  // filltheContentOfLibrary(favoritePlaylists,favoriteSongs);
  }
  finally{
    updateStorage(favoriteSongs);
    if(window.location.href.includes("favorite") === true){
      fillFavPage(favoriteSongs);
    }
  }

}

function shuffleSongs(){
  shuffle(track_list);
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {

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
  else track_index = track_list.length - 1;
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


function updateStorage(songs){
  localStorage.removeItem("favorite_songs");
  localStorage.setItem("favorite_songs", JSON.stringify(songs));
}
function updatePlaylistStorage(playlists){
  localStorage.removeItem("favorite_playlists");
  localStorage.setItem("favorite_playlists",JSON.stringify(playlists));
}
function fillFavPage(songs){
  updateStorage(songs);
  const table = document.getElementById("empty-table");
  if (table !== null){
  table.innerHTML = tableInner;
  const songCount = document.getElementById("song-count");
  const playlistName = document.getElementById("playlist-name");
  const playlistImg = document.getElementById("playlist-img");
  let index = 0;

  songs.forEach(element => {
    if(element.isFavorite === true){
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

  if (track_list[track_index].isFavorite){
    fav_btn.style = "color:rgb(40, 186, 20);";
  }else{
    fav_btn.style = "color: #d3d0d0";
  }
}


function filltheContentOfLibrary(favPlaylists,favSongs){
  updatePlaylistStorage(favPlaylists);
  updateStorage(favSongs);
  let box = document.getElementById("liked-box");
  let songsStr = "";
  for (i = 0; i < 3 && i<favSongs.length; i++){
    songsStr += favSongs[i].name.toLocaleLowerCase() + " by " + favSongs[i].artist.toLocaleLowerCase() + " * ";
  }
  if (box !== null){
  box.innerHTML = `<div class="fav-songs-details">
  <span class="display-songs font-md-grayed">
    ${songsStr}
  </span>
  <span class="fav-songs font-md-white">favorite songs</span>
  <span class="songs-number font-sm-white">${favSongs.length} favorite songs</span>
</div>`;
  }
  let list = document.querySelector(".library-list");

  for (i = 0 ; i< favPlaylists.length;i++){
      let str = `
     
      <a href="#playlist/:${favPlaylists[i].id}">
        <section class="card-item">
          <div class="small-card-image">
            <img src=${favPlaylists[i].songs[0].image} alt="mgk" />
            <div class="play-button-overlay">
              <img src="../assets/img/play-button.png" alt="" />
            </div>
          </div>
          <span class="small-card-title">${favPlaylists[i].name}</span>
          <span class="small-card-details">${favPlaylists[i].songs[0].name}</span>
        </section>
      </a>
    `;
    let elem = document.createElement('div');
    elem.innerHTML = str;
    let li = document.createElement("li");
    li.setAttribute("class","small-card");
    li.appendChild(elem);
    list.appendChild(li);
  }
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



function fillPlaylistPage(songs,name,isFav){
  // updateStorage(songs);
  let favPlaylists = []
  for (i = 0 ; i < playlists.length; i++){
    if(playlists[i].isFavorite === true){
      favPlaylists.push(playlists[i]);
    }
  }
  updatePlaylistStorage(favPlaylists);
  const table = document.getElementById("empty-table");
  if (table !== null){
  table.innerHTML = tableInner;
  const songCount = document.getElementById("song-count");
  const playlistName = document.getElementById("playlist-name");
  const playlistImg = document.getElementById("playlist-img");
  let middle_heart = document.querySelector(".middle-heart");

  let index = 0;

  songs.forEach(element => {
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
  });
  
  
  songCount.innerHTML = index + " Songs";
  playlistImg.src = `${songs[0].image}`;
  playlistName.innerHTML = `${name}`;

  if(isFav === true){
      middle_heart.innerHTML = "";
      middle_heart.style = "color:rgb(40, 186, 20);";
  }else{
      middle_heart.innerHTML = "";
      middle_heart.style = "color: #d3d0d0";
  }
  
    
  }
  
}

function addToFavoritePlaylist(){
  let url = window.location.href.replace("#","");
  let middle_heart = document.querySelector(".middle-heart");
  let smth = url.split("/:");
  let current_id = smth[1];
  let found = playlists.find(element => element.id === current_id);
  console.log(current_id);
  if (found.isFavorite === false){
    found.isFavorite = true;
    middle_heart.innerHTML="";
    middle_heart.style = "color:rgb(40, 186, 20);";
  }else{
    found.isFavorite = false;
    middle_heart.innerHTML="";
    middle_heart.style = "color: #d3d0d0";
  }

  let favPlaylists = []
  for (i = 0 ; i < playlists.length; i++){
    if(playlists[i].isFavorite === true){
      favPlaylists.push(playlists[i]);
    }
  }
  console.log(favoritePlaylists); 
  updatePlaylistStorage(favPlaylists);

}




function rowHandler(isPlaylist){
  let url = window.location.href.replace("#","");
  let smth = url.split("/:");
  let current_id = smth[1]
  let found = playlists.find(element => element.id === current_id);
  let table = document.getElementById("empty-table");
  let rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length;i++){
    let currentRow = table.rows[i];
    let createClickHandler = function(row) {
      return function() {
        let cell = row.getElementsByTagName("td")[0];
        let ident = cell.innerHTML;
        if(isPlaylist){
          let song_index = track_list.find(element => element.id === found.songs[ident-1].id)
          
          // alert("id:" + song_index);
          // console.log(track_list.indexOf(song_index));
          loadTrack(track_list.indexOf(song_index));
          playTrack();
        }else{
          let favoriteSongs = favFilter(track_list);
          console.log(favoriteSongs[ident-1])
          loadTrack(track_list.indexOf(favoriteSongs[ident-1]));
          playTrack();
        }
        
      };
  }
  currentRow.onclick = createClickHandler(currentRow);
  }

  updateStorage(favoriteSongs);
}