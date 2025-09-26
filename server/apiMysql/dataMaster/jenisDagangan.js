const express = require('express');
var db = require('../../db/MySql/umum');
var uniqid = require('uniqid');
const router = express.Router();

router.post('/view', (req, res) => {
   var data_batas = 10;
   var data_star = (req.body.data_ke - 1) * data_batas;
   var cari = req.body.cari_value;
   var halaman = 1;

   let jml_data = ` SELECT * FROM jenis_dagangan `;

   let view = `
        SELECT * FROM jenis_dagangan
        LIMIT `+ data_star + `,` + data_batas + `
    `;

   db.query(jml_data, (err, row) => {
      if (err) {
         console.log(err);
         res.json(err)
      } else {
         halaman = Math.ceil(row.length / data_batas);
         if (halaman < 1) { halaman = 1 }
         // ========================
         db.query(view, (err, result) => {
            if (err) { res.json(err) }
            else {
               halaman = Math.ceil(row.length / data_batas);
               if (halaman < 1) { halaman = 1 }
               res.json({
                  data: result,
                  jml_data: halaman,
                  total: row.length,
               })
            }
         })
         // ========================
      }
   })
});

router.post('/addData', (req, res) => {

   let query = `INSERT INTO jenis_dagangan (id, uraian, keterangan, createBy)
    VALUES(
    '`+ uniqid() + `',
        '`+ req.body.uraian + `',
        '`+ req.body.keterangan + `',
        '`+ req.user._id + `'
    );`

   db.query(query, (err, row) => {
      if (err) {
         res.send(err);
         console.log(err);
      } else {
         res.send(row);
      }
   })
});

router.post('/editData', (req, res) => {
   var query = `
        UPDATE jenis_dagangan SET
        uraian = '`+ req.body.uraian + `',
        keterangan = '`+ req.body.keterangan + `',
        editeBy = '`+ req.user._id + `'

        WHERE id = '`+ req.body.id + `'
    `;

   db.query(query, (err, row) => {
      if (err) {
         res.send(err);
         console.log(err);
      } else {
         res.send(row);
      }
   })
})

router.post('/removeData', (req, res) => {
   let query = `
        DELETE FROM jenis_dagangan WHERE id = '`+ req.body.id + `'
    `;
   db.query(query, (err, row) => {
      if (err) {
         res.send(err);
      } else {
         res.send(row);
      }
   });
})

router.post('/list', (req, res) => {

   let query = `SELECT * FROM jenis_dagangan`

   db.query(query, (err, row) => {
      if (err) {
         res.send(err);
         console.log(err);
      } else {
         res.send(row);
      }
   })
});

module.exports = router;