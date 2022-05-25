function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("site-search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("search-page");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    genres = document.getElementById("genres-header");
    genresCards = document.getElementById("genre-cards");
    cardsContainer = document.getElementById("search-page");
    genres.style.display = "none";
    genresCards.style.display = "none";
    // cardsContainer.style = "";
    // cardsContainer.style = `
    // @media only screen and (max-width: 600px) {
    //     .main-card .small-cards-container {
    //         /* grid-template-columns: minmax(1rem,1fr);
    //         /* grid-template-columns: 1fr; */
    //         /* justify-items: center; */ 
    //         display: grid;
    //         grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    //         gap: 2rem;
    //     }
    //     /* .account{
    //         position: absolute;
    //         right:1rem;
    //     } */
    // }`;


}