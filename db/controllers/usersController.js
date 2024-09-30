// Solicitud para adquirir un Prestamo de libro

export const loanBook = async (req, res, pool) => {
    const {libro_id, fecha_prestamo, fecha_devolucion} = req.body

    try{
        const stockQuery = `SELECT stock FROM LIBROS WHERE id = $1`
        const stockResult = await pool.query(stockQuery, [libro_id])

        if(!stockResult || stockResult.rows.length === 0){
            return res.status(404).json({
                status: "error",
                message: "el libro no existe"
            })
        }

        const current_stock = stockResult.rows[0].stock

        if(current_stock <= 0){
            return res.status(400).json({
                status: "error",
                message: "No hay stock de este libro para realizar un prestamo"
            })
        }

        const loanQuery = `INSERT INTO PRESTAMO(libro_id, fecha_prestamo, fecha_devolucion, estado)
                            VALUES($1, $2, $3, 'prestado') RETURNING *`


        const newLoan = await pool.query(loanQuery,[libro_id, fecha_prestamo, fecha_devolucion])

        const updateStock = `UPDATE LIBROS SET stock = stock - 1 WHERE id = $1 `

        await pool.query(updateStock, [libro_id])

        return res.status(200).json({
            status: "success",
            message: "Ha realizado un prestamo de manera exitosa ! ! !",
            prestamo: newLoan.rows[0]
        })

    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "error en el servidor",
            error: error.message
        })
    }
}