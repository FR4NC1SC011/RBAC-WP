import express from "express";
import { defineRulesFor } from "./abilities.js";
import { ForbiddenError } from "@casl/ability";

const app = express();
app.use(express.json());
class Asset {
  constructor(id) {
    this.id = id;
  }
}

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body;
    const { asset: assetId } = req.params;
    const ability = defineRulesFor(user);
    const asset = new Asset(assetId);
    try {
      ForbiddenError.from(ability).throwUnlessCan(action, asset);
      next();
    } catch (error) {
      res.status(403).send("Prohibido").end();
    }
  };
};

app.get("/api/:asset", hasPermission("create"), (req, res) => {
  res.send("Tenemos permiso");
});

app.put("/api/:asset", hasPermission("update"), (req, res) => {
  res.send("Tenemos permiso");
});

app.delete("/api/:asset", hasPermission("read"), (req, res) => {
  res.send("Tenemos permiso");
});

app.delete("/api/:asset", hasPermission("destroy"), (req, res) => {
  res.send("Tenemos permiso");
});

app.listen(8080, () => {
  console.log("Escuchando puerto: 8080");
});
