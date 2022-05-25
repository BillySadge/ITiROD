
const pageTitle = "Music Player";
let playlistRoute = new RegExp()
const routes = {
	404: {
		template: "/templates/Home.html",
		title: "Home | " + pageTitle,
		description: "This is the 404 page ",
	},
	"home": {
		template: "/templates/Home.html",
		title: "Home | " + pageTitle,
		description: "This is the home page",
	},
	"library": {
		template: "/templates/Library.html",
		title: "Library | " + pageTitle,
		description: "This is the library page",
	},
	"search": {
		template: "/templates/Search.html",
		title: "Search | " + pageTitle,
		description: "This is the search page",
	},
	"playlist":{
		template: "/templates/Playlist.html",
		title: "Playlist | " + pageTitle,
		description: "This is the playlist page",
	},
	"favorite": {
		template: "/templates/Favorite.html",
		title: "Favorite | " + pageTitle,
		description: "This is the favorite page",
	},
};

function parseRequestURL() {

	let url = location.hash.replace("#","/");
	let r = url.split("/")
	let request = {
		resource    : null,
		playlistId  : null,
	}
	request.resource            = r[1]
	request.playlistId          = r[2]
	return request
}
const locationHandler = async () => {
	let location = window.location.hash.replace("#", "");
	if (location.length == 0) {
		location = "/";
	}

	let request = parseRequestURL();
	console.log(request);
	const route = routes[request.resource] || routes["404"];
	
	console.log(routes[location], location)
	const html = await fetch(route.template).then((response) => response.text());
	document.getElementById("content").innerHTML = html;
	let username = localStorage.getItem("uname");
   	document.getElementById("username-acc").innerText = username;
	document.querySelector(".logout").addEventListener("click", (e) => {
		auth.logOut();
	});
	document.title = route.title;
	document.querySelector('meta[name="description"]');
	
	let favSongsFromStorage = JSON.parse(localStorage.getItem("favorite_songs"));
	let favPlaylistFromStorage = JSON.parse(localStorage.getItem("favorite_playlists"));

	
	switch(request.resource){
		case 'favorite':
			if (favSongsFromStorage !== null){
				changeData(favSongsFromStorage);
				fillFavPage(favSongsFromStorage);

			}else{
				fillFavPage(favoriteSongs);
			}
			break;
		case 'library':
			if (favPlaylistFromStorage !== null && favSongsFromStorage !== null){
				changeData(favPlaylistFromStorage);	
				// changeData(favSongsFromStorage);
				filltheContentOfLibrary(favPlaylistFromStorage, favSongsFromStorage);
			}else{
				fillPlaylistPage(favoritePlaylists,favoriteSongs);
			}
			break;
		case 'playlist':
			const found = playlists.find(element =>(":" + element.id) === request.playlistId);
			if (favPlaylistFromStorage !== null){
				chagnePlaylistData(favPlaylistFromStorage);
				// changeData(favSongsFromStorage);
				fillPlaylistPage(found.songs,found.name,found.isFavorite);
			}else{
				fillPlaylistPage(found.songs,found.name,found.isFavorite);
			}
			break;
	}
	

	scriptLoader();
	
	
};

const scriptLoader = async () => {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://www.kryogenix.org/code/browser/sorttable/sorttable.js";
	document.getElementsByTagName("head")[0].appendChild(script);

}

function changeData(songs){
	for (i = 0; i<songs.length; i++){
		for (j = 0; j< track_list.length;j++){
			if(songs[i].id === track_list[j].id){
				track_list[j].isFavorite = true;
			}
		}
	}
	for (i = 0; i < track_list.length; i++){
		for(j = 0; j < songs.length; j++){
			if(track_list[i].id === songs[j].id){
				track_list[i].isFavorite = true;
				break;
			}else{
				track_list[i].isFavorite = false;
			}
		}
	}
}
function chagnePlaylistData(pFS){
	for (i = 0; i<pFS.length; i++){
		for (j = 0; j< playlists.length;j++){
			if(pFS[i].id === playlists[j].id){
				playlists[j].isFavorite = true;
			}
		}
	}
	for (i = 0; i < playlists.length; i++){
		for(j = 0; j < pFS.length; j++){
			if(playlists[i].id === pFS[j].id){
				playlists[i].isFavorite = true;
				break;
			}else{
				playlists[i].isFavorite = false;
			}
		}
	}
}
window.addEventListener("hashchange", locationHandler);
locationHandler();


