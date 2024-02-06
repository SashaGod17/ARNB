const User = require('../models/user');

const userController = {
    async createUser(req, res) {
        const user = new User(req.body);

        try {
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token });
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async loginUser(req, res) {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();
            res.send({ user, token });
        } catch (error) {
            res.status(400).send();
        }
    },

    async logoutUser(req, res) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
            await req.user.save();
            res.send();
        } catch (error) {
            res.status(500).send();
        }
    },

    async getUserProfile(req, res) {
        res.send(req.user);
    }
};

module.exports = userController;
