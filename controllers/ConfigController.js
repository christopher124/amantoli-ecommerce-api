var Config = require("../models/config");
var fs = require("fs");
var path = require("path");

const obtener_config_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      let reg = await Config.findById({ _id: "63420de5c177561ce13502be" });
      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ message: "Sin Acceso" });
    }
  } else {
    res.status(500).send({ message: "Sin Acceso" });
  }
};

const actualizar_config_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      let data = req.body;

      if (req.files) {
        console.log("Si hay imagen");
        var img_path = req.files.logo.path;
        var name = img_path.split("\\");
        var logo_name = name[2];

        let reg = await Config.findByIdAndUpdate(
          { _id: "63420de5c177561ce13502be" },
          {
            categorias: JSON.parse(data.categorias),
            titulo: data.titulo,
            logo: logo_name,
            serie: data.serie,
            correlativo: data.correlativo,
          }
        );
        fs.stat("./uploads/configuraciones/" + reg.logo, function (err) {
          if (!err) {
            fs.unlink("./uploads/configuraciones/" + reg.logo, (err) => {
              if (err) throw err;
            });
          }
        });
        res.status(200).send({ data: reg });
      } else {
        console.log("no hay imagen");
        let reg = await Config.findByIdAndUpdate(
          { _id: "63420de5c177561ce13502be" },
          {
            categorias: data.categorias,
            titulo: data.titulo,
            serie: data.serie,
            correlativo: data.correlativo,
          }
        );
        res.status(200).send({ data: reg });
        res.status(200).send({ data: reg });
      }
    } else {
      res.status(500).send({ message: "Sin Acceso" });
    }
  } else {
    res.status(500).send({ message: "Sin Acceso" });
  }
};
const obtener_logo = async function (req, res) {
  var img = req.params["img"];
  fs.stat("./uploads/configuraciones/" + img, function (err) {
    if (!err) {
      let path_img = "./uploads/configuraciones/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.jpg/";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
  console.log(img);
};
const obtener_config_public = async function (req, res) {
  let reg = await Config.findById({ _id: "63420de5c177561ce13502be" });
  res.status(200).send({ data: reg });
};
module.exports = {
  actualizar_config_admin,
  obtener_config_admin,
  obtener_logo,
  obtener_config_public,
};
