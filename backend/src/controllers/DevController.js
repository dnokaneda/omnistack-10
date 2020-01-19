const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');


module.exports = {
   async index(req, res) {
      const dev = await Dev.find();
      return res.json(dev);
   },
   
   async store(req, res) {    
      const { github_username, techs, longitude, latitude } = req.body;
      
      let dev = await Dev.findOne({github_username});

      if (!dev) {
         const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);
         const { name = login, avatar_url, bio } = apiRes.data;
      
         const techsArray = parseStringAsArray(techs);
      
         const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
         }
      
         dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
         })

         const sendSocketMsgTo = findConnections({
            latitude, longitude, techsArray,
         })

         sendMessage(sendSocketMsgTo, 'new-dev', dev)
      }

      return res.json(dev);
      
   },

   async update(req, res) {      
      const { github_username, name, avatar_url, bio, techs, longitude, latitude } = req.body;

      let dev = await Dev.findOne({ github_username });

      if (dev) { 
         const editDev = {            
            name,
            avatar_url,
            bio,
            techs: parseStringAsArray(techs),
            location: {
                        type: 'Point',
                        coordinates: [longitude, latitude]               
            },
         }

         await Dev.findOneAndUpdate(editDev);
         return res.json(editDev);

      } else {
         return res.json({ message: "Dev não encontrado" });
      }
   },

   async delete(req, res) {
      const { github_username } = req.body;
      await Dev.findOneAndDelete({ github_username  });
      return res.json({ message: "Dev deletado com sucesso" });
   },
};
