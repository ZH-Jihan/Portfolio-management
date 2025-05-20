import { StatusCodes } from 'http-status-codes';
import { uploadImgToCloudinary } from '../../middlewares/uploadImgToCloudinary';
import ApiError from '../../utils/ApiError';
import { TUser } from './user.interface';
import { User } from './user.model';

const updateUserWonProfileInDb = async (
  email: string,
  id: string,
  payload: Partial<TUser>,
  file: any,
) => {
  const user = await User.findById({ _id: id });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, `User not found`);
  }

  if (user.email !== email) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      `You are not allowed to update this profile`,
    );
  }

  if (file) {
    const fileName = `${user.name}`;
    const path = file?.path;

    const { secure_url } = await uploadImgToCloudinary(path, fileName);
    console.log(secure_url);

    payload.image = secure_url as string;
  }

  const updated = await User.findOneAndUpdate({ email }, payload, {
    new: true,
  });

  return updated;
};

const getMeFromDB = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, `User not found`);
  }
  return user;
};

// const deleteUserWonProfileInDb = async (email: string, id: string) => {
//   const user = await User.findById({ _id: id });

//   if (!user) {
//     throw new ApiError(StatusCodes.NOT_FOUND, `User not found`);
//   }

//   if (user.email !== email) {
//     throw new ApiError(
//       StatusCodes.FORBIDDEN,
//       `You are not allowed to Delete this profile`,
//     );
//   }

//   const updated = await User.findOneAndUpdate(
//     { email },
//     {
//       isDeleted: true,
//     },
//     {
//       new: true,
//     },
//   );

//   return updated;
// };

export const UserServices = {
  updateUserWonProfileInDb,
  getMeFromDB,
};
