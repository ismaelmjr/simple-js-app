let pokemonRepository = (function () {
  //  Create an array within a pokemonRepository called pokemonList,
  //    and add the pokemon using objects.
  let pokemonList = [];

  // create a variable with the external api link.
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Make the modal container a global varaible to use with any function.
  let modalContainer = document.querySelector('#modal-container');

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
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;

    button.classList.add('button');
    listItem.appendChild(button);
    unOrderedList.appendChild(listItem);

    addEventListener(button, pokemon);
  }

  // Created a function to show the pokemon's details.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  // Created a modal to display each pokemon and details.
  function showModal(pokemon) {
    // Reset any existing modal by clearing the modalContainer.
    modalContainer.innerHTML = '';

    //Created a div inside the modal container.
    let modal = document.createElement('div');
    modal.classList.add('modal');

    //Created a buttons to close the modal.
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    //Created a title for the modal and stored the pokemon's name in it.
    let titleElement = document.createElement('h1');
    titleElement.classList.add('pokemon-name');
    titleElement.innerText = pokemon.name;

    //Created an element storing the height of the pokemon.
    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;

    // created an array to story the type objects.
    let pokemonTypes = [];

    //Looped through the type array using for each.
    Object.keys(pokemon.type).forEach((key) => {
      pokemonTypes.push(pokemon.type[key].type.name);
    });

    // Created the element in wich the pokemon type will be displayed.
    let contentType = document.createElement('p');
    contentType.classList.add('pokemon-type');
    contentType.innerText = 'Type: ' + pokemonTypes;

    //Created an element to display the pokemon image.
    let container = document.querySelector('#image-container');
    let contentImage = document.createElement('img');
    contentImage.classList.add('content-image');
    contentImage.src = pokemon.imageUrl;

    //appended each new element created to it's parent element.
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(contentType);
    modal.appendChild(contentImage);
    modalContainer.appendChild(modal);

    //added the is-visible class to the modal when the function is called.
    modalContainer.classList.add('is-visible');
  }

  // Created a function to hide the modal.
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  //Created an event listener to close the modal using the escape key.
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  //Created an event listener to close the modal clicking on the overlay.
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //Created an event listener for the pokemon button.
  function addEventListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
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

  //Created a function promis to load the pokemon deatils from an external api.
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
    showModal: showModal,
  };
})();

// Create a loop using the forEach predifined function to iterate through the array list within the pokemon repository created above. Only rechable by calling the function getAll(); within the line of code.
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
