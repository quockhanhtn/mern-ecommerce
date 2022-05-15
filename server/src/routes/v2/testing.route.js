import { Router } from 'express';
import fptService from '../../services/fpt.service.js';

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

export default router;
