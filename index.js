const inputs = process.argv.slice(2);
const typeRequest = inputs[0];
import {
  newStudent,
  searchStudent,
  consulta,
  editar,
  eliminar,
} from './querys.js';

console.log(typeRequest);

////// chequeo de inputs
function inputsError(
  nombre = 'nombre valido',
  rut = '00.000.000-9',
  curso = 'curso valido',
  nivel = 9999
) {
  if (!(nombre && rut && curso && nivel))
    return 'Datos incorrectos o faltantes';
  if (nombre.length > 50) return 'Nombre demasiado largo';
  if (rut.length > 12) return 'Rut no valido';
  if (curso.length > 50) return 'Curso demasiado largo';
  if (nivel < 1) return 'nivel invalido';
  else return false;
}

//ejecuciones
(async () => {
  //Nuevo estudiantes
  if (typeRequest == 'nuevo') {
    const [nombre, rut, curso, nivel] = inputs.slice(1);
    const checkInputs = inputsError(nombre, rut, curso, nivel);
    if (!checkInputs) {
      const request = await newStudent(nombre, rut, curso, nivel);
      console.log(request);
    } else console.log(checkInputs);
  }

  // consulta estudiante por rut
  if (typeRequest == 'rut') {
    const [rut] = inputs.slice(1);
    const checkInputs = inputsError('nombre', rut, 'curso', 'nivel');
    if (!checkInputs) {
      const request = await searchStudent(rut);
      console.log(request);
    } else console.log(checkInputs);
  }

  // CONSULTA todos los estudiantes
  if (typeRequest == 'consulta') {
    const request = await consulta();
    console.log('Registro actual de estudiantes', request);
  }

  // EDITAR a un estudiante
  if (typeRequest == 'editar') {
    const [nombre, rut, curso, nivel] = inputs.slice(1);
    const checkInputs = inputsError(nombre, rut, curso, nivel);
    if (!checkInputs) {
      const request = await editar(nombre, rut, curso, nivel);
      console.log(request);
    } else console.log(checkInputs);
  }

  // ELIMINAR estudiante por rut
  if (typeRequest == 'eliminar') {
    const [rut] = inputs.slice(1);
    const checkInputs = inputsError('nombre', rut, 'curso', 'nivel');
    if (!checkInputs) {
      const request = await eliminar(rut);
      console.log(request);
    } else console.log(checkInputs);
  }
})();
