const express = require("express");
const cors = require("cors");
// const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
// const { connect } = require("http2");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // this.mongoose = mongoose;

        this.middlewares();
        this.routes();
        this.listen();
        // this.conectarMongoose();
    }

    conectarMongoose() {
        // Conexión a MongoDB
        this.mongoose.connect('mongodb://localhost:27017/empresa', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Agregar esquema Empleado
        // let schemaEmpleado = new this.mongoose.Schema({
        //     nombre: String,
        //     numero: String,
        //     puesto: String,
        //     departamento: String
        // });
        // this.Empleados = this.mongoose.model('Empleados', schemaEmpleado, 'Empleados');

        // Agregar esquema Riego
        // let schemaRiego = new this.mongoose.Schema({
        //     estado: String
        // });
        // this.Riego = this.mongoose.model('Riego', schemaRiego, 'Riego');
    }

    middlewares() {
        // Páginas estáticas
        this.app.use(express.static('public'));
        // Agregar CORS
        this.app.use(cors());
    }

    routes() {
        this.app.get("/encenderRiego", async (req, res) => {
            // Cambiar estado =1 en la base de datos
            console.log("Encendiendo...");
            // await this.Riego.updateOne({}, { estado: "1" }, { upsert: true })
            res.status(200).send('Ok encendido');
        });

        this.app.get("/apagarRiego", async (req, res) => {
            // Cambiar estado =0 en la base de datos
            console.log("Apagando...");
            // await this.Riego.updateOne({}, { estado: "0" }, { upsert: true })
            res.status(200).send('Ok apagado');
        });

        this.app.get("/consultar", async (req, res) => {
            console.log("Ruta consultar...");

            // const Empleado = await this.Empleados.find({});
            // console.log(Empleado);
            // res.json(Empleado);
            res.json([]);
        });

        this.app.get("/registrar", (req, res) => {
            let nombre = req.query.nombre;
            let numero = req.query.numero;
            let puesto = req.query.puesto;
            let departamento = req.query.departamento;

            // let empleado1 = new this.Empleados({
            //     nombre: nombre,
            //     numero: numero,
            //     puesto: puesto,
            //     departamento: departamento
            // });
            // empleado1.save();
            res.send("Ok");
        });

        // this.app.get("/registrarEstado", (req, res) => {
        //     let estado = req.query.estado;

        //     let estado1 = new this.Riego({
        //         estado: estado
        //     });
        //     estado1.save();
        //     res.send("Ok");
        // });

        // this.app.get("/consultar", async (req, res) => {
        //     console.log("Ruta consultar...");

        //     try {
        //         const empleados = await this.Empleados.find({});
        //         console.log(empleados);
        //         res.json(empleados);
        //     } catch (err) {
        //         console.error('Error al consultar empleados:', err);
        //         res.status(500).json({ message: 'Error al consultar empleados' });
        //     }
        // });

        // Agregar una ruta para consultar registros (tema libre)
        this.app.get("/pokemon", (req, res) => {
            console.log("Ruta pokemon...");

            let pokemon = {
                "pokemon": [
                    { "nombre": "charizard", "num_pokedex": "658" },
                    { "nombre": "Greninja", "num_pokedex": "658" }
                ],
                "entrenador": [
                    { "nombre": "Alejandro", "num": "6554651", "apellido": "f" },
                    { "nombre": "Luis", "num": "6554651", "apellido": "f" }
                ]
            };
            res.json(pokemon);
        });
    }

    listen() {
        /* https.createServer({
            key: fs.readFileSync('cert.key'),
            cert: fs.readFileSync('cert.crt'),
            // passphrase:'1234',
        }, () => { */
        this.app.listen(this.port, () => {
            console.log('https://127.0.0.1:' + this.port);
        });
    }
}

module.exports = Server;
