import React, { useEffect, useState } from 'react'
import { Detail } from '../interface';

interface Props {
    id: number,
    name: string,
    image: string,
    abilities: {
        name: string,
        ability: string,
    }[] | undefined,
    types: {
        slot: number,
        type: {
            name: string,
        }
    }[] | undefined,
    viewDetail: Detail,
    setDetail: React.Dispatch<React.SetStateAction<Detail>>,

}

const PokemonList: React.FC<Props> = (props) => {
    const { id, name, image, abilities, types, viewDetail, setDetail } = props;
    const [isSelected, setIsSelected] = useState(false);
    useEffect(() => {
        setIsSelected(id === viewDetail?.id)
    }, [viewDetail])


    return (
        <div className="w-[150px] h-[150px] my-5 rounded-[5px]
         flex items-center flex-col justify-center cursor-pointer relative">


            {isSelected && (
                <div className="absolute z-[1] top-[-50%] left-[-50%] translate-y-[50%] translate-x-[50%]
                bg-emerald-200 w-[100px] h-[150px] rounded-[5px]">

                </div>
            )}


            <div className="bg-white rounded-[5px] mb-3">
                <img
                    className="w-[100px]"
                    src={image}
                    alt={name} />
                <p className="text-black ml-2 font-semibold font-pop">
                    {`#${id}`}
                </p>
            </div>
            <p className="font-semibold uppercase">{name}</p>
            <div
                className="flex flex-row gap-2 mt-2"
            >
                {types?.map((type) => (
                    <div className={`${type.slot === 1 ? 'bg-green-500' : 'bg-slate-200'} px-[5px] py-[2px] rounded-[5px]`}>
                        {type.type.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PokemonList;
