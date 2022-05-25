const router = global["router"];

router.get('/user', router.verifyToken, (req, res) => {
    return router.get_users(req, res);
});

router.get('/user/todos', router.verifyToken, (req, res) => {
    return router.get_todos(req, res);
});

router.get('/users/:credentials', router.verifyToken, (req, res) => {
    const credentials = req.params["credentials"];

    return router.get_user_infos_id_email(credentials, req, res);
});

router.delete('/users/:id', router.verifyToken, (req, res) => {
    const id = req.params["id"];

    return router.delete_user(id, req, res);
});

router.put('/users/:id', router.verifyToken, (req, res) => {
    const id = req.params["id"];
    const userData = {
        email: req.body["email"],
        name: req.body["name"],
        firstname: req.body["firstname"],
        password: req.body["password"]
    };

    return router.update_user(userData, id, req, res);
});

module.exports = router;