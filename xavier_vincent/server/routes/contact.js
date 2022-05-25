const router = global["router"];

router.post('/contact', (data, req, res) => {
    if (!data)
        return res.status(500).json("No data given");
    return res.status(200).json(data);
})

module.exports = router;