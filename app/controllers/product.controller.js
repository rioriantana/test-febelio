const Promise = require('promise');
const Product = require('../models/product.model.js');
const cheerio = require('cheerio');
const fetch = require('node-fetch');


exports.saveLink = (req, res)=>{
    url = req.body.link;
    fetch(url).then(res=>res.text())
    .then(body=>{
        let $ = cheerio.load(body);
        var kode = $('#product-ratings').attr('data-product-id');
        fetch('https://fabelio.com/insider/data/product/id/'+kode)
        .then(res=> res.json())
        .then(json=> {
            const product = new Product(json);
            product.save()
            .then(result=>{
                res.redirect('/detail_product/'+result._id);
            }).catch(err=>{
                res.json(err);
            })
        })
        .catch(err => res.json(err));
    }).catch(err => res.json(err));
}

exports.detail_product = (req, res)=>{
    id = req.params.id;
    
    Product.findById(id)
    .lean()
    .exec(function (err, results) {
        if (err) res.json(err)
        try {
            console.log(results.product)
            return res.render('detail',{results : results.product})            
        } catch (error) {
            console.log("errror getting results")
            console.log(error)
        } 
    })
}

exports.list_product = (req, res)=>{
    
    Product.find()
    .lean()
    .exec(function (err, results) {
        if (err) res.json(err)
        try {
            console.log(results)
            return res.render('list',{results : results})            
        } catch (error) {
            console.log("errror getting results")
            console.log(error)
        } 
    })
}