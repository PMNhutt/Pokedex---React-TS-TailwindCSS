import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCollection from './components/PokemonCollection';
import { Detail, Pokemon } from './interface';

interface Pokemons {
  name: string,
  url: string
}

const App = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpen: false,
  })

  useEffect(() => {
    const fetchPokemons = async () => {
      const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0')

      setNextUrl(result.data.next)
      //get 1 pokemon
      result.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        console.log(poke.data);

        setPokemons((p) => [...p, poke.data])
        setLoading(false);
      })

    }
    fetchPokemons()

  }, [])

  const handleLoadMore = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl)
    setNextUrl(res.data.next)
    res.data.results.forEach(async (poke: Pokemons) => {
      const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)
      setPokemons((p) => [...p, pokemon.data])
      setLoading(false)
    })
  }


  return (
    <div className="w-full h-full">
      <header className="my-10 text-center text-[40px] font-semibold font-poppins">
        Pokedex With TS + Tailwind CSS
      </header>
      <PokemonCollection
        pokemons={pokemons}
        viewDetail={viewDetail}
        setDetail={setDetail}
      />
      <div className="w-full text-center my-5">
        <button
          className="cursor-pointer bg-blue-400 px-5 py-3 rounded-[5px] font-semibold text-[20px]"
          onClick={() => handleLoadMore()}>
          {loading ? "Loading..." : "Load more"}
        </button>
      </div>
    </div>
  )
}

export default App

