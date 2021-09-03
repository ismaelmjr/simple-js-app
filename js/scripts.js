//    Create an array called pokemonList,
//    and add the pokemon using objects.

let pokemonList = [
  { name: 'Balbasaur', height: 7, type: ['grass', 'poison'] },
  { name: 'Charmander', height: 6, type: 'fire' },
  { name: 'Squirtle', height: 5, type: 'water' },
];

// Created a for loop to iterate through the pokemon list.
// Added a conditional within the loop to display the pokemon with a height
// greater than 7.

for (let i = 0; i < pokemonList.length; i++) {
  // Created variables containing each pokemon height and name.
  let pokemonName = pokemonList[i].name;
  let pokemonHeight = pokemonList[i].height;

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
  } else {
    document.write(
      '<p>' + pokemonName + ' ' + '(Height: ' + pokemonHeight + ')' + '</p>'
    );
  }
}
