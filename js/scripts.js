let pokemonRepository = (function () {
  //  Create an array within a pokemonRepository called pokemonList,
  //    and add the pokemon using objects.
  let pokemonList = [];

  // create a variable with the external api link.
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  let filter = document.querySelector('#filter');

  //Filter Pokemon event
  filter.addEventListener('input', function () {
    let pokemons = document.querySelectorAll('.list-group-item');
    let value = filter.value.toLowerCase();

    pokemons.forEach(function (pokemon) {
      if (pokemon.innerText.toLowerCase().indexOf(value) > -1) {
        pokemon.style.display = '';
      } else {
        pokemon.style.display = 'none';
      }
    });
  });

  //Get all function returns the pokemonlist array.
  function getAll() {
    return pokemonList;
  }
  // The add item function lets you add a pokemon to the list.
  function add(item) {
    return pokemonList.push(item);
  }

  //Created a panel of buttons for the pokemon to be displayed. And used a event listener for the button.
  function addListItem(pokemon) {
    let unOrderedList = document.querySelector('ul');
    unOrderedList.classList.add('row');
    let listItem = document.createElement('li');
    listItem.classList.add(
      'list-group-item',
      'col-xl-3',
      'col-lg-4',
      'col-md-6'
    );
    let button = document.createElement('button');
    button.classList.add('btn', 'button-styles');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    button.innerText = pokemon.name;

    listItem.appendChild(button);
    unOrderedList.appendChild(listItem);

    addEventListener(button, pokemon);
  }

  // Created an event listener for the pokemon button.
  function addEventListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // Created a function to show the pokemon's details.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Created a modal to display each pokemon and details.
  function showModal(pokemon) {
    let modalBody = document.querySelector('.modal-body');

    modalBody.innerText = '';

    let titleElement = document.querySelector('.modal-title');
    titleElement.innerText = pokemon.name;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.classList.add('pokemon-height');
    pokemonHeight.innerText = 'Heigth:' + pokemon.height;

    let pokemonImage = document.createElement('img');
    pokemonImage.classList.add('img-fluid');
    pokemonImage.src = pokemon.imageUrl;

    // created an array to store the type objects.
    let pokemonTypes = [];

    //Looped through the type array using for each.
    Object.keys(pokemon.type).forEach((key) => {
      pokemonTypes.push(pokemon.type[key].type.name);
    });

    let pokemonType = document.createElement('p');
    pokemonType.classList.add('pokemon-type');
    pokemonType.innerText = 'Type: ' + pokemonTypes;

    //created an array to store abilities.
    let pokemonAbilities = [];

    Object.keys(pokemon.abilities).forEach((key) => {
      pokemonAbilities.push(pokemon.abilities[key].ability.name);
    });

    let pokemonAbility = document.createElement('p');
    pokemonAbility.classList.add('pokemon-ability');
    pokemonAbility.innerText = 'Abilities: ' + pokemonAbilities;

    let pokemonWeight = document.createElement('p');
    pokemonWeight.classList.add('pokemon-weight');
    pokemonWeight.innerText = 'Weight: ' + pokemon.weight;

    modalBody.appendChild(pokemonImage);
    modalBody.appendChild(pokemonWeight);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonType);
    modalBody.appendChild(pokemonAbility);
  }

  //Created a function promise to load the pokemon list by fetching it from an external api.
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Created a function promise to load the pokemon deatils from an external api.
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.type = details.types;
        item.abilities = details.abilities;
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Create a loop using the forEach predifined function to iterate through the array list within the pokemon repository created above. Only rechable by calling the function getAll(); within the line of code.
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
