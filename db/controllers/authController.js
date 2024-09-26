import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// registro
export const register = async (req, res, pool) => {
    const { nombre, correo, contraseña, rol } = req.body

    try {
        let query
        if (rol === "empleado") {
            query = `SELECT * FROM EMPLEADO WHERE correo = $1`
        } else if (rol === "usuario") {
            query = `SELECT * FROM USUARIO WHERE correo = $1`
        } else {
            return res.status(400).json({
                status: "error",
                message: "El tipo de usuario no es valido"
            })
        }

        const existingUser = await pool.query(query, [correo])

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                status: "error",
                message: "este correo ya esta registrado."
            })
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10)

        if (rol === "empleado") {
            query = `
                INSERT INTO EMPLEADO (nombre, correo, contraseña)
                VALUES($1, $2, $3)
                RETURNING*
            `
        } else if (rol === "usuario") {
            query = `
                INSERT INTO USUARIO (nombre, correo, contraseña)
                VALUES($1, $2, $3)
                RETURNING*
            `
        }

        const newUser = await pool.query(query, [nombre, correo, hashedPassword])

        return res.status(200).json({
            status: "success",
            message: "se ha registrado un usuario exitosamente ! ! !",
            usuario: newUser.rows[0]
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error en el servidor.",
            error: error.message
        })
    }
}






