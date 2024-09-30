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


// login

export const login = async(req, res, pool)=>{
    const {correo, contraseña, rol} = req.body

    try{
        let query
        if(rol === "empleado"){
            query = `SELECT * FROM EMPLEADO WHERE correo = $1`
        }else if(rol === "usuario"){
            query = `SELECT * FROM USUARIO WHERE correo = $1`
        }else{
            return res.status(400).json({
                status: "error",
                message: "el tipo de usuario es incorrecto"
            })
        }

        const userResult = await pool.query(query, [correo])

        if(!userResult || !userResult.rows || userResult.rows.length === 0){
            return res.status(404).json({
                status: "error",
                message: "el usuario no esta registrado"
            })
        }

        const user = userResult.rows[0]

        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña)

        if (!isPasswordValid) {
            return res.status(400).json({
                status: "error",
                message: "Correo o contraseña incorrectos"
            })
        }

            // Genera un token JWT

            const token =  jwt.sign(
                {id: user.id, correo: user.correo, rol: rol},
                'QKDSAPKGP$!6590_25137MNP',
                {expiresIn: '8h'}
            )

            return res.status(200).json({
                status: "success",
                message: "Inicio de sesión exitoso ! ! !",
                token: token,
                usuario: {
                    id: user.id,
                    nombre: user.nombre,
                    correo: user.correo,
                    rol: rol
                }
            })
        
    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "error en el servidor",
            error: error.message
        })
    }
    
}






