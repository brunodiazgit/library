import jwt from 'jsonwebtoken'

// Middleware para verificar si el usuario ha iniciado sesión como empleado o usuario
export const verifyRole = (rolesPermitidos) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1] // Extrae el token del header Authorization
        
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Acceso denegado. No se proporcionó un token.'
            })
        }

        try {
            // Verifica el token utilizando el secreto
            const decoded = jwt.verify(token, 'QKDSAPKGP$!6590_25137MNP') 
            
            // Verifica si el rol del usuario está en la lista de roles permitidos
            if (rolesPermitidos.includes(decoded.rol)) {
                req.user = decoded // Almacena los datos del usuario en la solicitud
                next() // Continúa con la solicitud
            } else {
                return res.status(403).json({
                    status: 'error',
                    message: 'No tienes permiso para acceder a este recurso.'
                })
            }
        } catch (error) {
            return res.status(401).json({
                status: 'error',
                message: 'Token inválido o expirado.',
                error: error.message
            })
        }
    }
}
