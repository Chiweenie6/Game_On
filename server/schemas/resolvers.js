const { AuthenticationError } = require("apollo-server-express");
const { User, Opinion } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("opinions");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("opinions");
    },
    opinions: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Opinion.find(params).sort({ createdAt: -1 });
    },
    opinion: async (parent, { opinionId }) => {
      return Opinion.findOne({ _id: opinionId });
    },

    // Can find logged in User without specifically searching for their id by adding context
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("opinions");
      }
      throw new AuthenticationError("🚫 Must be logged in 🚫");
    },
  },

  Mutation: {
    // Create a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // Login registered user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("🚫 User Email Not Found 🚫");
      }
      const pWord = await user.isCorrectPassword(password);

      if (!pWord) {
        throw new AuthenticationError("🚫 Wrong Password 🚫");
      }
      const token = signToken(user);
      return { token, user };
    },
    // Must be logged in to add opinion
    addOpinion: async (parent, { opinionText }, context) => {
      if (context.user) {
        const opinion = await Opinion.create({
          opinionText,
          opinionAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { opinions: opinion._id } }
        );

        return opinion;
      }
      throw new AuthenticationError("🚫 Must Be Logged In To Add Opinion 🚫");
    },
    // Must be logged in to add comment
    addComment: async (parent, { opinionId, commentText }, context) => {
      if (context.user) {
        return Opinion.findOneAndUpdate(
          { _id: opinionId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("🚫 Must Be Logged In To Add Comment 🚫");
    },
    // Must be logged in to delete opinion
    removeOpinion: async (parent, { opinionId }, context) => {
      if (context.user) {
        const opinion = await Opinion.findOneAndDelete({
          _id: opinionId,
          opinionAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { opinions: opinion._id } }
        );

        return opinion;
      }
      throw new AuthenticationError(
        "🚫 Must Be Logged In To Delete Opinion 🚫"
      );
    },
    // Must be logged in to delete opinion
    removeComment: async (parent, { opinionId, commentId }, context) => {
      if (context.user) {
        return Opinion.findOneAndUpdate(
          { _id: opinionId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError(
        "🚫 Must Be Logged In To Delete Comment 🚫"
      );
    },
    // Save Game to User profile
    saveGame: async (parent, { input }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedGames: input } },
          { new: true, runValidators: true }
        );
      }
    //   Must be logged in in order to save game to profile
    throw new AuthenticationError("🚫 Must Be Logged In To Save Game 🚫");
    },
    // Delete Game from the User's profile
    removeGame: async (parent, {gameId}, context) => {
        if (context.user) {
            return User.findOneAndUpdate(
                {_id: context.user._id},
                {$pull: {savedGames: {gameId: gameId}}},
                {new: true}
            );
        }
        //   Must be logged in in order to delete game from profile
        throw new AuthenticationError("🚫 Must Be Logged In To Delete Game 🚫");
    }
  },
};

module.exports = resolvers;
