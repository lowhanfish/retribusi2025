const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
var uniqid = require('uniqid');
var db = require('../../db/MySql/umum');
var upload = require('../../db/multer/pdf');



const router = express.Router();


router.post('/aa', (req, res) => {
   console.log(req.body)
   res.send('oke')
});



router.post('/view', (req, res) => {
   var data_batas = parseInt(req.body.page_limit);
   var data_star = (req.body.data_ke - 1) * data_batas;
   var cari = req.body.cari_value;
   var halaman = 1;

   var userku = req.user.profile
   // console.log(userku);

   var filterView = ``;

   if (userku.retribusi == '1' || userku.retribusi == 1 ) {
        filterView = ` lapak.createdBy LIKE '%%' `
    } else {
        filterView = ` lapak.createdBy = '`+req.user._id+`' `
    }

   let jml_data = ` 
        SELECT
            lapak.id
        FROM lapak
    `;

   let view = `
      SELECT
         lapak.id,
         lapak.nama,
         lapak.ukuran_lapak,
         lapak.no_blok,
         lapak.status,
         lapak.tgl_mulai,
         lapak.tgl_akhir,
         lapak.file,
         lapak.createdAt,

         users.nama as nm_pemilik,
         users.nik,
         users.alamat,
         users.email,
         users.hp,

         jenis_dagangan.uraian as nm_dagangan,
         jenis_lapak.uraian as nm_lapak,
         master_pasar.uraian as nm_pasar

      FROM lapak

         LEFT JOIN users
         ON lapak.createdBy = users.id
         
         LEFT JOIN jenis_dagangan
         ON lapak.jns_dagangan_id = jenis_dagangan.id
         
         LEFT JOIN jenis_lapak
         ON lapak.jns_lapak_id = jenis_lapak.id
         
         LEFT JOIN master_pasar
         ON lapak.pasar_id = master_pasar.id

         WHERE `+filterView+`
         AND lapak.nama LIKE '%`+ cari + `%'

         ORDER BY lapak.createdAt DESC

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

router.post('/addData', upload.single('file'), (req, res) => {
   var data = JSON.parse(req.body.data)
   // console.log(data);
   let query = `INSERT INTO lapak (id, nama, pasar_id, jns_lapak_id, ukuran_lapak, jns_dagangan_id, no_blok, status, tgl_mulai, tgl_akhir, file, file_type, createdBy, createdAt)
    VALUES(
        '`+ uniqid() + `',
        '`+ data.nama + `',
        '`+ data.pasar_id + `',
        '`+ data.jns_lapak_id + `',
        '`+ data.ukuran_lapak + `',
        '`+ data.jns_dagangan_id + `',
        '`+ data.no_blok + `',
        '`+ data.status + `',
        '`+ data.tgl_mulai + `',
        '`+ data.tgl_akhir + `',
        '`+ req.file.filename + `',
        '`+ req.file.mimetype + `',
        '`+ req.user._id + `',
        NOW()
    )`;

   db.query(query, (err, row) => {
      if (err) {
         console.log('errrrooorrr');
         res.send(err);
         console.log(err);
      } else {
         console.log('SUKSES TAMBAH DATA');
         res.send(row);
         // console.log(row)
      }
   })
});

router.post('/editData', upload.single("file"), (req, res) => {
   // console.log(req.body);
   var query = '';
   if (req.file == undefined || req.file == null) {
      query = `
            UPDATE lapak SET
            nama = '`+ req.body.nik + `',
            pasar_id = '`+ req.body.tmp_lahir + `',
            jns_lapak_id = '`+ req.body.tgl_lahir + `',
            ukuran_lapak = '`+ req.body.jns_kelamin + `',
            jns_dagangan_id = '`+ req.body.alamat + `',
            no_blok = '`+ req.body.dusun + `',
            status = '`+ req.body.rt_rw + `',
            tgl_mulai = '`+ req.body.kecamatan_id + `',
            tgl_akhir = '`+ req.body.kode_pos + `',
            editeBy = '`+ req.user._id + `',
            editeAt = NOW()

            WHERE id = '`+ req.body.id + `'
        `;
   } else {
      query = `
            UPDATE lapak SET
            nama = '`+ req.body.nik + `',
            pasar_id = '`+ req.body.tmp_lahir + `',
            jns_lapak_id = '`+ req.body.tgl_lahir + `',
            ukuran_lapak = '`+ req.body.jns_kelamin + `',
            jns_dagangan_id = '`+ req.body.alamat + `',
            no_blok = '`+ req.body.dusun + `',
            status = '`+ req.body.rt_rw + `',
            tgl_mulai = '`+ req.body.kecamatan_id + `',
            tgl_akhir = '`+ req.body.kode_pos + `',
            file = '`+ req.file.filename + `',
            file_type = '`+ req.file.mimetype + `',
            editeBy = '`+ req.user._id + `',
            editeAt = NOW()

            WHERE id = '`+ req.body.id + `' 
        `;
      hapus_file(req.body.file_old);
   }

   db.query(query, (err, row) => {
      if (err) {
         console.log(err);
         res.send(err);
      } else {
         console.log("SUKSES MERUBAH DATA")
         res.send(row);
      }
   })
});

router.post('/removeData', (req, res) => {
   console.log(req.body)
   var query = `
        DELETE FROM lapak WHERE id = '`+ req.body.id + `';
    `;

   db.query(query, (err, row) => {
      if (err) {
         console.log(er)
         res.send(err);
      } else {

         res.send(row);
      }
   });


})

function hapus_file(file) {
   const path = 'uploads/' + file;

   fs.unlink(path, (err) => {
      if (err) {
         console.error(err)
         return
      }
   })
}


module.exports = router;
