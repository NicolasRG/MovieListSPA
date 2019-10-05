const app = require("express");
const router = app.Router();

router.get('/', async (req, res)=>{
    res.sseSetup();
    res.sseSendSetup();
    req.local.push(res);
    console.log(req.local.length, "adding req to connections array");
});


module.exports = router;