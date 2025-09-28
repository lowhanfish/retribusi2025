const express = require('express');
var db = require('../../db/MySql/umum');
var uniqid = require('uniqid');
const router = express.Router();

router.post('/view', (req, res) => {
   var data_batas = 10;
   var data_star = (req.body.data_ke - 1) * data_batas;
   var cari = req.body.cari_value;
   var halaman = 1;

   let jml_data = ` SELECT * FROM master_pasar `;

   let view = `
        SELECT
        master_pasar.id,
        master_pasar.uraian,
        master_pasar.alamat,
        master_pasar.kecamatan,
        master_kecamatan.nama_kecamatan as nm_kecamatan

        FROM master_pasar

        LEFT JOIN egov.master_kecamatan
        ON master_pasar.kecamatan = master_kecamatan.kecamatan_id

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

   let query = `INSERT INTO master_pasar (id, kecamatan, uraian, alamat, createdAt, createdBy)
    VALUES(
      '`+ uniqid() + `',
      '`+ req.body.kecamatan + `',
      '`+ req.body.uraian + `',
      '`+ req.body.alamat + `',
      NOW(),
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
        UPDATE master_pasar SET
        kecamatan = '`+ req.body.kecamatan + `',
        uraian = '`+ req.body.uraian + `',
        alamat = '`+ req.body.alamat + `',
        editeBy = '`+ req.user._id + `',
        editeAt = NOW()

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
        DELETE FROM master_pasar WHERE id = '`+ req.body.id + `'
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

   let query = `SELECT * FROM master_pasar`

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