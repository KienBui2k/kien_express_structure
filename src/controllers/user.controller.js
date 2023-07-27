import userModule from "../modles/user.modle";

module.exports = {
    getUsers: async function (req, res) {
        // console.log("kiem tra req", req.headers['accept-language']);
        if (req.query.userId) {
            if (JSON.parse(req.query.detail)) {
                let result = await userModule.getUsersDetailById(req.query.userId);
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
            }
            let result = await userModule.getUserById(req.query.userId);
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
        }
        let result = await userModule.getUsers();
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
    },
    createUser: async function (req, res) {

        // if (isNaN(Number(req.query.userId))) {
        //     return res.status(400).json({
        //         message: "userId bạn nhập vào không phải là một số"
        //     });
        // }

        let result = await userModule.createUser(req.body);
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
    },
    deleteUserById: async function (req, res) {
        let result = await userModule.deleteUser(req.params.userId);
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
    },
    updateUserById: async function (req, res) {
        let result = await userModule.updateUserById(req.params.userId, req.body);
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
    },
    updateFieldUserById: async function (req, res) {
        let result = await userModule.updateFieldUserById(req.params.userId, req.body);
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
    }
}