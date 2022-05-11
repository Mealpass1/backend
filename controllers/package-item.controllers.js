const Items = require("../models/package-item.model")

exports.getItems = async (req, res) => {
    const data = {
        package: req.params.package,
        restaurant: req.params.restaurant
    }

    try {
        await Items.find({ package: data.package, restaurant: data.restaurant }).populate("dish").then(response => {
            return res.json({
                status: "success",
                message: "package items in one restaurant",
                data: response
            });
        })
    } catch (error) {
        return res.json({
            status: "error",
            message: error.message,
        });
    }
}

exports.getItem = async (req, res) => {
    const data = {
        id: req.params.id,
    }

    try {

        await Items.findById(data.id).populate("dish").then(response => {
            return res.json({
                status: "success",
                message: "package item",
                data: response
            });
        })

    } catch (error) {
        return res.json({
            status: "error",
            message: error.message,
        });
    }
}

exports.getPackageItems = async (req, res) => {
    const data = {
        package: req.params.package,
    }

    console.log(data);

    try {
        await Items.find({ package: data.package }).populate("dish").then(response => {
            return res.json({
                status: "success",
                message: "package items",
                data: response
            });
        })
    } catch (error) {
        return res.json({
            status: "error",
            message: error.message,
        });
    }
}