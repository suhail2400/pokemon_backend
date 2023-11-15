import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
import { PokemonService } from './pokemon.service';


  @Controller('pokemons')
  export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}



    @Get()
    async getAllPokemon() {
      const pokemons = await this.pokemonService.getPokemons();
      return pokemons;
    }

    @Get(':id')
    getPokemon(@Param('id') pokemonId: string){
      return this.pokemonService.getSinglePokemon(pokemonId);
    }




}
