import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const saveFile = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const fileExtension = path.extname(originalname);
    const fileName = uuidv4() + fileExtension;
    const filePath = path.join('storage', fileName);

    fs.writeFile(filePath, buffer, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(filePath);
      }
    });
  });
};
