## Building Product Module With Node.js

This application is created using REST API. Which includes User & products module.

# Directory Structure

This application includes only one entry point app.js

1. **controllers**
    - auth.js which contains control method for signup & login related functionality
    - products.js which contains functionalities related to managing product like Add, Update, Delete, List all products & View Specific Product.
    
1. **images**
    - This directory includes product images.
1. **middleware**
    - In middleware directory i have included validation and authentication related functionality, which is used to restict customer for unauthorized activity
1. **models**
    - Database model defination for User & Product tables.
    *Products*
1. **routes**
    - Defined registration, login routes in auth.js & view, update, delete, list, add product routes in products.js
1. **util**
    - It inclued file which is used to connect database.

# Use below endpoints for Data manipulation
     
1. **Register New User**

        POST http://localhost:8080/auth/register
        Sample form-data:
            name - Hiral,

            email - hiral.darji@radixweb.com,

            password - your_password


1. **Logging In**

        - POST http://localhost:8080/auth/login
            - Sample form-data:
            email - hiral.darji@radixweb.com,

            password - your_password
        - Output: 
        <pre> {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpbWFuQDEyMy5vcHMiLCJ1c2VySWQiOjQsImlhdCI6MTcxNDgyMjU5OSwiZXhwIjoxNzE0ODI2MTk5fQ.C2Al4veK25oW9CjJ21jgQLzoqwesFVGe8RIXH99k8UM", "message": "You have logged in successfully"}</pre>

        **Note: Need to pass authentication token recieved in login response as Authorization Baarer Token for List products, Add products, View Product, Edit Product & Delete Product.**

1. **Retrieving a List of Products**

        - GET http://localhost:8080/Products
            - Only Baarer token required.
            - Query params for pagination: 
            http://localhost:8080/products?page=3&size=2
            page & size
    
1. **Retrieving a Specific Product**

        - GET http://localhost:8080/products/:pid
            http://localhost:8080/products/4
            - Only Baarer token required. 

1. **Creating a New Product**

        POST http://localhost:8080/products
            * sample form-data 

                name - product's name
                price - Product's price,
                description - Product's description
                product_type - print or promotional
                image (type-file) - image upload
    
1. **Updating an Existing Product**

        - PUT http://localhost:8080/products/:pid
            http://localhost:8080/products/4
            * Sample form-data (Note - only fields which you need to modify)
                - name - product's name
                - price - Product's price,
                - description - Product's description
                - product_type - print or promotional
                - image (type-file) - image upload

1. **Deleting a Product**

        - DELETE http://localhost:8080/product/:pid
            http://localhost:8080/product/4
