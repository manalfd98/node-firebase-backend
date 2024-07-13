import multer from 'multer'
import path from 'path'

// Set up multer for file upload
const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    )

    if (mimetype && extname) {
      return cb(null, true)
    }
    cb(new Error('File type not supported'))
  },
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
})

export default upload
