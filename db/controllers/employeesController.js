export const prueba = (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "prueba funcionando correctamente"
    })
}

// Solicitud GET para ver todos los Libros 

export const getBooks = async (req, res, pool) => {
    try {
        const query = `SELECT * FROM LIBROS `

        const result = await pool.query(query)

        return res.status(200).json({
            status: "success",
            books: result.rows
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Hubo un error al intentar recuperar los datos",
            error: error.message
        })
    }
}

// Solicitud GET para ver el detalle de un libro

export const detailBook = async (req, res, pool) => {
    const { id } = req.params
    try {
        const query = `SELECT * FROM LIBROS WHERE id = $1 `
        const result = await pool.query(query,[id])

        if(result.rowCount === 0){
            return res.status(404).json({
                status: "error",
                message: "libro no econtrado."
            })
        }

        return res.status(200).json({
            status: "success",
            detail: result.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error dentro del servidor",
            error: error.message
        })
    }
}


// Solicitud POST para añadir libro

export const addBook = async (req, res, pool) => {
    const { titulo, autor, descripcion, genero, stock } = req.body

    if (!titulo || !autor || !descripcion || !genero) {
        return res.status(400).json({
            status: "error",
            message: "Faltan campos obligatorios ! ! !"
        })
    }

    try {
        const query = `
        INSERT INTO LIBROS(titulo, autor, descripcion, genero, stock)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING*
        `
        const values = [titulo, autor, descripcion, genero || null, stock || 0]

        const result = await pool.query(query, values)

        return res.status(201).json({
            status: "success",
            message: "se ha añadido un nuevo libro",
            book: result.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Hubo un error al querer agregar el libro",
            error: error.message

        })
    }

}

// Solicitud PUT para editar un libro existente

export const editBook = async (req, res, pool) => {
    const { id } = req.params
    const { titulo, autor, descripcion, genero, stock } = req.body

    try {
        let query = `UPDATE LIBROS SET `
        const values = []
        const setValues = []

        if (titulo !== undefined) {
            values.push(titulo)
            setValues.push(`titulo = $${values.length}`)
        }
        if (autor !== undefined) {
            values.push(autor)
            setValues.push(`autor = $${values.length}`)
        }
        if (descripcion !== undefined) {
            values.push(descripcion)
            setValues.push(`descripcion = $${values.length}`)
        }
        if (genero !== undefined) {
            values.push(genero)
            setValues.push(`genero = $${values.length}`)
        }
        
        if (stock !== undefined) {
            values.push(stock || 0)
            setValues.push(`stock = $${values.length}`)
        }

        if (setValues.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "No se han proporcionado campos para actualizar."
            })
        }

        query += setValues.join(', ') + ` WHERE id = $${values.length + 1} RETURNING *`
        values.push(id)

        const result = await pool.query(query, values)

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                message: "Libro no encontrado"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Libro editado:",
            book: result.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error en el servidor",
            error: error.message
        })
    }
}

// Solicitud DELETE para eliminar un libro existente

export const deleteBook = async (req, res, pool) => {
    const { id } = req.params

    if (!id) {
        return res.status(404).json({
            status: "error",
            message: "No existe el libro"
        })
    }

    try {
        const query = `DELETE FROM LIBROS WHERE id = $1 RETURNING*`

        const result = await pool.query(query, [id])

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                message: "El libro no existe o ya ha sido eliminado."
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Se ha borrado el libro exitosamente ! ! !",
            book: result.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error en el servidor",
            error: error.message
        })
    }
}