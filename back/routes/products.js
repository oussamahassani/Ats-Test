const app = require("express").Router();
const NodeCache = require("node-cache");
const myCache = new NodeCache();
let Products = require("../model/Products");

const axios = require("axios");
//1/ Recuperer les produits exposés et les sauvgarder dans la base de donnée.
let options = {
  method: "GET",
  url: "https://tech.dev.ats-digital.com/api/products?size=5000",
};
app.route("/products").get(async (req, res) => {
  try {
    axios
      .request(options)
      .then(async function (response) {
        const countProducts = await Products.countDocuments();
        if (countProducts > 0) await Products.remove({});
        let prod = response.data.products;
        await Products.insertMany(prod);
        res.status(200).send({ msg: "add success" });
      })

      .catch(function (error) {
        res.status(500).send({ msg: error });
      });
  } catch (error) {
    Console.error("erreur", error);
    res.status(500).send("server Error" + error);
  }
});

//retourner la liste des produits par 20 avec filter (req.query si existe)
app.route("/product/:step").get(async (req, res) => {
  try {
    let step = req.params.step;

    let valuequery = Object.values(req.query);

    if (valuequery.length > 0 && myCache.has(valuequery + step)) {
      // Serve response from cache using myCache.get(key)
      res.json({
        curentpage: myCache.get(valuequery + step),
        totalData: myCache.get("lengthData" + valuequery + step),
      });
    } else if (myCache.has("only" + step) && valuequery.length == 0) {
      console.log("Retrieved value from cache !!");

      
      res.json({
        curentpage: myCache.get("only" + step),
        totalData: myCache.get("lengthData"),
      });
    } else {
      const lengthData = await Products.find(req.query).countDocuments();
      const prod = await Products.find(req.query)
        .skip(parseInt(step))
        .limit(20);
      if (valuequery.length > 0) {
        myCache.set("lengthData" + valuequery + step, lengthData);
        myCache.set(valuequery + step, prod);
      } else {
        myCache.set("only" + step, prod);
        myCache.set("lengthData", lengthData);
      }
      res.json({ curentpage: prod, totalData: lengthData });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ erreur: error });
  }
});

// retourner le produit par id
app.route("/oneproduct/:id").get(async (req, res) => {
  try {
    const prod = await Products.findById(req.params.id); 
    if (!prod) {
      return res.status(404).json({ msg: "prod not found" });
    }
    res.json(prod.toJSON({ virtuals: true }));
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "prod not found" });
    }
    res.status(500).send("server Error");
  }

});
//retourner la liste des produits par 20 avec filter par rating
app.route("/findbyReview/:step").get(async (req, res) => {
  try {
    let step = Number(req.params.step);
    if(req.query.length > 0){
    console.log("test",...req.query)
    }
    let rating = Number(req.query.rating);
         delete req.query.rating
console.log(req.query)
if(req.query.length > 0){
  console.log(req.query)
}

console.log(req.query)

    const prod = await Products.aggregate([
      { $unwind: "$reviews" },

      {
        $group: {
          _id: "$_id",
          averageScore: { $avg: "$reviews.value" },
          price: { $first: "$price" },
          productName: { $first: "$productName" },
          category: { $first: "$category" },
          imageUrl:{$first :"$imageUrl"}
        },
      },
      { $match: { averageScore: { $gt: rating } } },

     // { "$project": { "_id": 1, "price": 1, "category": 1 } },
      {
      $facet: {
        curentPage: [{ $skip: step }, { $limit: 20 }],
        totalData: [
          {
            $count: 'count'
          }
        ]
      }
    }
      
    ])
    res.status(200).json({ resulta: prod});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
//filtrer par categorie
app.route("/productCat").get(async (req, res) => {
  try {
    const categorie = await Products.distinct("category");
    res.json(categorie);
  } catch (error) {
    res.status(500).send("server Error" + error);
  }
});

module.exports = app;
