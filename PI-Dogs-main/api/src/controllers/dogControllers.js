const { default: axios } = require("axios")
const { Dog, Temperament} = require("../db")

async function allDogs() {
    let apiData = await axios.get("https://api.thedogapi.com/v1/breeds")
    const apiDogs = apiData.data.map(e => {
        let heightArray = [];
        if (e.height.metric) {
            heightArray = e.height.metric.split(" - ");
        }
    
        let weightArray = [];
        if (e.weight.metric) {
            weightArray = e.weight.metric.split(" - ");
        }
        return {
            id: e.id,
            name: e.name,
            minHeight: heightArray[0],
            maxHeight: heightArray[1],
            minWeight: weightArray[0],
            maxWeight: weightArray[1],
            lifeSpan: e.life_span,
            temperament: e.temperament || "Curious",
            image: e.image.url || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Dnot%2BFound&psig=AOvVaw2eTRaKvu_1dts6lJJzUJCm&ust=1695401833607000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCOipj5KWvIEDFQAAAAAdAAAAABAE"
        }
    })
    let dbDogs = await Dog.findAll({
        include:{
            model:Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    })
    dbDogs = dbDogs.map(e => {
        let arrTemp = e.temperaments.map(e => " " + e.name )
        return {
            id: e.id,
            name: e.name,
            minHeight: e.minHeight,
            maxHeight: e.maxHeight,
            minWeight: e.minWeight,
            maxWeight: e.maxWeight,
            lifeSpan: e.lifeSpan,
            temperament: (arrTemp.toString()).slice(1),
            createdInDb: e.createdInDb,
            image: e.image
        } 
    })
    const response = [...dbDogs, ...apiDogs]
    return response
}

async function getDogs(req,res) {
    try {
        const { name } = req.query;
        let dogs = await allDogs();
    
        if (name) {
            const queryDogs = dogs.filter((e) =>
            e.name.toLowerCase().includes(name.toLowerCase())
            );
            if (queryDogs.length) {
                res.status(200).json(queryDogs)
            } else {
                res.status(404).json("No se encontraron perros con esa raza.")
            }
        }else{
            res.status(200).json(dogs);
        }
    } catch(error) {
        res.status(404).json({error: error.message}) 
    }
}

async function getDogDetail(req,res) { 
    try {
        const { id } = req.params
        const dogs = await allDogs()
        if (id) {
            const dogDetail = dogs.find(e => e.id == id)
            if (!dogDetail) {
                res.status(404).json("Id no encontrado.")
            }
            res.status(200).json(dogDetail)
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

async function createDog(req,res) {
    try {
        const {name, maxHeight, minHeight, maxWeight, minWeight, lifeSpan, temperaments, image} = req.body
        function cap(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }
        if (name && maxHeight && minHeight && maxWeight && temperaments.length) {
            let newDog = await Dog.create(
                    {
                        name: cap(name),
                        maxHeight,
                        minHeight,
                        maxWeight,
                        minWeight,
                        lifeSpan,
                        createdInDb: true,
                        image
                    }
                )
            let temperamentDb = await Temperament.findAll({
                where: {name: temperaments}
            })
            newDog.addTemperament(temperamentDb)
            res.status(201).json("Creado con éxito")
        } else {
            res.send("Faltan campos por completar")
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = { 
    getDogs,
    getDogDetail,
    createDog
}