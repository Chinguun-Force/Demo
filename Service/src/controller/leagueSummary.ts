import express from 'express';
import LeagueSummary from '../schema/leagueSummary'; // Adjust the path as necessary

const router = express.Router();

// Create a new league summary entry
router.post('/', async (req, res) => {
  try {
    const leagueSummary = new LeagueSummary(req.body);
    await leagueSummary.save();
    res.status(201).send(leagueSummary);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all league summaries
router.get('/', async (req, res) => {
  try {
    const leagueSummaries = await LeagueSummary.find();
    res.status(200).send(leagueSummaries);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific league summary entry by ID
router.get('/:id', async (req, res) => {
  try {
    const leagueSummary = await LeagueSummary.findById(req.params.id);
    if (!leagueSummary) {
      return res.status(404).send();
    }
    res.status(200).send(leagueSummary);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a league summary entry by ID
router.patch('/:id', async (req, res) => {
  try {
    const leagueSummary = await LeagueSummary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!leagueSummary) {
      return res.status(404).send();
    }
    res.status(200).send(leagueSummary);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a league summary entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const leagueSummary = await LeagueSummary.findByIdAndDelete(req.params.id);
    if (!leagueSummary) {
      return res.status(404).send();
    }
    res.status(200).send(leagueSummary);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router; 