import express from 'express';
import { registerController, loginController } from './controller';
import { checkAuth, checkRole } from './middleware';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

// Protected Routes
router.get('/dashboard', checkAuth, checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard', user: req.user });
});

router.get('/superadmin', checkAuth, checkRole('superadmin'), (req, res) => {
  res.json({ message: 'Super Admin Access', user: req.user });
});

export default router;
