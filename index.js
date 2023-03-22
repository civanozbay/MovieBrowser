  const autoCompleteConfig ={
    renderOption(movie){
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
        `;
    },
    inputValue(movie){
        return movie.Title;
    },
    async fetchData (searchTerm){
        const response = await axios.get('http://www.omdbapi.com/', {
          params: {
            apikey: 'd9835cc5',
            s: searchTerm
          }
        });
      
        if (response.data.Error) {
          return [];
        }
        return response.data.Search;
      }
  };

  createAutoComplete({
    ...autoCompleteConfig, // take all the object and spread inside of this object
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden'); // when we add this class which is coming from Buma tutorial gonna hidden 
      onMovieSelect(movie,document.querySelector('#left-summary'),'left');
    }
  });
  createAutoComplete({
    ...autoCompleteConfig, // take all the object and spread inside of this object
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden'); // when we add this class which is coming from Buma tutorial gonna hidden 
      onMovieSelect(movie,document.querySelector('#right-summary'),'right');
    }
  });

  let rightMovie ;
  let leftMovie ;

  const onMovieSelect = async (movie,summaryElement,side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 'd9835cc5',
        i: movie.imdbID
      }
    });
  
    summaryElement.innerHTML = movieTemplate(response.data);
    if(side==='right'){
        rightMovie= response.data;
    }else{
        leftMovie = response.data;
    }
    if(leftMovie && rightMovie){
        runComparison()
    }
  };
  const runComparison = () => {
    //taking all the elements inside of left and right autocomplete
    const leftSideStats = document.querySelectorAll('#left-summary .notification') 
    const rightSideStats = document.querySelectorAll('#right-summary .notification')

    leftSideStats.forEach((leftStat,index) => {
        const rightStat =rightSideStats[index];
        
        const leftSideValue = parseInt(leftStat.dataset.value); //dataset.value return string
        const rightSideValue = parseInt(rightStat.dataset.value);

        if(leftSideValue>rightSideValue){
            rightStat.classList.remove('is-primary'); //coming from bulma css
            rightStat.classList.add('is-warning');
        }else{
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        }
    })
  }
  
  const movieTemplate = movieDetail => {
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g,'').replace(/,/g,''));
    const metascore = parseInt(movieDetail.Metascore);
    const imdbScore = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g,''));
    
    const awards = movieDetail.Awards.split(' ').reduce((prev,word)=>{
        const value  = parseInt(word)

        if(isNaN(value)){
            return prev;
        }else{
            return prev + value
        }
    },0);


    return `
      <article class="media">
        <figure class="media-left">
          <p class="image">
            <img src="${movieDetail.Poster}" />
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
      <article data-value=${awards} class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
      </article>
      <article data-value=${dollars} class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
      </article>
      <article data-value=${metascore} class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
      </article>
      <article data-value=${imdbScore} class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
      </article>
      <article data-value=${imdbVotes} class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
      </article>
    `;
  };
  






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