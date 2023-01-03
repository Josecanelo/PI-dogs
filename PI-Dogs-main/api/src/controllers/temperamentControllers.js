const { default: axios } = require("axios")
const {Temperament} = require("../db")


async function getTemperaments(req,res) {
    try {
        const temperamentsApi = await axios.get("https://api.thedogapi.com/v1/breeds")
        const temperaments = temperamentsApi.data.map(e => e.temperament)
        let temps = temperaments.toString().split(",")
        temps.forEach(e => {
            if (e.length) {
                Temperament.findOrCreate({
                    where: {name: e.trim()}
                }) 
            }
        });
        const allTemperaments = await Temperament.findAll()
        res.status(200).send(allTemperaments)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}


module.exports = getTemperaments