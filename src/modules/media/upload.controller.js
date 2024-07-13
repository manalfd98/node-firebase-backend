import firebaseAdmin from '../../firebase/firebase.js'

const db = firebaseAdmin.database()
const storage = firebaseAdmin.storage().bucket()

const uploadImageController = async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' })
    }

    const file = req.file
    const uid = req.body.uid
    const fileName = `${Date.now()}_${file.originalname}`
    const fileUpload = storage.file(fileName)

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    })

    blobStream.on('error', error => {
      console.log(error)
      res.status(500).send({ error: 'Something went wrong!' })
    })

    blobStream.on('finish', async () => {
      const [fileUrl] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2491' // set a long expiration date
      })

      // Update user profile picture URL in the database
      try {
        const userRef = db.ref(`users/${uid}`)
        await userRef.update({ profilePictureUrl: fileUrl })
      } catch (error) {
        console.error('Error updating profile picture URL:', error)
        res.status(500).send({ error: 'Failed to update profile picture URL' })
        return
      }

      res.status(200).send({ imageUrl: fileUrl })
    })

    blobStream.end(file.buffer)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Internal server error' })
  }
}

export default uploadImageController

