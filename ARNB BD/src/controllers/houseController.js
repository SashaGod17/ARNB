const House = require('../models/house');
const User = require('../models/user');

const houseController = {
    
    async createHouse(req, res) {
        try {
            const { title, description, location, price, capacity, amenities } = req.body;
            const house = new House({
                title,
                description,
                location,
                price,
                capacity,
                amenities,
                owner: req.user._id, 
                host: null 
            });
            await house.save();
            res.status(201).send(house);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    
    async rentHouse(req, res) {
        const { id } = req.params;
        try {
            const house = await House.findById(id);
            if (!house) {
                return res.status(404).send({ error: 'House not found' });
            }
            
            if (house.host !== null) {
                return res.status(400).send({ error: 'House already rented' });
            }
            
            house.host = req.user._id;
            await house.save();
            res.send(house);
        } catch (error) {
            res.status(500).send(error);
        }
    },

        
        async updateHouse(req, res) {
            const updates = Object.keys(req.body);
            const allowedUpdates = ['title', 'description', 'location', 'price', 'capacity', 'amenities'];
            const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
            if (!isValidOperation) {
                return res.status(400).send({ error: 'Invalid updates!' });
            }
    
            try {
                const house = await House.findOne({ _id: req.params.id, owner: req.user._id });
    
                if (!house) {
                    return res.status(404).send();
                }
    
                updates.forEach(update => house[update] = req.body[update]);
                await house.save();
                res.send(house);
            } catch (error) {
                res.status(400).send(error);
            }
        },
    
        
        async deleteHouse(req, res) {
            try {
                const house = await House.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    
                if (!house) {
                    return res.status(404).send();
                }
    
                res.send(house);
            } catch (error) {
                res.status(500).send(error);
            }
        },
    
        
        async getAllHouses(req, res) {
            try {
                const houses = await House.find({ owner: { $ne: req.user._id } });
                res.send(houses);
            } catch (error) {
                res.status(500).send(error);
            }
        },

        async getHouseById(req, res) {
            const { id } = req.params;
            try {
                const house = await House.findById(id);
                if (!house) {
                    return res.status(404).send({ error: 'House not found' });
                }
                res.send(house);
            } catch (error) {
                res.status(500).send(error);
            }
        },

        async getOwnedHouses(req, res) {
            try {
                
                const houses = await House.find({ owner: req.user._id });
                res.send(houses);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    
};

module.exports = houseController;
