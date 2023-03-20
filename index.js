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
    console.log(response.data);
}

const input = document.querySelector('input');


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

const onInput = event => {
    fetchData(event.target.value); // we can get access to value through target.value
}
input.addEventListener('input',debounce(onInput,1000));
