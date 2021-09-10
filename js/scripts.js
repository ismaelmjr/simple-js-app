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

  return {
    getAll: getAll,
    add: add,
  };
})();

// Create a loop using the forEach predifined function to iterate through the array list within the pokemon repository created above. Only rechable by calling the function getAll(); within the line of code.
pokemonRepository.getAll().forEach(function (pokemon) {
  let pokemonName = pokemon.name;
  let pokemonHeight = pokemon.height;

  if (pokemonHeight >= 7) {
    document.write(
      '<p>' +
        pokemonName +
        ' ' +
        '(Height: ' +
        pokemonHeight +
        ')' +
        " - Wow that's big!" +
        '</p>'
    );
    console.log(
      pokemonName +
        ' ' +
        '(Height: ' +
        pokemonHeight +
        ')' +
        " - Wow that's big!"
    );
  } else {
    document.write(
      '<p>' + pokemonName + ' ' + '(Height: ' + pokemonHeight + ')' + '</p>'
    );
    console.log(pokemonName + ' ' + '(Height: ' + pokemonHeight + ')');
  }
});

// Created a for loop to iterate through the pokemon list.
// Added a conditional within the loop to display the pokemon with a height
// greater than 7.

// for (let i = 0; i < pokemonList.length; i++) {
//   // Created variables containing each pokemon height and name.
//   let pokemonName = pokemonList[i].name;
//   let pokemonHeight = pokemonList[i].height;

//   if (pokemonHeight >= 7) {
//     document.write(
//       '<p>' +
//         pokemonName +
//         ' ' +
//         '(Height: ' +
//         pokemonHeight +
//         ')' +
//         " - Wow that's big!" +
//         '</p>'
//     );
//   } else {
//     document.write(
//       '<p>' + pokemonName + ' ' + '(Height: ' + pokemonHeight + ')' + '</p>'
//     );
//   }
// }
