import categoryModel from "../modles/category.modle"


module.exports = {
    create: async function (req, res) {
        try {
            let result = await categoryModel.create(req.body)
            if (result.status) {
                return res.status(200).json({
                    message: result.message,
                    data: result.data
                })
            }
            return res.status(500).json({
                message: result.message
            })
        } catch (err) {
            return res.status(500).json(
                {
                    message: "lôi không xác định !",
                }
            )
        }
    }
}