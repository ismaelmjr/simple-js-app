let pokemonRepository = (function () {
  //  Create an array within a pokemonRepository called pokemonList,
  //    and add the pokemon using objects.
  let pokemonList = [
    { name: 'Balbasaur', height: 7, type: ['grass', 'poison'] },
    { name: 'Charmander', height: 6, type: 'fire' },
    { name: 'Squirtle', height: 5, type: 'water' },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    return pokemonList.push(item);
  }

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

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addEventListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon.name);
    });
  }
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

// Create a loop using the forEach predifined function to iterate through the array list within the pokemon repository created above. Only rechable by calling the function getAll(); within the line of code.
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
