import { BadRequestException, UnsupportedMediaTypeException } from "@nestjs/common";
import { extname } from 'path';

export const customFileFilter = (req, file, callback) => {
  console.log(21212121, file.originalname);
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return callback(new BadRequestException('Only image files are allowed!'));
  }
  callback(null, true);
};

// update the name of an image to make make it unique
export const editFileName = (req: any, file: any, callback: any) => {
  callback(null, `${Date.now()}_${file.originalname}`);
};


// export function fileMimetypeFilter(...mimetypes: string[]) {
//   return (
//     req,
//     file: Express.Multer.File,
//     callback: (error: Error | null, acceptFile: boolean) => void,
//   ) => {
//     if (mimetypes.some((m) => file.mimetype.includes(m))) {
//       callback(null, true);
//     } else {
//       callback(
//         new UnsupportedMediaTypeException(
//           `File type is not matching: ${mimetypes.join(', ')}`,
//         ),
//         false,
//       );
//     }
//   };
// }