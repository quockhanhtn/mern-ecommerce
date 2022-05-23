import { Router } from 'express';
import UserBehavior from '../../models/user-behavior.model.js';
import Product from '../../models/product.model.js';
import fptService from '../../services/fpt.service.js';
import userBehaviorService from '../../services/user-behavior.service.js';
import productService from '../../services/products.service.js';

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

router.get('/test', async (req, res, next) => {
  const rs = await userBehaviorService.getDataWithCalculateScore();
  res.status(200).json(rs);
  res.end();
});

router.get('/p', async (req, res, next) => {
  const rs = await productService.getBestSellerProducts(1);
  res.status(200).json(rs);
  res.end();
});


export default router;
