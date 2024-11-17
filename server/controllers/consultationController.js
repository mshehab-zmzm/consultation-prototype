import { store, getNextConsultationId } from '../data/store.js';

export const getAllConsultations = async (req, res) => {
  try {
    const consultations = store.consultations.sort((a, b) => 
      a.type.localeCompare(b.type)
    );
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createConsultation = async (req, res) => {
  try {
    const { type, doctor, price } = req.body;
    const newConsultation = {
      id: getNextConsultationId(),
      type,
      doctor,
      price,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    store.consultations.push(newConsultation);
    res.status(201).json(newConsultation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};