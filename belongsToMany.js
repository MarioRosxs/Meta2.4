const models = require('./models');


async function demoAsociacionMuchosAMuchos() {
    
    const personaJuan = await models.Persona.findOne({
    where: {
    nombre: 'Juan'
    }
    });

    const proyecto = await models.Proyecto.findOne({ where: { nombre: "Reciclaje de Plastico" } });

    console.log(
    "Datos de la persona: ",
    personaJuan.id,
    personaJuan.nombre,
    personaJuan.rfc);

    console.log(
      "Datos del proyecto: ",
      proyecto.idProyecto,
      proyecto.nombre,
      proyecto.descripcion);
    
    
    await personaJuan.addDonadores(proyecto, {through: { cantidadDonada: 95 }});

    const proyectosDonados = await personaJuan.getDonadores();
    console.log("Proyectos donde ha hecho donacion la persona ",personaJuan.nombre);
    proyectosDonados.forEach( proyecto => {
    console.log(proyecto.idProyecto,proyecto.nombre,proyecto.descripcion,proyecto.DonatarioId);
    });

    
    let proyectoReciclaje = await models.Proyecto.findOne({where:{nombre:"Reciclaje de Plastico"}});
    let personas = await proyectoReciclaje.getDonadores();
    console.log("Donadores del proyecto reciclaje de plastico:")
    personas.forEach( e => {console.log(e.nombre,e.rfc)})
    models.sequelize.close();
    
}

demoAsociacionMuchosAMuchos();