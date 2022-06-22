const router = global["router"];
const db = require('../../config/db');

router.get_todo_info = function(id, req, res) {
    const get_infos_with_id = `SELECT * FROM todo WHERE id = ?`;

    if (id)
        db.query(get_infos_with_id, [id], (err, results) => {
            if (err)
                return res.status(500).json({ msg: `Internal server error` });
            if (results.length > 0)
                return res.status(200).json(results);
            else
                return res.status(204).json({ msg: `Not found` });
        });
    else
        return res.status(400).json({ msg: `Bad parameter` });
}

router.create_todo = function(todoData, req, res) {
    const add_todo = `INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)`;

    if (todoData["title"] && todoData["description"] && todoData["due_time"] &&
        todoData["user_id"] && todoData["status"])
        db.query(add_todo, [todoData["title"], todoData["description"], todoData["due_time"],
            todoData["user_id"], todoData["status"]
        ], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: `Internal server error` });
            } else
                return router.get_todo_info(results["insertId"], req, res);
        });
    else
        return res.status(400).json({ msg: `Bad parameter` });
}

router.update_todo = function(todoData, id, req, res) {
    const check_todo = `SELECT * FROM todo WHERE id = ?`;
    const update_todo = `UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?`;

    if (todoData["title"] && todoData["description"] && todoData["due_time"] &&
        todoData["user_id"] && todoData["status"])
        db.query(check_todo, [id], (err, results) => {
            if (err)
                return res.status(500).json({ msg: `Internal server error` });
            if (results.length > 0)
                db.query(update_todo, [todoData["title"], todoData["description"], todoData["due_time"],
                    todoData["user_id"], todoData["status"], id
                ], (err) => {
                    if (err)
                        return res.status(500).json({ msg: `Internal server error` });
                    db.query(check_todo, [id], (err, results) => {
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

router.delete_todo = function(id, req, res) {
    const check_todo = `SELECT * FROM todo WHERE id = ?`;
    const delete_todo = `DELETE from todo WHERE id = ?`;

    if (id)
        db.query(check_todo, [id], (err, results) => {
            if (err)
                return res.status(500).json({ msg: `Internal server error` });
            if (results.length > 0)
                db.query(delete_todo, [id], (err) => {
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

module.exports = router;