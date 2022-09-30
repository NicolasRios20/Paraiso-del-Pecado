import { getConnection } from "../database/database";


const getAll = async (req, res) => {
    try {
        const connection = await getConnection();
        const data= await connection.query("SELECT email, contrasena FROM usuarios");
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const verificaruser= async (req, res) => {
    
    const {email, contrasena} = req.body;
    if (!email || !contrasena) {
        res.status(400).json({ message: "no ingreso sus datos completos" });
    }
    else{
        try {
            let dato = {email,contrasena};
            console.log(dato);
            const connection = await getConnection();
            const record = await connection.query('SELECT  nombre FROM usuarios WHERE email = ? AND contrasena = ?', [email, contrasena]);
            dato = record; 
            if(dato == ""){
                res.status(400).json({ message: "contra invalida" });
                console.log("contrasena invalida")
            }else{
                console.log(dato);
                res.json( dato );
            }
            
        } catch (error) {
            res.status(400).json({ message: "contra invalida" });
            console.log("contrasena invalida")
        }  
    }
};


const add = async (req, res) => {
    
    const { cc, nombre, email, contrasena, departamento, municipio, direccion, telefono} = req.body;
    if (!cc  || !nombre || !email || !contrasena || !departamento || !municipio || !direccion || !telefono) {
        res.status(400).json({ message: "Bad Request. Please fill all field." });
    }
    else{
        try {
            let dato = { cc, nombre, email, contrasena, departamento, municipio, direccion, telefono};
            const connection = await getConnection();
            const record = await connection.query("INSERT INTO usuarios SET  ?", dato );
            dato.id = record.insertId; 
            res.json( dato );
        } catch (error) {
            res.status(400).json({ message: "ya existe." });
            console.log("ya existe")
        }  
    }
};


export const methods = {
    getAll,
    add,
    verificaruser
};
