const track_list = [
    {
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
        name: "Recover",
        artist: "Chvrches",
        image: "../assets/img/Recover.jpg",
        path: "../assets/songs/Chvrches_Recover.mp3",
        isFavorite: false,
        album: "Recover EP",
        date: "25 March 2013",
        time: "3:45"
    }
  
];

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
