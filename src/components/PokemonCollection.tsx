import React, { useEffect } from 'react'
import { Detail, Pokemon, PokemonDetail } from '../interface';
import PokemonList from './PokemonList';

interface Props {
    pokemons: PokemonDetail[],
    viewDetail: Detail,
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonCollection: React.FC<Props> = (props) => {
    const { pokemons, viewDetail, setDetail } = props;

    const handleOpenDetail = (id:number) => {
        setDetail({ 
            id: id,
            isOpen: true,
        })
        
    }

    return (
        <section className="my-10 mx-10 flex flex-col items-center">
            <div className="flex flex-wrap gap-[30px] w-[40%]  items-center justify-center">
                {pokemons.sort((pokemon1: Pokemon, pokemon2: Pokemon) =>
                    pokemon1.id - pokemon2.id
                ).map((poke) => (
                    <div
                        onClick={() => { handleOpenDetail(poke.id) }}
                    >
                        <PokemonList
                            key={poke.id}
                            name={poke.name}
                            id={poke.id}
                            image={poke.sprites.front_default}
                            abilities={poke.abilities}
                            types={poke.types}
                            viewDetail={viewDetail}
                            setDetail={setDetail}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default PokemonCollection;
