import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";



@Module({
    // imports: [MongooseModule.forFeature([{name: 'Pokemon', schema: PokemonSchema}])],
    controllers: [NewsController],
    providers : [NewsService]
})
export class NewsModule {}