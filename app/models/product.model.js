const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(

 	{} ,
	{ 	strict: false,

		timestamps: true 
	}

);

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', ProductSchema);