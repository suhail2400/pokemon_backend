import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavouritesService } from './favourites.service';
import { UserService } from 'src/users/user.service';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Controller('favourites')
export class FavouritesController {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly usersService: UserService,
    private readonly pokemonService: PokemonService,
  ) {}
  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async getFavourites(
    @Body() body: { username: string; favourites: string[],email:string },
  ) {
    const user = await this.usersService.findUserByEmail(body.email);
    const favourites = await this.favouritesService.getFavourites(user,body.email);
    if (favourites == null) {
      return [];
    } else {
      return await this.pokemonService.getListOfPokemonByIds(favourites);
    }
  }
  @Patch('add')
  // @UseGuards(AuthGuard('jwt'))
  async saveFavourite(@Body() body: { favourite: string, email:string }) {
    const user = await this.usersService.findUserByEmail(body.email);
    console.log('user trying to add favourite: ', user.userName);
    return this.favouritesService.saveFavourite(user, body.email,body.favourite,);
  }

  @Post('contains')
  // @UseGuards(AuthGuard('jwt'))
  async containsFavourite(
    @Body() body: { favourite: string, email:string },
  ) {
    const user = await this.usersService.findUserByEmail(body.email);
    return await this.favouritesService.containsFavourite(user, body.favourite, body.email);
  }

  @Delete('remove')
  // @UseGuards(AuthGuard('jwt'))
  async removeFavourite(@Body() body: { favourite: string, email:string }) {
    const user = await this.usersService.findUserByEmail(body.email);
    return await this.favouritesService.removeFavourite(user, body.favourite, body.email);
  }
}