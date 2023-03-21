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
    
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active'); // we added input to the dropdown
    for (let movie of movies) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        const div = document.createElement('div');
    
        div.innerHTML = `
          <img src="${imgSrc}" />
          ${movie.Title}
        `;
    
        resultsWrapper.appendChild(div);
    }
}
input.addEventListener('input',debounce(onInput,1000));

document.addEventListener('click',event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active')
    }
})
