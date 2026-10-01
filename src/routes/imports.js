const router=require("express").Router();
const {requireAuth,requireAdmin}=require("../middleware/auth");
const {importProduct}=require("../services/importService");
const {visualImport}=require("../services/visualImportService");
router.post("/product",requireAuth,requireAdmin,async(req,res,next)=>{try{res.json(await importProduct(req.body.url))}catch(e){next(e)}});
router.post("/visual",requireAuth,requireAdmin,async(req,res,next)=>{try{if(!req.body?.imageData) return res.status(400).json({error:"ارفع صورة المنتج أولاً"});res.json(await visualImport({imageData:req.body.imageData,sourceUrl:req.body.sourceUrl||""}))}catch(e){next(e)}});
module.exports=router;
