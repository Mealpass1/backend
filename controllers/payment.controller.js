const { MoMoPayment } = require('../services/payment.service')

module.exports.paymentController = async (req, res) => {
    const payment = await MoMoPayment()
    // console.log(payment);
    if (payment) {
        console.log(payment.status)
        return res.status(200).json({
            status: true,
            msg: 'payment successfully done!',
            data: payment
        })
    }
    return res.status(404).json({
        status: false,
        msg: 'payment failed'
    })
}
