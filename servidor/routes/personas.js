var express = require('express');
var router = express.Router();
var personas_controller = require('../controllers/personasController')
const {check} = require ('express-validator')

//Reglas de validación
const valid_person =[
  check ('name', 'Nombre no válido')
    .isLength({min: 3})
    .isAlpha(locale = 'es-ES', { ignore: '- /' }),
  check ('surnames', 'Apellidos no válidos')
    .isLength({min: 3})
    .isAlpha(locale = 'es-ES', { ignore: '- /' }),
  check ('age', 'Edad no válida')
    .isNumeric([{min:0},{max:125}]),
  check ('dni', 'Dni no válido')
    .isLength({ min: 9, max: 9 })
    .isAlphanumeric(),
  check ('birthday', 'Cumpleaños no válido')
    .isISO8601(),
  check ('favouriteColour', 'Color Favorito no válido')
    .isLength({min: 3})
    .isAlpha(locale = 'es-ES', { ignore: '- /' }),
  check ('sex', 'Sexo no válido')
    .isIn(['Hombre','Mujer', 'Otro', 'No especificado']),
]

// Método GET para devolver el listado de personas
router.get('/', personas_controller.personas_list);

//Método GET para devolver un único usuario por su ID
router.get('/:id', personas_controller.personas_find_one);

// Método POST para crear una nueva persona
router.post('/', valid_person, personas_controller.personas_create);

//Método PUT para actualizar una persona
router.put('/:id', valid_person, personas_controller.personas_update_one);

//Método DELETE para borrar una persona
router.delete('/:id', personas_controller.personas_delete_one);

module.exports = router;
