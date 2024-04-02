const mongoose = require("mongoose");

const pagoSchema = new mongoose.Schema({
    fecha_de_pago: {
        type: Date,
        trim: true
    },
    monto: {
        type: Number,
        trim: true,
    },
    medio_de_pago: {
        type: String,
        trim: true,
        //los medios de pagos pueden ser: transferencia o efectivo
        enum: ['Transferencia', 'Efectivo']
    },
    comprobante: {
        type: String,
        trim: true
    },
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alumno",
        trim: true
    },
    vencimiento_anterior:{
        type: Date,
        trim: true
    }
}, {timestamps : true});


const Pago = mongoose.model("Pago", pagoSchema);

module.exports = Pago;