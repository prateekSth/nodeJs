const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const helmet = require("helmet");
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
app.use(express.static(publicDirectory));
// app.use(express.static(templeteDirectory))

app.set("view engine", "hbs");
app.set("views", viewsDirectory);

hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "Prateek",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Seciton",
    helpText: "Help Me",
    name: "Prateek",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Seciton",
    name: "Prateek",
  });
});
app.get("/weather", (req, res) => {
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
               return res.send(error)
            }
    
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
});
app.get("/address", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must enter your address",
    });
  }
  res.send({
    forecast:'It is snowing',
    location:'bharatpur',
    address: req.query.address
  })
});

app.get('/cspresponseheaders.html',(req,res)=>{
  res.setHeader()
})
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    name: "Prateek",
    errorMessage: "Page Not found.",
  });
});

app.listen(port, () => console.log(`Server is upon port ${port}`));




