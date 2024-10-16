import multer from "multer"
/* import path from "path" */

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "covers") // carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`) // nombrar el archivo con la fecha y el nombre original
    },
});

// Crear el middleware de Multer
const upload = multer({ storage })

export default upload
