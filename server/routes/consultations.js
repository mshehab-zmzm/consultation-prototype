import express from 'express';
import { getAllConsultations, createConsultation } from '../controllers/consultationController.js';

export const router = express.Router();

router.get('/', getAllConsultations);
router.post('/', createConsultation);