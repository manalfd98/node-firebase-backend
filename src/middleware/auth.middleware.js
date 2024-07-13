import firebaseAdmin from '../firebase/firebase.js'

export const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    console.error('Error verifying token:', error)
    return res.status(403).json({ error: 'Invalid token' })
  }
}


