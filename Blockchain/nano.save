const express = require('express')
const next = require('next')
var fs = require("fs");
const cors = require('cors')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: ".", dev });
const routes = require("./routes");
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    const server = express();
    server.use(express.json()); //Permite recibir json en el Servidor
    server.use(express.urlencoded({ extended: true })); //permite recibir datos de formularios estended false dado son datos sencillos
    server.use(cors())


  server.get("*", (req, res) => {
    return handler(req, res);
  });

  server.post("/datos", (req, res) => {
    console.log("req.Body..............");
    console.log(req.body);
    const itemData = req.body;
   


    if(Object.keys(itemData).length === 0) {
      console.log("OBJETO VACIO");
      res.json("OBJETO VACIO...REENVIE DATOS");
    } else if (Object.keys(itemData)[0]==='certificateHash') {
      console.log("PROCEDE A VERIFICAR EL CERTIFICADO..");
      fs.readFile('../json/db.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        jsonString=JSON.parse(jsonString)
       
		var bar=false
        jsonString.certificates.map((cert)=>{
          
   
          if(cert.contract===itemData.certificateHash){
            console.log("si")
			
			res.json({validation: "true"})
			bar=true
          }else{
            console.log("no")
          }
        })
        if(bar===false){
			res.json({validation: "false"})}
    })
      //app.render(req, res, 'index',  {itemData} );
    } else if(Object.keys(itemData)[0]==='idStudent'){
      console.log("PROCEDE A GENERAR CERTIFICADO..");
      app.render(req, res, 'vows/new',  {itemData} );
      res.json("se genero el certificado con exito en 201.159.223.92");
    }else{
        console.log('Verifique la estructura de la peticiona y vuelva a intentar..');
    } 

    fs.appendFile("./object.json", `\n${JSON.stringify(itemData)}`, err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been GURADADO EN OBJECTS.JSON");
    });

  });

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
