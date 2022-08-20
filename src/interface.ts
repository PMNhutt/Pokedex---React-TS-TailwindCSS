export interface Pokemon {
    id: number,
    name: string,
    sprites: {
        front_default: string,
    },
}

export interface PokemonDetail extends Pokemon{
    abilities?: {
        ability: string,
        name: string,
    }[],
    types?: {
        slot: number,
        type: {
            name: string,
        }
    }[]
}

export interface Detail {
  id: number,
  isOpen: boolean
}