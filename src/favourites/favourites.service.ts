import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Favourite } from './favourite.model';
import { User } from 'src/users/user.model';

@Injectable()
export class FavouritesService {
  constructor(
      @InjectModel('Favourite') readonly favouritesModel: Model<Favourite>,
  ) {}

  async getFavourites(user:User,email: string) {
      const favourites = await this.favouritesModel
          .find({email: email })
          .exec();
      let id: string[] = [];
      favourites.map((fav) => id.push(fav.pokemon));

      return id;
  }


async saveFavourite(user: User,email: string, favourite: string) {
    const doc = await this.favouritesModel
        .findOne({
            email: email,
            pokemon: favourite,
        })
        .exec();
    if (doc) {
        console.log('already exists');
        throw new ConflictException('Favourite already exists');
    } else {
        await this.favouritesModel.create({
            user: user._id,
            pokemon: favourite,
            email: email,
        });
    }
}

  async containsFavourite(user: User, fav: string, email:string) {
      let favourite = await this.favouritesModel.findOne({
          email:email,
          pokemon: fav,
      });

      if (!favourite)
          throw new NotFoundException(
              "User's collection does not contain this favourite",
          );
      else return true;
  }

  async removeFavourite(user: User, fav: string, email:string) {
      try {
          await this.favouritesModel.deleteOne({
              email:email,
              pokemon: fav,
          });
      } catch (error) {
          throw new InternalServerErrorException(error);
      }
  }
}