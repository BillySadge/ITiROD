let track_list = [
    {
        id: "1",
        name: "Space Song",
        artist: "Beach House",
        image: "../assets/img/beachHouse.jpg",
        path: "../assets/songs/Space_Song.mp3",
        isFavorite: true,
        album: "Depression Cherry",
        date: "November 10 2014",
        time: "5:20"
    },
    {
        id: "2",
        name: "Drowning",
        artist: "Vague003",
        image: "../assets/img/drowning.jfif",
        path: "../assets/songs/Drowning.mp3",
        isFavorite: false,
        album: "Death Charger",
        date: "2 January 2018",
        time: "2:02"
    },
    {
        id: "3",
        name: "Washing Machine Heart",
        artist: "Mitski",
        image: "../assets/img/mitski.jpg",
        path: "../assets/songs/Washing_Machine_Heart.mp3",
        isFavorite: true,
        album: "Be the Cowboy",
        date: "November 9 2018",
        time: "3:12"
    },
    {
        id: "4",
        name: "Recover",
        artist: "Chvrches",
        image: "../assets/img/Recover.jpg",
        path: "../assets/songs/Chvrches_Recover.mp3",
        isFavorite: false,
        album: "Recover EP",
        date: "25 March 2013",
        time: "3:45"
    },
    {
        id: "5",
        name: "The Youth",
        artist: "MGMT",
        image: "../assets/img/mgmt.jpg",
        path: "../assets/songs/MGMT_Youth.mp3",
        isFavorite: false,
        album: "Oracular Spectacular",
        date: "17 October 2008",
        time: "3:48"
    },
    {
        id: "6",
        name: "Electric Feel",
        artist: "MGMT",
        image: "../assets/img/mgmt.jpg",
        path: "../assets/songs/MGMT_Electric_Feel.mp3",
        isFavorite: false,
        album: "Oracular Spectacular",
        date: "17 October 2008",
        time: "2:43"
    },
    {
        id: "7",
        name: "Tom's Diner",
        artist: "Suzanne Vega",
        image: "../assets/img/Toms_Diner.jpg",
        path: "../assets/songs/Vega_Tom'sDiner.mp3",
        isFavorite: false,
        album: "Solitude Standing",
        date: "3 September 1987",
        time: "3:43"
    },
    {
        id: "8",
        name: "Char",
        artist: "Crystal Castles",
        image: "../assets/img/char.jpg",
        path: "../assets/songs/CC_Char.mp3",
        isFavorite: true,
        album: "Amnesty (I)",
        date: "August 19 2016",
        time: "3:08"
    },
    {
        id: "9",
        name: "Papercuts",
        artist: "Machine Gun Kelly",
        image: "../assets/img/mgk2.jpg",
        path: "../assets/songs/mgk_papercuts.mp3",
        isFavorite: true,
        album: "Fall Trends 2021",
        date: "May 16 2021",
        time: "3:00"
    },
    {
        id: "10",
        name: "KEROSENE",
        artist: "Crystal Castles",
        image: "../assets/img/crystal.jpg",
        path: "../assets/songs/CC_Kerosene.mp3",
        isFavorite: true,
        album: "III",
        date: "Novermber 12 12",
        time: "3:12"
    }
  
];


const playlists = [
    {
        id: "12",
        name: "single serving shithead",
        songs: [track_list[8],track_list[2], track_list[0],track_list[1]],
        isFavorite: true,
    },
    {
        id: "13",
        name: "The Breakfast club",
        songs: [track_list[1], track_list[0]],
        isFavorite: false,

    },
    {
        id: "14",
        name: "I'm tired of making names",
        songs: [track_list[9],track_list[7], track_list[6]],
        isFavorite: false,

    },
    {
        id: "15",
        name: "I'm tired of making names",
        songs: [track_list[2], track_list[4],track_list[5]],
        isFavorite: false,

    },
    {
        id: "16",
        name: "I'm tired of making names",
        songs: [track_list[4],track_list[1], track_list[3],track_list[7]],
        isFavorite: false,

    },
    {
        id: "17",
        name: "I'm tired of making names",
        songs: [track_list[7], track_list[1],
        track_list[2], track_list[3],
        track_list[4], track_list[5],
        track_list[6], track_list[0]],
        isFavorite: false,
    },
    
]





const tableInner = `
<thead>
<tr>
  <th scope="col">#</th>
  <th scope="col"></th>
  <th scope="col">Title</th>
  <th scope="col">Album</th>
  <th scope="col">Date</th>
  <th scope="col">Time</th>
  <th scope="col"></th>
</tr>
</thead>
<br/>
<tbody id="body-table" class="font-table">
<tr>
  
</tr>
</tbody>`;


