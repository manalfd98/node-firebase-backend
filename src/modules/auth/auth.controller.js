import firebaseAdmin from '../../firebase/firebase.js'

/**
 * @description sign in the user by generating id token
 * @param {*} req 
 * @param {*} res 
 */
const signinWithCustomToken = async (req, res) => {
  const { customToken } = req.body
  try {
    // Sign in with custom token using Firebase Client SDK to get ID token
    const userCredential = await firebaseAdmin
      .auth()
      .signInWithCustomToken(customToken)
    const idToken = await userCredential.user.getIdToken()

    res.status(201).json({ message: 'sign in success', idToken: idToken })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Error in token' })
  }
}

/**
 * @description  create the generate the custom token
 * @param {*} req 
 * @param {*} res 
 */
const createUserWithToken = async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Create a new user in Firebase Authentication
    const userRecord = await firebaseAdmin
      .auth()
      .createUser({ email, password })

    // Generate a custom token for the created user
    const customToken = await firebaseAdmin
      .auth()
      .createCustomToken(userRecord.uid)

    // Additional user data for Realtime Database
    const userData = {
      uid: userRecord.uid,
      name: name,
      email: email,
      profilePictureUrl: '',
      createdAt: new Date().toISOString()
      // Add any other fields you need here
    }

    // Get a reference to the Realtime Database
    const db = firebaseAdmin.database()

    // Store user data under 'users' node using user's uid as key
    await db.ref('users/' + userRecord.uid).set(userData)

    res.status(201).json({
      message: 'User created successfully',
      customToken: customToken,
      uid: userRecord.uid
    })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Error creating user' })
  }
}

const authController = {
  createUserWithToken,
  signinWithCustomToken
}

export default authController
