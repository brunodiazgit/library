// Solicitud para adquirir un Prestamo de libro

export const loanBook = async (req, res, pool) => {
    const { libro_id, fecha_prestamo, fecha_devolucion, usuario_id } = req.body

    try {

        const activeLoansQuery = `SELECT COUNT(*) FROM PRESTAMO WHERE usuario_id = $1 AND estado = 'prestado'`
        const aciteLoansResult = await pool.query(activeLoansQuery, [usuario_id])

        const activeLoansCount = parseInt(aciteLoansResult.rows[0].count)

        if (activeLoansCount >= 2) {
            return res.status(400).json({
                status: "error",
                message: "El usuario ya tiene 2 prestamos activos, no podrá realizar otro prestamo hasta que devuelva al menos 1."
            })
        }

        const stockQuery = `SELECT stock FROM LIBROS WHERE id = $1`
        const stockResult = await pool.query(stockQuery, [libro_id])

        if (!stockResult || stockResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "el libro no existe"
            })
        }

        const current_stock = stockResult.rows[0].stock

        if (current_stock <= 0) {
            return res.status(400).json({
                status: "error",
                message: "No hay stock de este libro para realizar un prestamo"
            })
        }

        const loanQuery = `INSERT INTO PRESTAMO(libro_id, fecha_prestamo, fecha_devolucion, estado, usuario_id)
                            VALUES($1, $2, $3, 'prestado', $4) RETURNING *`

        const newLoan = await pool.query(loanQuery, [libro_id, fecha_prestamo, fecha_devolucion, usuario_id])

        const updateStock = `UPDATE LIBROS SET stock = stock - 1 WHERE id = $1 `

        await pool.query(updateStock, [libro_id])

        return res.status(200).json({
            status: "success",
            message: "Ha realizado un prestamo de manera exitosa ! ! !",
            prestamo: newLoan.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "error en el servidor",
            error: error.message
        })
    }
}

export const returnBook = async (req, res, pool) => {
    const { id } = req.params

    try {
        if (!id) {
            return res.status(404).json({
                status: "error",
                message: "El id del libro es requerido"
            })
        }

        // Verificar si el libro existe
        const bookQuery = `SELECT * FROM LIBROS WHERE id = $1`
        const bookResult = await pool.query(bookQuery, [id])

        if (bookResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "El libro no se encontró o no existe"
            })
        }

        // Actualizar stock
        const updateStock = `UPDATE LIBROS SET stock = stock + 1 WHERE id = $1 RETURNING *`
        const returning = await pool.query(updateStock, [id])

        // Buscar el préstamo activo para este libro
        const activeLoanQuery = `SELECT id FROM PRESTAMO WHERE libro_id = $1 AND estado = 'prestado' LIMIT 1`
        const activeLoanResult = await pool.query(activeLoanQuery, [id])

        if (activeLoanResult.rows.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "No se encontró un préstamo activo para este libro."
            })
        }

        // Actualizar estado del préstamo
        const loanId = activeLoanResult.rows[0].id // Obtener el id del préstamo
        const updateLoanState = `UPDATE PRESTAMO SET estado = 'devuelto' WHERE id = $1 RETURNING *`
        const changeLoanState = await pool.query(updateLoanState, [loanId])

        return res.status(200).json({
            status: "success",
            message: "El libro se ha devuelto con éxito ! ! !",
            book: returning.rows[0],
            loan: changeLoanState.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error interno del servidor",
            error: error.message
        })
    }
}