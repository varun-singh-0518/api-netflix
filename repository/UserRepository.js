import mongoose from "mongoose";
import {userSchema} from "../models/UserModel.js";
import ApplicationError from "../error-handler/ApplicationError.js";

//This line defines a model for MongoDB using Mongoose
const UserModel = mongoose.model("users", userSchema);

export default class UserRepository {
  async addToLikedMovies(email, data) {
    try {
      //to find a user with the specified email in the UserModel
      const user = await UserModel.findOne({email});
      if (user) {
        // Destructure the likedMovies array from the user object
        const {likedMovies} = user.toObject();

        // Check if the movie with the given id is already in the likedMovies array
        const movieAlreadyLiked = likedMovies.find(({id}) => id === data.id);
        if (!movieAlreadyLiked) {
          await UserModel.findByIdAndUpdate(
            user._id,
            {
              // Add the new movie to the likedMovies array
              likedMovies: [...user.likedMovies, data],
            },
            {
              new: true, // Return the updated user document
            }
          );
        }
      } else {
        // If the user does not exist, create a new user with the provided email and likedMovies data
        await UserModel.create({email, likedMovies: data});
      }
    } catch (err) {
      throw new ApplicationError("Something went wrong in database", 500);
    }
  }

  async getLikedMovies(email) {
    try {
      const user = await UserModel.findOne({email});

      if (user) {
        return user.likedMovies;
      }
    } catch (err) {
      throw new ApplicationError("Something went wrong in database", 500);
    }
  }

  async removeFromLikedMovies(email, movieID) {
    try {
      const user = await UserModel.findOne({email});
      if (user) {
        const {likedMovies} = user;

        // Find the index of the movie with the given movieID in the likedMovies array
        const movieIndex = likedMovies.findIndex(({id}) => id === movieID);

        // Remove the movie at the found index from the likedMovies array
        likedMovies.splice(movieIndex, 1);

        // Update the user's document with the modified likedMovies array
        await UserModel.findByIdAndUpdate(
          user._id,
          {
            likedMovies,
          },
          {
            new: true,
          }
        );

        // Return the modified likedMovies array
        return likedMovies;
      }
    } catch (err) {
      throw new ApplicationError("Something went wrong in database", 500);
    }
  }
}
