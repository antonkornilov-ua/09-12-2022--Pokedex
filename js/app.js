//name section
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
// shiny
const pokemonImageShiny = document.querySelector('.shiny_image');
const shinyBtn = document.querySelector('.shiny')

let searchPokemon = 1; 


// Fetch Section
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;    
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name.split('-')[0];
        pokemonNumber.innerHTML = data.id;
        if(data.id >= 650){
            pokemonImage.src = data['sprites']['front_default'];
            pokemonImageShiny.src = data['sprites']['front_shiny'];      
        } else {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            pokemonImageShiny.src =
                data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        }
        input.value = '';
        searchPokemon = data.id
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';

    }
}
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})
btnPrev.addEventListener('click', () =>{
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
    
})
btnNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})
renderPokemon(searchPokemon);

shinyBtn.addEventListener('click', () => {
    if(pokemonImage.style.display == 'block'){
        pokemonImageShiny.style.display = 'block';
        pokemonImage.style.display = 'none';
    } else {
        pokemonImage.style.display = 'block';
        pokemonImageShiny.style.display = 'none';
    }
});


