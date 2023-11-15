import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { PokemonSchema } from "./pokemon.model";
import { PokemonController } from "./pokemon.controller";
import { PokemonService } from "./pokemon.service";


@Module({
    imports: [MongooseModule.forFeature([{name: 'Pokemon', schema: PokemonSchema}])],
    controllers: [PokemonController],
    providers : [PokemonService]
})
export class PokemonModule {}