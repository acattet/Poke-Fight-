import {useState} from "react"; 
import axios from 'axios';
import styles from './styles.module.css';
export const SelectionScreen = () => {

const [pokemonName, SetPokemonName] = useState("")
const [pokemonChosen, setPokemonChosen] = useState(false);
const [pokemon, SetPokemon] = useState({
  name: "", 
  img: "", 
  hp: "",
  attack: "",
  defense: "",
})

const searchPokemon = () => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((respone)=>{
    SetPokemon({
      name: pokemonName, 
      img: respone.data.sprites.front_default, 
      hp: respone.data.stats[0].base_stat,
      attack: respone.data.stats[1].base_stat,
      defense: respone.data.stats[2].base_stat,
      });
      setPokemonChosen(true);
   }  
  );
};
  return (
   <div className='App'>
     <div className='title'>
     <h1> Pokemon Stats</h1>
     <input type="text"
      onChange={(event) => {
        SetPokemonName(event.target.value)
        }} 
        />
     <button onClick={searchPokemon}>Search Pokemon</button>
     </div>
<div className="DisplaySection">
  {!pokemonChosen ? (
  <h1>Please Enter a Pokemon</h1>
  ) : (
    <>
  <h1>{pokemon.name}</h1>
  <img src={pokemon.img}/>
  <h4>HP: {pokemon.hp} </h4>
  <h4>Attack: {pokemon.attack} </h4>
  <h4>Defense: {pokemon.defense} </h4>
  </>
  )}

  
  </div>

  

   </div>
  );
}


