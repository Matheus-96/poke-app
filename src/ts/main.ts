
import { Pokemon } from './models/Pokemon.js'
import { PokemonData } from './interfaces/pokemon-interface.js';

let getBtn = document.querySelector("#getPokemon") as HTMLButtonElement
let img = document.querySelector('#pokemon-image') as HTMLImageElement
let options = document.querySelector('.options') as HTMLUListElement
let pokemonName = document.querySelector('.pokemon-name') as HTMLHeadingElement
let imageContainer = document.querySelector('.image-container') as HTMLDivElement

window.addEventListener('load', ()=>writeFlavor("In the autumn spawning season, they can be seen swimming powerfully up rivers and creeks."))

function writeFlavor(text: String){
    let p = document.querySelector('.flavor-text') as HTMLParagraphElement
    p.textContent = ''
    if(p){
        let index = 0
        let writeText = setInterval(() => {
            p.textContent += text.charAt(index)
            index++
            if(index == text.length) clearInterval(writeText)
        }, 40);
    }
}

function validateAnswer (event: Event) {
    
    let element: HTMLButtonElement
    element = event.target as HTMLButtonElement

    if (element.textContent == `Play again!`) return

    if (element.innerText == img.dataset.name) {
        img.classList.remove('pokemon-hidden')
        img.classList.add('pokemon-visible')
        pokemonName.classList.add('visible')
        pokemonName.textContent = `Its's ${element.innerText}!`
        finishGame(true)
    } else {
        img.classList.add('pokemon-disappear')
        pokemonName.classList.add('visible-error')
        pokemonName.textContent = `Oh no! :(`
        finishGame()
    }
}

function finishGame(win: boolean = false) {
    options.innerHTML = ''
    options.append(createButton(`Play again!`, updatePokemons))
    if(win)options.append(createButton(`See in Pokedex`))
}

async function updatePokemons() {
    img.className = ''
    pokemonName.className = ''
    options.innerHTML = ''
    pokemonName.classList.remove(`visible`)
    let selected: number
    selected = randomBeetwen(0, 3)

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
        options.append(createButton(pokemon.name, validateAnswer) as HTMLButtonElement)
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
    if (click) {
        b.addEventListener('click', (event) => click(event))
    }
    return b
}