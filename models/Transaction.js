const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema({
    value: {
        type: String,
        required: true,
    },
    
})

const Transaction = model('transaction', TransactionSchema)

module.exports = Transaction