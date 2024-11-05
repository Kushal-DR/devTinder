function authu(req,res,next)
{
    const tocken = "xy";

   if(tocken == "xyz"){
    res.status(401).send("error found")
   }
   else{
    next();
   }
}

function authu2(req,res,next)
{
    const tocken = "xy";

   if(tocken == "xyz"){
    res.status(401).send("error in login found")
   }
   else{
    next();
   }
}

module.exports = {authu,authu2};