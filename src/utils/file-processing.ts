import multer from "multer";

// https://github.com/expressjs/multer
const storage = multer.memoryStorage();

const uploadCover = multer({
  storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 10 // 10MB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
      cb(null, true)
    } else {
        cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  }
});

const uploadSong = multer({
  storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 10 // 10MB
  },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "audio/mpeg") {
        cb(null, true)
        } else {
        return cb(new Error('Only .mp3 format allowed!'))
        }
    }
});

export {
    uploadCover,
    uploadSong,
}