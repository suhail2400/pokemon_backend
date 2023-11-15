import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [UserModule,PokemonModule, MongooseModule.forRoot('mongodb://localhost:27017/pokemon_db')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
