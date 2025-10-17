const express = require('express');
const db = require(rootPath + '/models');

const router = express.Router();

router.get('/real-organizations/list', async (req, res) => {
  try {
    const organizations = await db.Organization.findAll({
      attributes: ['id', 'name', 'code', 'country', 'parentId'],
      where: {
        isTest: false
      }
    });

    return res.status(200).json({ organizations });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
