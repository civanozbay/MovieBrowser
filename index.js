//3a4f6c19
//http://www.omdbapi.com/?apikey=3a4f6c19&

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: { // this object turn into string and add end of the url. One of the advantages of axios library.
            apikey : '3a4f6c19',
            s : searchTerm
            // i : 'tt0848228'
        }
    });
    if(response.data.Error){
        return [];
    }

    return response.data.Search;
}
const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;


const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');



// FIRST IMPLEMENTATION BEFORE CREATING DEBOUNCE FUNCTION
// let timeoutId;
// const onInput = event => {
//     if(timeoutId){ //we grab the int and stop the execution according to that. if timeoutId is not undefined clear the current timeout execution.
//         clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout( () =>{ // this func return id as an integer
//         fetchData(event.target.value)},1000)
// }
// input.addEventListener('input',onInput)

const onInput =  async event => {
    // define 
    const movies = await fetchData(event.target.value); // we can get access to value through target.value 
    if(!movies.length){
        dropdown.classList.remove('is-active')
    }

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active'); // we are opening to dropdown with adding to classlist
    for (let movie of movies) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        const div = document.createElement('a');
        
        div.classList.add('dropdown-item'); 
        div.innerHTML = `
          <img src="${imgSrc}" />
          ${movie.Title}
        `;
        div.addEventListener('click',() => { 
            dropdown.classList.remove('is-active');
            input.value=movie.Title;
            onMovieSelect(movie);
        })
        resultsWrapper.appendChild(div);
    }
}
input.addEventListener('input',debounce(onInput,1000));

document.addEventListener('click',event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active')
    }
})
const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: { // this object turn into string and add end of the url. One of the advantages of axios library.
            apikey : '3a4f6c19',
            i : movie.imdbID
        }
    })
    document.querySelector('#summary').innerHTML = movieTemplate(response.data)
};

const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
    `
}