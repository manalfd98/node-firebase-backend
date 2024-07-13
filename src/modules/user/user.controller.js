import firebaseAdmin from "../../firebase/firebase.js"

/**
 * @description update the user by profile 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateUserProfile = async (req, res) => {
  try {
    const { uid, name, email, profilePictureUrl } = req.body
    // console.log('Request body:', req.body)

    if (!uid) {
      return res.status(400).send({ error: 'UID is required' })
    }

    const db = firebaseAdmin.database()
    const userRef = db.ref(`users/${uid}`)
    await userRef.update({
      name,
      email,
      profilePictureUrl
    })

    res.status(200).send({ message: 'Profile updated successfully' })
  } catch (error) {
    console.error('Error updating user profile:', error)
    res.status(500).send({ error: 'Failed to update profile' })
  }
}

/**
 * @description get user profile by id in database
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getProfile = async (req, res) => {
  const { uid } = req.body

  try {
   
    const db = firebaseAdmin.database();
    const snapshot = await db.ref('users/' + uid).once('value');
    const userData = snapshot.val();

    if (!userData) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ data: userData })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).json({ error: 'Error fetching user profile' })
  }
}

const userController = {
  getProfile,
  updateUserProfile
}

export default userController
