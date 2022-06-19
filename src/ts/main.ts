
import { Pokemon } from './models/Pokemon.js'
import { PokemonData } from './interfaces/pokemon-interface.js';

let getBtn = document.querySelector("#getPokemon") as HTMLButtonElement
let img = document.querySelector('#pokemon-image') as HTMLImageElement
let options = document.querySelector('.options') as HTMLUListElement
let pokemonName = document.querySelector('.pokemon-name') as HTMLHeadingElement

window.addEventListener('load', updatePokemons)

getBtn?.addEventListener('click', updatePokemons)

options?.addEventListener('click', (event) => {
    let element: HTMLButtonElement
    element = event.target as HTMLButtonElement
    if (element.innerText == img.dataset.name) {
        img.classList.remove('pokemon-hidden')
        img.classList.add('pokemon-visible')
        pokemonName.classList.add('visible')
        pokemonName.textContent = `Its's ${element.innerText}!`
        options.innerHTML = ''
        options.append(createButton(`Play again!`, updatePokemons))
        options.append(createButton(`See in Pokedex`))
    }
})

async function updatePokemons() {

    options.innerHTML = ''
    pokemonName.classList.remove(`visible`)
    let selected: number
    selected = randomBeetwen(1, 3)

    for (let index = 0; index <= 2; index++) {
        let pokemon: Pokemon
        pokemon = await getPokemon()
        if (index == selected) {
            if (img) {
                img.src = pokemon.image
                img.dataset.name = pokemon.name
                img.classList.remove('pokemon-visible')
                img.classList.add('pokemon-hidden')
            }
        }
        options.append(createButton(pokemon.name) as HTMLButtonElement)
    }
}
function randomBeetwen(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
}

async function getPokemon(): Promise<Pokemon> {
    let request: PokemonData
    request = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${randomBeetwen(1, 150)}`)).json()
    return new Pokemon(request.name, request.sprites.other!['official-artwork'].front_default)
}

function createButton(text: string, click: Function | null = null): HTMLButtonElement {
    let b = document.createElement(`button`) as HTMLButtonElement
    b.textContent = text
    if(click){
        b.addEventListener('click', ()=> click())
    }
    return b
}