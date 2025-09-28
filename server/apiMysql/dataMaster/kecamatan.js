const express = require('express');
var db = require('../../db/MySql/egov');

const router = express.Router();

router.post('/list', (req, res) => { 

    let view = `
        SELECT * FROM master_kecamatan
        WHERE kabupaten_id = 7405
        ORDER BY nama_kecamatan ASC;
    `;
    db.query(view, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(row);

        }
    })
});

router.post('/list_kecamatan', (req, res)=> {

    let view = ` SELECT * FROM master_kecamatan where kabupaten_id = 7405 ORDER BY kecamatan_id ASC; 
    `;
    db.query(view, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(row);

        }
    })
})

module.exports = router;
