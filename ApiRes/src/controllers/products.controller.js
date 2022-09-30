import { getConnection } from "../database/database";

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM productos WHERE id = ?;",id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getAll = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM productos");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const add = async (req, res) => {
    try {
        const { name, image, price,description} = req.body;
        
        if (!/.*\.(jpg|png|jpeg|gif)/.test(image)) {
            res.status(400).json({ message: "Bad Request. invali image." });
        }else if (name === undefined || image === undefined || price === undefined || description === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }else{
            let dato = { name, image, price, description};
            const connection = await getConnection();
            const record = await connection.query("INSERT INTO productos SET ?", dato );
            dato.id = record.insertId; 
            res.json( dato );
        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido } = req.body;

        if (id === undefined || nombre === undefined || apellido === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const datos = { nombre, apellido };
        const connection = await getConnection();
        const result = await connection.query("UPDATE datos SET ? WHERE id = ?", [nombre, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM datos WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getById,
    getAll,
    add,
    updateById,
    deleteById
};
