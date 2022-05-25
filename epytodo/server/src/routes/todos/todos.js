const router = global["router"];

router.get('/todos', router.verifyToken, (req, res) => {
    return router.get_todos(req, res);
});

router.get('/todos/:id', router.verifyToken, (req, res) => {
    const id = req.params["id"];

    return router.get_todo_info(id, req, res);
});

router.post('/todos', router.verifyToken, (req, res) => {
    const todoData = {
        title: req.body["title"],
        description: req.body["description"],
        due_time: req.body["due_time"],
        user_id: req.body["user_id"],
        status: req.body["status"]
    };

    return router.create_todo(todoData, req, res);
});

router.put('/todos/:id', router.verifyToken, (req, res) => {
    const id = req.params["id"];
    const todoData = {
        title: req.body["title"],
        description: req.body["description"],
        due_time: req.body["due_time"],
        user_id: req.body["user_id"],
        status: req.body["status"]
    };

    return router.update_todo(todoData, id, req, res);
});

router.delete('/todos/:id', router.verifyToken, (req, res) => {
    const id = req.params["id"];

    return router.delete_todo(id, req, res);
});

module.exports = router;