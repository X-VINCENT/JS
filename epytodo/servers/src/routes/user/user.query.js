const router = global["router"];
const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.hash_password = function(password) {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
}

router.create_user = function(userData, req, res) {
    const options = {algorithm: "HS256"};
    const callback = {};
    const hashed_password = router.hash_password(userData["password"]);
    const token = jwt.sign({email: userData["email"], password: hashed_password},
        process.env.SECRET, options, callback);
    const check_user = `SELECT * FROM user WHERE email = ?`;
    const add_user = `INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)`;

    if (userData["email"] && userData["name"] && userData["firstname"] && userData["password"]) {
        db.query(check_user, [userData["email"]], (err, results) => {
            if (err)
                return res.stats(500).json({ msg: `Internal server error` });
            if (results.length > 0)
                return res.status(400).json({msg: `Account already exists`});
            else
                db.query(add_user, [userData["email"], userData["name"],
                    userData["firstname"], hashed_password], (err) => {
                    if (err)
                        return res.status(500).json({ msg: `Internal server error` });
                    return res.status(200).json({token: `${token}`});
                });
        });
    } else
        return res.status(400).json({ msg: `Bad parameter` });
}

router.login_user = function(userData, req, res) {
    const options = {algorithm: "HS256"};
    const callback = {};
    const hashed_password = router.hash_password(userData["password"]);
    const token = jwt.sign({email: userData["email"], password: hashed_password},
        process.env.SECRET, options, callback);
    const login_user = `SELECT * FROM user WHERE email = ?`;

    if (userData["email"] && userData["password"]) {
        db.query(login_user, [userData["email"]], (err, results) => {
            if (err)
                return res.status(500).json({ msg: `Internal server error` });
            if (results.length > 0 && bcrypt.compareSync(userData["password"], results[0].password))
                return res.status(200).json({ token: `${token}` });
            else
                return res.status(400).json({ msg: `Invalid Credentials` });
        });
    } else
        return res.status(400).json({ msg: `Bad parameter` });
}

router.get_users = function(req, res) {
    const get_infos = `SELECT * FROM user`;

    db.query(get_infos, (err, results) => {
        if (err)
            return res.status(500).json({ msg: `Internal server error` });
        return res.status(200).json(results);
    });
}

router.get_todos = function(req, res) {
    const get_infos = `SELECT * FROM todo`;

    db.query(get_infos, (err, results) => {
        if (err)
            return res.status(500).json({ msg: `Internal server error` });
        return res.status(200).json(results);
    });
}

router.get_user_infos_id_email = function(credentials, req, res) {
    const get_infos_with_id = `SELECT * FROM user WHERE id = ?`;
    const get_infos_with_email = `SELECT * FROM user WHERE email = ?`;

    if (credentials)
        db.query(get_infos_with_id, [credentials], (err, results) => {
            if (err)
                return res.status(500).json({ msg: `Internal server error` });
            if (results.length > 0)
                return res.status(200).json(results);
            else
                db.query(get_infos_with_email, [credentials], (err, results) => {
                    if (err)
                        return res.status(500).json({ msg: `Internal server error` });
                    if (results.length > 0)
                        return res.status(200).json(results);
                    else
                        return res.status(204).json({ msg: `Not found` });
                });
        });
    else
        return res.status(400).json({ msg: `Bad parameter` });
}

router.delete_user = function(id, req, res) {
    const check_user = `SELECT * FROM user WHERE id = ?`;
    const delete_user = `DELETE from user WHERE id = ?`;

    if (id)
        db.query(check_user, [id], (err, results) => {
            if (err)
                return res.stats(500).json({ msg: `Internal server error` });
            if (results.length > 0)
                db.query(delete_user, [id], (err) => {
                    if (err)
                        return res.status(500).json({ msg: `Internal server error` });
                    return res.status(200).json({ msg: `Successfully deleted record number: ${id}` });
                });
            else
                return res.status(204).json({ msg: `Not found` });
        });
    else
        return res.status(400).json({ msg: `Bad parameter` });
}

router.update_user = function(userData, id, req, res) {
    const check_user = `SELECT * FROM user WHERE id = ?`;
    const update_user = `UPDATE user SET email = ?, name = ?, firstname = ?, password = ? WHERE id = ?`;

    if (userData["email"] && userData["name"] && userData["firstname"] && userData["password"])
        db.query(check_user, [id], (err, results) => {
            if (err)
                return res.status(500).json({ msg: `Internal server error` });
            if (results.length > 0)
                db.query(update_user, [userData["email"], userData["name"], userData["firstname"],
                    userData["password"], id], (err, results) => {
                    if (err)
                        return res.status(500).json({ msg: `Internal server error` });
                    db.query(check_user, [id], (err, results) => {
                        if (err)
                            return res.status(500).json({ msg: `Internal server error` });
                        return res.status(200).json(results);
                    });
                });
            else
                return res.status(204).json({ msg: `Not found` });
        });
    else
        return res.status(400).json({ msg: `Bad parameter` });
}

module.exports = router;
