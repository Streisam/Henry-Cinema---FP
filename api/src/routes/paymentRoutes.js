const { Router } = require("express");
const router = Router();
const { ACCESS_TOKEN } = process.env;

const mercadopago = require('mercadopago');

require("dotenv").config();
mercadopago.configure({
    access_token: ACCESS_TOKEN
});
router.put("/success",async(req,res) => {
 const {id,ids} = req.body;
console.log(req.body)
console.log(ids)
res.send("success");

})


router.post("/",async(req,res) =>{
 
    const products = req.body;
    console.log(products)
    const items = products.map((product) => ({
        title: product.name,
        unit_price: product.price,
        quantity: product.quantity,
      }));

    let preference = {
        items:items,

        back_urls: {
            success: 'http://localhost:5173/succes/payment',
            failure:'',
            pending:''
        },
        auto_return : 'approved',
        binary_mode: true
    }
    mercadopago.preferences
    .create(preference)
    .then(function (response) {
        console.log(response.body.init_point)
        res.send(response.body.init_point)
        console.log("succes")
      })
      .catch(function (error) {
        console.log(error);
      });
   
})

module.exports = router ;