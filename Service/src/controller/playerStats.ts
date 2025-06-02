import express from 'express';
import PlayerStats from '../schema/playerStats'; // Adjust the path as necessary

const router = express.Router();

// Create a new player stats entry
router.post('/', async (req, res) => {
  try {
    const playerStats = new PlayerStats(req.body);
    await playerStats.save();
    res.status(201).send(playerStats);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all player stats
router.get('/', async (req, res) => {
  try {
    const playerStats = await PlayerStats.find();
    res.status(200).send(playerStats);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific player stats entry by ID
router.get('/:id', async (req, res) => {
  try {
    const playerStats = await PlayerStats.findById(req.params.id);
    if (!playerStats) {
      return res.status(404).send();
    }
    res.status(200).send(playerStats);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a player stats entry by ID
router.patch('/:id', async (req, res) => {
  try {
    const playerStats = await PlayerStats.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!playerStats) {
      return res.status(404).send();
    }
    res.status(200).send(playerStats);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a player stats entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const playerStats = await PlayerStats.findByIdAndDelete(req.params.id);
    if (!playerStats) {
      return res.status(404).send();
    }
    res.status(200).send(playerStats);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
