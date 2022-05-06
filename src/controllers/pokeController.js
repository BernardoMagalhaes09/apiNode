const { response } = require('express');
const express = require('express');
const authMiddleware = require('../middleware/authenticate')

require('dotenv/config')

const Pokemon = require('../models/pokemon');

const router = express.Router();

router.use(authMiddleware)

router.get('', async (req, res) => {
  const {take, page} = req.query
  if(!page){req.query.page = 1}
  try{
    const pokemon = await Pokemon.find(req.query)
    .skip((take * page) - take)
    .limit(take)
    .exec()
    return res.status(200).json({data: pokemon, next_page: `${process.env.URL_PROD}pokemon?take=${take}&page=${parseInt(req.query.page) + 1}`})
  }catch(e){
    return res.status(400).json({error: e})
  }
})

router.post('/register', async (req, res) => {
  try{
    const pokemon = await Pokemon.create(req.body);

    return res.status(200).json(pokemon);
  }catch(e){
    return res.status(400).json({error: "Registration failed"});
  }
})

router.delete('/:id', async (req, res) => {
  try{
    const deletePokemon =  await Pokemon.deleteOne({
      _id: req.params.id
    })
    return res.status(200).json(deletePokemon)
  }catch(e){
    return res.status(400).json({error: "Failed to delete pokemon"})
  }
})

router.put('/:id', async (req, res) => {
  try{
    const editPoke = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
    return res.status(200).json(editPoke)
  }catch(e){
    return res.status(400).json()
  }
})

module.exports = app => app.use('/pokemon', router);