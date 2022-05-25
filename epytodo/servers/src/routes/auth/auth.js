const router = global["router"];

router.post('/register', (req, res) => {
    const userData = {
        email: req.body["email"],
        name: req.body["name"],
        firstname: req.body["firstname"],
        password: req.body["password"]
    };

    return router.create_user(userData, req, res);
})

router.post('/login', (req, res) => {
    const userData = {
        email: req.body["email"],
        password: req.body["password"]
    };

    return router.login_user(userData, req, res);
});

module.exports = router;