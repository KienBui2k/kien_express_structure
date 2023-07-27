import { mySQL } from '../databases/mySQL';

module.exports = {
    getUsers: function () {
        return new Promise((resolve, reject) => {

            let queryString = `
                SELECT users.*
                FROM users
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "Lỗi trong quá trình truy vấn"
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Get user thành công",
                        data: result
                    }
                )
            })
        }).catch(err => {
            return {
                status: false,
                message: "Lỗi cú pháp"
            }
        })
    },
    getUserById: function (userId) {
        return new Promise((resolve, reject) => {
            let queryString = `
                SELECT users.*
                FROM users
                WHERE id=${userId}
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "Lỗi trong quá trình truy vấn"
                        }
                    )
                }
                if (result.length === 0) {
                    return resolve(
                        {
                            status: false,
                            message: `không tìm thấy user nào có id = ${userId}`,
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Get user by id thành công",
                        data: result[0]
                    }
                )
            })
        }).catch(err => {
            return {
                status: false,
                message: "Lỗi cú pháp"
            }
        })
    },
    getUsersDetailById: function (userId) {
        return new Promise((resolve, reject) => {
            let queryString = `
                SELECT users.*, user_address.id as addressId, user_address.name as addressName, user_address.provinceId, user_address.wardId
                FROM users
                LEFT JOIN user_address on users.id = user_address.userId
                WHERE users.id = ${userId}
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "Lỗi trong quá trình truy vấn"
                        }
                    )
                }
                let user;
                for (let i in result) {
                    if (!user) {
                        user = {
                            id: result[i].id,
                            name: result[i].name,
                            email: result[i].email,
                            address:
                                result[i].addressId
                                    ?
                                    [
                                        {
                                            id: result[i].addressId,
                                            name: result[i].addressName,
                                            provinceId: result[i].provinceId,
                                            wardId: result[i].wardId,
                                        }
                                    ]
                                    :
                                    []
                        }
                        continue;
                    }
                    user.address.push(
                        {
                            id: result[i].addressId,
                            name: result[i].addressName,
                            provinceId: result[i].provinceId,
                            wardId: result[i].wardId,
                        }
                    )

                }
                if (!user) {
                    return resolve(
                        {
                            status: false,
                            message: `không tìm thấy user nào có id = ${userId}`,
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Get user thành công",
                        data: user
                    }
                )
            })
        }).catch(err => {
            return {
                status: false,
                message: "Lỗi cú pháp"
            }
        })
    },
    
    createUser: function (newUser) {
        return new Promise((resolve, reject) => {
            // let queryString = `
            // INSERT INTO users (id, name, email)
            //  VALUES (NULL, '${newUser.name}', '${newUser.email}');
            // `
            let queryString = `
            INSERT INTO users SET ?
            `
            mySQL.query(queryString, newUser, async (err, result) => {
                if (err) {
                    // console.log("lỗi truy vẫn", err);
                    return resolve(
                        {
                            status: false,
                            message: err.code == "ER_DUP_ENTRY" ? "Email này đã tồn tại!" : "Lỗi truy vấn!"
                        }
                    )
                }
                let insertData = await this.getUserById(result.insertId)

                return resolve(
                    {
                        status: true,
                        message: "insert user thành công",
                        data: insertData.status ? insertData.data : []
                    }
                )
            })
        }).catch(err => {
            return {
                status: false,
                message: "Lỗi cú pháp"
            }
        })
    }
    , deleteUser: function (userId) {
        return new Promise((resolve, reject) => {

            let queryString = `
                DELETE FROM users WHERE users.id=${userId}
            `
            mySQL.query(queryString, (err, result) => {

                if (err || result.affectedRows == 0) {
                    if (result.affectedRows == 0) {
                        return resolve(
                            {
                                status: false,
                                message: "Không tìm thấy user nào với ID=" + userId
                            }
                        )
                    }
                    return resolve(
                        {
                            status: false,
                            message: err.code == "ER_ROW_IS_REFERENCED_2" ? "User Id này đang dính khóa ngoại" : "Lỗi trong quá trình truy vấn"
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: `xoa thành công User có id là ${userId}`,
                        data: result
                    }
                )
            })
        }).catch(err => {
            return {
                status: false,
                message: "Lỗi cú pháp"
            }
        })
    },
    updateUserById: function (userId, updateData) {
        return new Promise((resolve, reject) => {
            let queryString = `
                UPDATE users 
                SET name="${updateData.name}", email="${updateData.email}"
                WHERE users.id=${userId}
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "lỗi không xác định!"
                        }
                    )
                } else {
                    return resolve(
                        {
                            status: true,
                            message: "thêm mới user thành công"
                        }
                    )
                }
            })
        }).catch(err => {
            return {
                status: false,
                message: "Lỗi cú pháp"
            }
        })
    },
    updateFieldUserById: function (userId, patchData) {
        return new Promise((resolve, reject) => {
            let patchString = ``;
            for (let i in patchData) {
                patchString += `${i}="${patchData[i]}",`
            }

            let queryString = `
                UPDATE users 
                SET ${patchString.substring(0, patchString.length - 1)}
                WHERE users.id=${userId};
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "lỗi không xác định!"
                        }
                    )
                } else {
                    return resolve(
                        {
                            status: true,
                            message: "thêm mới user thành công"
                        }
                    )
                }
            })
        }).catch(err => {
            return {
                status: false,
                message: "Lỗi cú pháp"
            }
        })
    }
}