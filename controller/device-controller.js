const { FieldValue } = require('firebase-admin/firestore');
const { db } = require('../config/firebase');

const upsertData = async (req, res) => {
  try {
    const newDeviceData = {
      timestamp: new Date(),
      co2: req.body.co2,
      temperature: req.body.temperature,
    };

    const deviceId = req.params.id;

    await db
      .collection('devices')
      .doc(deviceId)
      .update({
        data: FieldValue.arrayUnion(newDeviceData),
      });

    res.status(200).send('data saved');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  upsertData,
};
