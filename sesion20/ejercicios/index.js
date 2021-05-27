import mongoose from 'mongoose';

const CRUD = async () => {
    try {

        const URL = 'mongodb://localhost:27017/colegio';
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        const usuarioSchema = new mongoose.Schema({
            nombre: String,
            apellido: String,
            edad: Number,
            dni: {
              type: String, unique: true
            },
            curso: String,
            nota: Number,
            ingreso: Boolean  
        });

        // console.log(rta);
        const daoUsuarios = mongoose.model('estudiantes', usuarioSchema);
        // const result = await daoUsuarios.create([
        //     { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
        //     { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '31155898', curso: '1A', nota: 8 },
        //     { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
        //     { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
        //     { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
        //     { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
        //     { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
        //     { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
        //     { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
        //     { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
        // ]);

        //const find = await daoUsuarios.find().sort({'apellido':'desc'});
        //const find = await daoUsuarios.find().sort({'edad':'asc'}).limit(1);
        // const find = await daoUsuarios.find({'curso':'2A'}).sort({'edad':'asc'}).limit(1);
        // const find = await daoUsuarios.aggregate([{$group: {_id:null, pop: {$avg:"$edad"} } }]);
        const updataFirst =  await daoUsuarios.updateMany({},{$set:{ingreso:'true'}});
        // console.log(updataFirst);
        // const cant = await daoUsuarios.count();
        // console.log(cant);

        const s = await daoUsuarios.updateOne(
            {
                nombre: 'Lucas',
                apellido: 'Blanco'
            },
            { dni: 20355875 }
        )
        console.log(updataFirst)

    } catch (e) {
        console.log(e.message);
    } finally {
        mongoose.disconnect;
    }
}

await CRUD();