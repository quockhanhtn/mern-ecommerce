import { Router } from 'express';
import fptService from '../../services/fpt.service.js';
import userBehaviorService from '../../services/user-behavior.service.js';

const router = Router();

router.get('/update', (req, res) => {
  fptService.updateRecommendData();
  res.end();
});

router.get('/import', (req, res) => {
  fptService.importProductDataToFpt();
  res.end();
});

router.get('/import-ub', (req, res) => {
  fptService.importUserBehaviorToFpt();
  res.end();
});

router.get('/result', async (req, res, next) => {
  const rs = await userBehaviorService.getDataWithCalculateScore();
  res.status(200).json(rs);
  res.end();
});


export default router;
