const Razorpay = require('razorpay')
const crypto = require('crypto')
const shortid = require('shortid')
const Transactions = require('../model/transaction')
const { error } = require('console')

const instance = new Razorpay({
    key_id:"rzp_test_VLLuPfMyHSU6rf",
    key_secret:"NBPtPn6ygdaTDWCKK3CHDh2y"
    
})

exports.completePayment=async (req, res) => {
    console.log("payment initiated!!")
    const payment_capture = 1;
    const amount = req.body.amount;
    const currency = "INR";
  
    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };
  
    try {
      const response = await instance.orders.create(options);
      console.log(response);
      // res.json({
      //   id: response.id,
      //   currency: response.currency,
      //   amount: response.amount,
      // });
      res.json(response)
    } catch (error) {
      console.log(error);
    }
  }


 exports.saveTransaction=(req,res)=>{
  console.log('saving transaction!!')

  const generated_signature =crypto.createHmac('sha256',instance.key_secret);
  generated_signature.update(req.body.razorpay_order_id +"|" + req.body.razorpay_payment_id)

  if(req.body.razorpay_signature == generated_signature.digest('hex')){

    console.log("creating transaction object")

    // save transaction to collection

    const transaction = new Transactions({
      transaction_id:req.body.razorpay_payment_id,
      transaction_amount:req.body.razorpay_amount

    });

    transaction.save(function(err,saveTransaction){
      if(err){
        console.log(error)
        return res.status(500).send("some problem occured",error)

      }
      console.log('transaction saved to db')
      res.send({transaction:transaction})
    })



  }

 }