var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Pokemon } from './models/Pokemon.js';
let getBtn = document.querySelector("#getPokemon");
let img = document.querySelector('#pokemon-image');
let options = document.querySelector('.options');
let pokemonName = document.querySelector('.pokemon-name');
let imageContainer = document.querySelector('.image-container');
window.addEventListener('load', updatePokemons);
getBtn === null || getBtn === void 0 ? void 0 : getBtn.addEventListener('click', updatePokemons);
options === null || options === void 0 ? void 0 : options.addEventListener('click', (event) => {
    let element;
    element = event.target;
    if (element.textContent == `Play again!`)
        return;
    if (element.innerText == img.dataset.name) {
        img.classList.remove('pokemon-hidden');
        img.classList.add('pokemon-visible');
        pokemonName.classList.add('visible');
        pokemonName.textContent = `Its's ${element.innerText}!`;
        finishGame(true);
    }
    else {
        img.classList.add('pokemon-disappear');
        pokemonName.classList.add('visible-error');
        pokemonName.textContent = `Oh no! :(`;
        finishGame();
    }
});
function finishGame(win = false) {
    options.innerHTML = '';
    options.append(createButton(`Play again!`, updatePokemons));
    if (win)
        options.append(createButton(`See in Pokedex`));
}
function updatePokemons() {
    return __awaiter(this, void 0, void 0, function* () {
        img.className = '';
        pokemonName.className = '';
        options.innerHTML = '';
        pokemonName.classList.remove(`visible`);
        let selected;
        selected = randomBeetwen(0, 3);
        for (let index = 0; index <= 2; index++) {
            let pokemon;
            pokemon = yield getPokemon();
            if (index == selected) {
                if (img) {
                    img.src = pokemon.image;
                    img.dataset.name = pokemon.name;
                    img.classList.remove('pokemon-visible');
                    img.classList.add('pokemon-hidden');
                }
            }
            options.append(createButton(pokemon.name));
        }
    });
}
function randomBeetwen(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        let request;
        request = yield (yield fetch(`https://pokeapi.co/api/v2/pokemon/${randomBeetwen(1, 150)}`)).json();
        return new Pokemon(request.name, request.sprites.other['official-artwork'].front_default);
    });
}
function createButton(text, click = null) {
    let b = document.createElement(`button`);
    b.textContent = text;
    if (click) {
        b.addEventListener('click', () => click());
    }
    return b;
}
//# sourceMappingURL=main.js.map