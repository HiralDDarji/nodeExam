const Products = require('../models/products');

// Add Products
exports.addProduct = (req, res, next) => {
    if (req.userId) {
        let product_name = req.body.name;
        let price = req.body.price;
        let description = req.body.description;
        let productType = req.body.product_type == 'print' ? '0' : '1'; 
        let product_image = req.file;
        Products.create({
            product_name: product_name,
            price: price,
            description: description,
            product_type: productType,
            product_image: product_image.path,
            userId: req.userId
        })
        .then((product) => {
            return res.status(200).json({message: `${product_name} has been added sucessfully.!`});
        })
        .catch((err) => {
            return res.status(401).json({message: 'Please login to add product'});
        });
    } else {
        return res.status(401).json({message: 'Please login to add product'});
    }
}

// Edit product
exports.editProduct = (req, res, next) => {
    let userId = req.userId;
    let productId = req.params.productId;
    // Products.findAll({where: {product_id: productId, userId: userId}})
    Products.findByPk(productId)
    .then((product) => {
        fetchedProduct = product;
        if (fetchedProduct && fetchedProduct.userId != userId) {
            return res.status(401).json({message: "You are not authorized to Edit this product"});
        } else if (fetchedProduct && fetchedProduct.userId === userId) {
            let product_name = (req.body.name) ? req.body.name : fetchedProduct.product_name;
            let price = (req.body.price) ? req.body.price: fetchedProduct.price;
            let description = (req.body.description) ? req.body.description : fetchedProduct.description;
            let productType;
            if (req.body.product_type) {
                productType = req.body.product_type == 'print' ? '0' : '1';
            } else {
                productType = fetchedProduct.product_type;
            }
            // let productType = req.body.product_type == 'print' ? '0' : '1';
            let product_image = fetchedProduct.product_image;
            if (req.file) {
                product_image = req.file;
            }
            Products.update({
                product_name: product_name,
                price: price,
                description: description,
                product_type: productType,
                product_image: product_image.path,
                userId: req.userId
            }, {where : {product_id: productId, userId: userId}})
            .then((updated) => {
                return res.status(202).json({message: "Product Updated Sucessfully"});
            })
            .catch((err) => {
                return res.status(401).json({message: `Error in updating product ${err}`})
            })
        } else {
            return res.status(401).json({message: "You are not authorized to Edit this product"});
        }
    })
}

// List all the products
exports.viewAllProducts = (req, res, next) => {
    let queryParam = req.query;
    /* let extraWhere = '';
    if (queryParam.product_name) {
        extraWhere = 'product_name like ' + `%${queryParam.product_name}%`;
    }
    if (queryParam.desc) {
        extraWhere += ' OR product_name like ' + `%${queryParam.desc}%`;
    } */
    if (req.userId) {
        let extraCond = {};
        extraCond.where = {userId: req.userId};
        if (queryParam.page) {
            extraCond.offset = parseInt(queryParam.page);
        }
        if (queryParam.size) {
            extraCond.limit = parseInt(queryParam.size);
        }
        Products.findAndCountAll(extraCond)
        .then((products) => {
            return res.status(200).json({products: products, page: extraCond.offset, currentCount: extraCond.limit});
        })
        .catch((err) => {
            return res.status(401).json({message: 'Error while fetching products'});
        })
    } else {
        return res.status(401).json({message: 'Please login to View your products'});
    }
};

// View product by id
exports.viewSpecificProduct = (req, res, next) => {
    if (req.userId && req.params.productId) {
        Products.findByPk(req.params.productId)
        .then((product) => {
            if (product.userId !== req.userId) {
                return res.status(401).json({message: 'Please login to View your products'});
            }
            return res.status(200).json({products: product});
        })
        .catch((err) => {
            return res.status(401).json({message: 'Error while fetching products'});
        })
    } else {
        return res.status(401).json({message: 'Please login to View your products'});
    }
};

// Delete Product
exports.deleteProduct = (req, res, next) => {
    let delProdId = req.params.productId;
    if (delProdId) {
        Products.findAll({where: {product_id: delProdId, userId: req.userId}})
        .then((product) => {
            product.destroy();
            return res.status(200).json({message: "Product deleted sucessfully!"});
        })
        .catch((err) => {
            return res.status(500).json({message: "Product not Found!"});
        })
    } else {
        return res.status(404).json({message: "Please give product id to delete!"});
    }
}