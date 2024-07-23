import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from './pokemon.model';

@Injectable()
export class PokemonService {

  constructor(@InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>) {

  }


  async getPokemons():Promise<Pokemon[]> {
    return await this.pokemonModel.find()

  }
  async getSinglePokemon(pokemonId: string) {
    const pokemon = await this.findPokemon(pokemonId);
    return pokemon;
  }

   // Returning a list of all pokemons
   async getAllpokemon(): Promise<Pokemon[]> {
    return await this.pokemonModel.find();
}

async getListOfPokemonByIds(ids: string[]): Promise<Pokemon[]> {
    return await this.pokemonModel.find({ number: ids });
}

// private async findPokemonByID(id: string): Promise<Pokemon> {
//     let pokemon: Pokemon;
//     try {
//         pokemon = await this.pokemonModel.findById(id);
//     } catch (error) {
//         throw new NotFoundException('Could not find this pokemon');
//     }
//     if (!pokemon) {
//         throw new NotFoundException('Could not find this pokemon');
//     }
//     return pokemon;
// }




  private async findPokemon (id: string):Promise<Pokemon>{
    let pokemon;
    try {
      pokemon = await  this.pokemonModel.findById(id);
    } catch (error) {
      throw new NotFoundException ('Could not find pokemon');
    }
    if(!pokemon){
      throw new NotFoundException ('Could not find pokemon');
    }
    return pokemon;
  }


}