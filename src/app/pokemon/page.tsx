import { Suspense } from "react"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import LoadMore from "@/components/loadMore"
import { genPageMetadata } from "@/components/seo"

export const metadata = genPageMetadata({
    title: "Infinity Scrolling",
    description: "Infinity Scrolling",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_URL}/pokemon`,
    },
})

const PAGE_SIZE: number = Number(process.env["SCROLLING_PER_PAGE"]) || 20

type PokemonType = {
    name: string
    url: string
}

const getPokemons = (offset: number = 0) =>
    fetch(`https://pokeapi.co/api/v2/pokemon-species?limit=${PAGE_SIZE}&offset=${offset}`).then((res) => res.json())

const PokemonList = async ({ offset, pokemon }: { offset: number; pokemon?: { results: PokemonType[] } }) => {
    return (
        <>
            {pokemon ? (
                pokemon?.results.map((pokemon: PokemonType) => (
                    <Card key={pokemon.name}>
                        <CardContent className="flex flex-col items-center justify-center p-4">
                            <Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                                    pokemon.url.split("/")[6]
                                }.png`}
                                alt={pokemon.name}
                                width="475"
                                height="475"
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col p-4 text-center">
                            <CardTitle className="my-2">{offset}</CardTitle>
                            <CardDescription> {pokemon.name}</CardDescription>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <div className="text-xl font-bold">No data available !! </div>
            )}
        </>
    )
}

async function loadMorePokemon(offset: number = 0) {
    "use server"
    const pokemon = await getPokemons(offset)

    const nextOffset = pokemon.results.length >= PAGE_SIZE ? offset + PAGE_SIZE : null

    return [<PokemonList offset={offset} pokemon={pokemon} key={offset} />, nextOffset] as const
}

export default async function PokemonPage() {
    const initialPokemon = await getPokemons(0)

    return (
        <main className="container mx-auto px-4 text-sm">
            <article className="prose max-w-full dark:prose-invert">
                <h1>Infinite Scroll Server Actions Example</h1>
                <hr />
                <div className="flex flex-col items-center gap-4">
                    <LoadMore loadMoreAction={loadMorePokemon} initialOffset={PAGE_SIZE}>
                        <PokemonList offset={0} pokemon={initialPokemon} />
                    </LoadMore>
                </div>
            </article>
        </main>
    )
}
