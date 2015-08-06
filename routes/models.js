var express = require('express');
var router = express.Router();

router.route('/watchface')
    .post(function(req, res) {
        var face = new watchface();
        face.name = req.body.name;
        
        face.save(function(err) {
            if (err)
                res.send(err);
            res.json({message: 'Watchface created', face: face});
        });
    })
    .get(function(req, res) {
        watchface.find(function(err, faces) {
            if (err)
                res.send(err);
            res.json(faces);
        });
    });

router.route('/watchface/:face_id')
    .get(function(req, res) {
        watchface.findById(req.params.face_id, function(err, face) {
            if (err)
                res.send(err);
            res.json(face);
        });
    })
    .put(function(req, res) {
        watchface.findById(req.params.face_id, function(err, face) {
            if (err)
                res.send(err);
            face.name = req.body.name;
            
            face.save(function(err) {
                if (err)
                    res.send(err);
                res.json({message: 'Watchface saved', face: face});
            });
        });
    })
    .delete(function(req, res) {
        watchface.remove({
            _id: req.params.face_id
        }, function(err, face) {
            if (err)
                res.send(err);
            res.json({message: 'Watchface deleted'});
        });
    });

module.exports = router;