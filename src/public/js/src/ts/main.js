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
import anime from '../../node_modules/animejs/lib/anime.es';
let getBtn = document.querySelector("#getPokemon");
let img = document.querySelector('#pokemon-image');
let options = document.querySelector('.options');
getBtn === null || getBtn === void 0 ? void 0 : getBtn.addEventListener('click', updatePokemons);
options === null || options === void 0 ? void 0 : options.addEventListener('click', (event) => {
    let element;
    element = event.target;
    if (element.innerText == img.dataset.name) {
        img.classList.remove('pokemon-hidden');
    }
});
function updatePokemons() {
    return __awaiter(this, void 0, void 0, function* () {
        let selected;
        selected = randomBeetween(1, 3);
        for (let index = 0; index <= 2; index++) {
            let pokemon;
            pokemon = yield getPokemon();
            if (index == selected) {
                if (img) {
                    img.src = pokemon.image;
                    img.dataset.name = pokemon.name;
                    img.classList.add('pokemon-hidden');
                }
            }
            let btn = document.querySelector(`#btn${index + 1}`);
            btn.innerText = pokemon.name;
            animationIn();
        }
    });
}
function randomBeetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        let request;
        request = yield (yield fetch(`https://pokeapi.co/api/v2/pokemon/${randomBeetween(1, 150)}`)).json();
        return new Pokemon(request.name, request.sprites.other['official-artwork'].front_default);
    });
}
function animationIn() {
    anime({
        targets: '.pokemon-image',
        translateX: [250, 0]
    });
}
//# sourceMappingURL=main.js.map