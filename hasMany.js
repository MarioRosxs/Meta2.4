const models = require('./models');


//Archivo de prueba asociación hasMany (1:N); Una persona puede ser donatario de varios proyectos.
async function hasMany() {

    const personaJuan = await models.Persona.findOne({
        where: {
        nombre: 'Juan'
        }
    });

    const personaPedro = await models.Persona.findOne({
        where: {
        nombre: 'Pedro'
        }
    });

    const proyecto1 = await models.Proyecto.create({
        idProyecto: 100,
        nombre: 'Reciclaje de Plastico',
        descripcion: 'Maneras de reciclar y reutilizar el plastico.',
        donatarioId: personaPedro.id,
        createdAt: new Date(),
        updatedAt: new Date(),

    });

    const proyecto2 = await models.Proyecto.create({
        idProyecto: 101,
        nombre: 'Albergue para perros',
        descripcion: 'Refugio para perritos de la calle y buscarles un hogar.',
        donatarioId: personaJuan.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const proyecto3 = await models.Proyecto.create({
        idProyecto: 102,
        nombre: 'Centro de acopio de alimentos',
        descripcion: 'Donar comida a los que menos tienen.',
        donatarioId: personaPedro.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    
    await personaPedro.addDonatario(proyecto1);
    await personaPedro.addDonatario(proyecto3);
    await personaJuan.addDonatario(proyecto2);

    
};


async function mostrarDonatariosProyectos(){

    const personaJuan = await models.Persona.findOne({
        where: {
        nombre: 'Juan'
        }
    });

    const personaPedro = await models.Persona.findOne({
        where: {
        nombre: 'Pedro'
        }
    });

    //Informacion de personas.
    console.log(
        "Datos de la persona: ",
        personaJuan.id,
        personaJuan.nombre,
        personaJuan.rfc);

    console.log(
        "Datos de la persona: ",
        personaPedro.id,
        personaPedro.nombre,
        personaPedro.rfc);


    //Muestra los proyectos asociados a x persona (donatario).
    const proyectosJuan = await personaJuan.getDonatarios();

    console.log(`Proyectos asociados a ${personaJuan.nombre}:`);
    proyectosJuan.forEach((proyecto) => {
        console.log(`- ${proyecto.nombre}: ${proyecto.descripcion}`);
    });

    const proyectosPedro = await personaPedro.getDonatarios();

    console.log(`Proyectos asociados a ${personaPedro.nombre}:`);
    proyectosPedro.forEach((proyecto) => {
        console.log(`- ${proyecto.nombre}: ${proyecto.descripcion}`);
    });

    
   //Belongs To/ Has One. Mostrar el donatario de un proyecto asociado a x persona.
    if (proyectosJuan.length > 0) {
    const proyecto = proyectosJuan[0];
    const Donatario = await proyecto.getDonatario(); 
    console.log('Nombre del proyecto:' ,proyecto.nombre);
    console.log(`Donatario: ${Donatario.nombre}`);
    }

    console.log(`Proyectos con donatario ${personaPedro.nombre}:`); //Pedro
    for (const proyecto of proyectosPedro) {
        console.log(`- ${proyecto.nombre}: ${proyecto.descripcion}`);

        const donatario = await proyecto.getDonatario(); // Obtener el donatario del proyecto
        console.log(` Donatario: ${donatario.nombre}`);
    }
    
}

//hasMany();
//mostrarDonatariosProyectos();