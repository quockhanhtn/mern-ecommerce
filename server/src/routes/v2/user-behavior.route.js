import { Router } from 'express';
import { isGuestOrAuthorized } from '../../middlewares/jwt-auth.js';
import userBehaviorServices from '../../services/user-behavior.service.js';

const handleUserBehavior = (req, res, _) => {
  if (JSON.stringify(req.body) === '{}') {
    res.end();
  }

  userBehaviorServices.handleUserBehavior(
    req?.user?._id || req.userIdentifier,
    req.body
  );
  res.end();
}

const router = Router();

router.post('/',
  isGuestOrAuthorized,
  handleUserBehavior
);

export default router;
