import productModel from "../modles/product.model";
module.exports = {
    getProducts: function (req, res) {
        try {
            let result = productModel.getProducts();
            if (result.status) {
                return res.status(200).json(
                    {
                        messsage: result.message,
                        data: result.data
                    }
                )
            } else {
                return res.status(500).json(
                    {
                        message: result.message
                    }
                )
            }
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi không xác định!",
            })
        }
    },
    createProduct: function (req, res) {
        let result = productModel.createProduct(req.body);
    },
    createProductDefault: function (req, res) {
        let result = productModel.createProductDefault();
    },
    deleteProductById: async function (req, res) {
        const productId = req.params.productId;

        try {
            const deletedProduct = await productModel.deleteProductById(productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found." });
            }
            return res.json({ message: "Product deleted successfully." });
        } catch (error) {
            console.log("Error deleting product:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
}