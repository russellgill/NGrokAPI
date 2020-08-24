const router = require('express').Router();

router.get('/', async(req, res)=>{
    res.statusCode = 200;
    res.send({ 'healthy': true });
});

module.exports = router;