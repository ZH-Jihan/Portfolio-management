import { StatusCodes } from 'http-status-codes';
import ApiResponse from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandler';
import { UserServices } from './user.service';

const updateUserWonProfile = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;
  const result = await UserServices.updateUserWonProfileInDb(
    email,
    id,
    req.body,
    req.file,
  );
  return ApiResponse(res, {
    statusCode: StatusCodes.OK,
    data: result,
    message: 'User profile updated successfully',
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const result = await UserServices.getMeFromDB(email);
  return ApiResponse(res, {
    statusCode: StatusCodes.OK,
    data: result,
    message: 'User profile fetched successfully',
  });
});

// const deleteUserWonAccount = asyncHandler(async (req, res) => {
//   const { email } = req.user;
//   const { id } = req.params;
//   const result = await UserServices.deleteUserWonProfileInDb(email, id);
//   return ApiResponse(res, {
//     statusCode: StatusCodes.OK,
//     data: result,
//     message: 'User Account Deleted successfully',
//   });
// });

export {  getUserProfile, updateUserWonProfile };
