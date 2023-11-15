// TODO : save file to local storage
import fs from "fs";

const saveFile = async (file : Express.Multer.File, path : string) => {
  // save to './storage' folder
  fs.writeFile("./storage/" + path, file.buffer, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
}

export default saveFile;