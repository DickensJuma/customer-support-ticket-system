import UserModel from '../models/userModel';

const UserService = {
  getUserProfile: async (_id: string) => {
    console.log('getUserProfile', _id);
    return await UserModel.findById(_id).select('-password');
  },

  updateUserProfile: async (_id: string, username: string, email: string) => {
    return await UserModel.findByIdAndUpdate(
        _id,
      { username, email: email.toLowerCase() },
      { new: true }
    ).select('-password');
  },
};

export default UserService;
