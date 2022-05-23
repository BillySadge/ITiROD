
const pageTitle = "Music Player";
const routes = {
	404: {
		template: "/templates/Home.html",
		title: "Home | " + pageTitle,
		description: "This is the 404 page ",
	},
	home: {
		template: "/templates/Home.html",
		title: "Home | " + pageTitle,
		description: "This is the home page",
	},
	library: {
		template: "/templates/Library.html",
		title: "Library | " + pageTitle,
		description: "This is the library page",
	},
	search: {
		template: "/templates/Search.html",
		title: "Search | " + pageTitle,
		description: "This is the search page",
	},
	playlist:{
		template: "/templates/test.html",
		title: "Playlist | " + pageTitle,
		description: "This is the playlist page",
	},
	favorite: {
		// template: "/templates/Favorite.html",
		// template: "/templates/Favorite.html",
		template: "/templates/test.html",
		title: "Favorite | " + pageTitle,
		description: "This is the favorite page",
	},
};

const locationHandler = async () => {
	var location = window.location.hash.replace("#", "");
	if (location.length == 0) {
		location = "/";
	}
	const route = routes[location] || routes["404"];
	const html = await fetch(route.template).then((response) => response.text());
	document.getElementById("content").innerHTML = html;
	let username = localStorage.getItem("uname");
   	document.getElementById("username-acc").innerText = username;
	document.querySelector(".logout").addEventListener("click", (e) => {
		auth.logOut();
	});
	document.title = route.title;
	document
		.querySelector('meta[name="description"]');
	
	

	try{
		filltheContentOfLibrary();

	}
	finally{
		scriptLoader();
		fillPlaylistPage(track_list, true);
	}
	
};

const scriptLoader = async () => {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://www.kryogenix.org/code/browser/sorttable/sorttable.js";
	document.getElementsByTagName("head")[0].appendChild(script);


	


}


window.addEventListener("hashchange", locationHandler);
locationHandler();


