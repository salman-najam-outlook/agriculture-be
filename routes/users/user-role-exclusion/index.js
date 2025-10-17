const express = require('express');
const UserRoleHelper = require('../../../helpers/controller/user-role-exclusion');

const router = express.Router();

// Deactivate a user for a role
router.post('/deactivate/:userId/:roleId', async (req, res) => {
  const { userId, roleId } = req.params;
  const data = req.body;

  try {
    const result = await UserRoleHelper.deactivateUser(userId, roleId, data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating user.', error });
  }
});

// Reactivate a user for a role
router.post('/reactivate/:userId/:roleId', async (req, res) => {
  const { userId, roleId } = req.params;

  try {
    const result = await UserRoleHelper.reactivateUser(userId, roleId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error reactivating user.', error });
  }
});

module.exports = router;