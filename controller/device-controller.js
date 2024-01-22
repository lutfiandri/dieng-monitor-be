const { FieldValue } = require('firebase-admin/firestore');
const { db } = require('../config/firebase');
const path = require('path');
const ExcelJS = require('exceljs');

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

const exportExcel = async (req, res) => {
  try {
    const deviceId = req.params.id;

    const doc = await db.collection('devices').doc(deviceId).get();
    if (!doc.exists) {
      return res.status(404).send('device not found');
    }

    const data = doc.data();
    const deviceData = data.data;

    const formattedData = deviceData.map((d, i) => ({
      no: i + 1,
      timestamp: d.timestamp.toDate().toISOString(),
      co2: d.co2,
      temperature: d.temperature,
    }));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.columns = [
      { header: 'No.', key: 'no', width: 5 },
      { header: 'Timestamp', key: 'timestamp', width: 30 },
      { header: 'CO2', key: 'co2', width: 15 },
      { header: 'Suhu (Celsius)', key: 'temperature', width: 15 },
    ];

    worksheet.addRows(formattedData);

    const directory = 'files';
    const filename = `Data Dieng Monitor - ${new Date().toISOString()}.xlsx`;

    const filepath = path.join(__dirname, '..', directory, filename);
    console.log(filepath);
    // const filepath = `${directory}/Data Dieng Monitor - ${new Date().toISOString()}.xlsx`;

    await workbook.xlsx.writeFile(filepath).then(() => {
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

      return res.sendFile(filepath);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  upsertData,
  exportExcel,
};
