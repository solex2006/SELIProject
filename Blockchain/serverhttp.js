const express = require("express");
const next = require("next");
const cors = require('cors');
var fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: ".", dev });
const routes = require("./routes");
const handler = routes.getRequestHandler(app);
const mongoose = require("mongoose");
const config = require("./config");
const auth = require("./middlewares/auth");
//rutas
const userCtrl = require("./controllers/user");
// Whitelist the following IPs
//const ipfilter = require('express-ipfilter').IpFilter

// Create the server

app.prepare().then(() => {
  //const ips = config.addressAllow; //localhost ::ffff:192.168.18.4 for otehr addresses
  const server = express();
  server.use(express.json()); //Permite recibir json en el Servidor
  server.use(express.urlencoded({ extended: false })); //permite recibir datos de formularios estended false dado son datos sencillos
  server.use(cors());

  server.get("*", (req, res) => {
    return handler(req, res);
  });

  server.post("/login/user", userCtrl.signUp);
  server.post("/datos", auth, (req, res) => {
    console.log(req.body);
    const itemData = req.body;
    console.log("datos de llegada al server Blockchain", itemData);

    if (Object.keys(itemData).length === 0) {
      res.json("OBJETO VACIO...REENVIE DATOS");
    } else if (Object.keys(itemData)[0] === "certificateHash") {
      //ONLY FOR VALIDATE
      console.log("PROCEDE A VERIFICAR EL CERTIFICADO..");
      fs.readFile("../json/db.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        jsonString = JSON.parse(jsonString);

        var bar = false;
        jsonString.certificates.map((cert) => {
          if (cert.contract === itemData.certificateHash) {
            console.log("si");
            res.json({ validation: "true" });
            bar = true;
          } else {
            console.log("no");
          }
        });
        if (bar === false) {
          res.json({ validation: "false" });
        }
      });
    } else if (Object.keys(itemData)[0] === "idStudent") {
      //TO GENERATE THE CERT
      console.log("PROCEDE A GENERAR CERTIFICADO..");

      app.render(req, res, "vows/new", { itemData });
      //CreateCert(itemData)
      res.json("se genero el certificado con exito en 201.159.223.92");
    } else {
      console.log(
        "Verifique la estructura de la peticion y vuelva a intentar.."
      );
    }
    fs.appendFile("./object.json", `\n${JSON.stringify(itemData)}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been GURADADO EN OBJECTS.JSON");
    });
  }); // end pos /datos
  server.post("/badges/issue", auth, (req, res) => {
    console.log("issue");
    try {
      const itemData = req.body;
      console.log("datos de llegada al server Blockchain", itemData);

      if (Object.keys(itemData).length === 0) {
        res.json("OBJETO VACIO...REENVIE DATOS");
      } else if (Object.keys(itemData)[1] === "id") {
        //ONLY FOR VALIDATE
        console.log("PROCEDE A VERIFICAR la badge..");
        //   fs.readFile("../json/db.json", "utf8", (err, jsonString) => {
        //     if (err) {
        //       console.log("File read failed:", err);
        //       return;
        //     }
        //     jsonString = JSON.parse(jsonString);

        //     var bar = false;
        //     jsonString.certificates.map((cert) => {
        //       if (cert.contract === itemData.certificateHash) {
        //         console.log("si");
        //         res.json({ validation: "true" });
        //         bar = true;
        //       } else {
        //         console.log("no");
        //       }
        //     });
        //     if (bar === false) {
        //       res.json({ validation: "false" });
        //     }
        //   });
        // } else if (Object.keys(itemData)[0] === "idStudent") {
        //   //TO GENERATE THE CERT
        //   console.log("PROCEDE A GENERAR CERTIFICADO..");
        //descomentar
        app.render(req, res, "/badges/issueBadge", { itemData });
        //CreateCert(itemData)
        res.json("se genero el badge con exito en 201.159.223.92");
      } else {
        console.log(
          "Verifique la estructura de la peticion y vuelva a intentar.."
        );
      }
      // fs.appendFile("./object.json", `\n${JSON.stringify(itemData)}`, (err) => {
      //   if (err) {
      //     console.error(err);
      //     return;
      //   }
      //   console.log("File has been GURADADO EN OBJECTS.JSON");
      // });
      res.status(200).json(body);
    } catch {
      res.status(400).send({ msg: "error" });
    }
  });

  mongoose.connect(config.db, (err, res) => {
    if (err) {
      return console.log(`Error al conectar a la base de datos: ${err}`);
    }
    console.log("Conexión a la base de datos establecida...");
    server.listen(config.porthttp, () => {
      console.log(`API REST corriendo en http://localhost:${config.porthttp}`);
    });
  });
});
