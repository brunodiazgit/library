import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// registro
export const register = async (req, res, pool) => {
    const { nombre, correo, contraseña } = req.body

    try {
        // Verifica si ya existe un usuario con ese correo
        const query = `SELECT * FROM USUARIO WHERE correo = $1`
        const existingUser = await pool.query(query, [correo])

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                status: "error",
                message: "Este correo ya está registrado."
            })
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10)

        // Registra solo usuarios
        const insertQuery = `
            INSERT INTO USUARIO (nombre, correo, contraseña)
            VALUES($1, $2, $3)
            RETURNING *
        `
        const newUser = await pool.query(insertQuery, [nombre, correo, hashedPassword])

        return res.status(200).json({
            status: "success",
            message: "Usuario registrado exitosamente.",
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

// login
export const login = async(req, res, pool) => {
    const { correo, contraseña } = req.body

    try{
        let query = `SELECT 'empleado' AS rol, * FROM EMPLEADO WHERE correo = $1`
        let userResult = await pool.query(query, [correo])
        let rol

        // Si no se encuentra en EMPLEADO, buscar en USUARIO
        if(userResult.rows.length === 0){
            query = `SELECT 'usuario' AS rol, * FROM USUARIO WHERE correo = $1`
            userResult = await pool.query(query, [correo])
        }

        if(!userResult || !userResult.rows || userResult.rows.length === 0){
            return res.status(404).json({
                status: "error",
                message: "El usuario no está registrado."
            })
        }

        const user = userResult.rows[0]
        rol = user.rol

        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña)

        if (!isPasswordValid) {
            return res.status(400).json({
                status: "error",
                message: "Correo o contraseña incorrectos."
            })
        }

        // Genera un token JWT
        const token = jwt.sign(
            { id: user.id, correo: user.correo, rol: rol },
            'QKDSAPKGP$!6590_25137MNP',
            { expiresIn: '8h' }
        )

        return res.status(200).json({
            status: "success",
            message: "Inicio de sesión exitoso!",
            token: token,
            usuario: {
                id: user.id,
                nombre: user.nombre,
                correo: user.correo,
                rol: rol
            }
        })

    } catch(error){
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor.",
            error: error.message
        })
    }
}





