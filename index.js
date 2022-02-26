const inputs = process.argv.slice(2);
const typeRequest = inputs[0];

const { Client } = require('pg');

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'escuela',
  password: '1234',
  port: 5432,
};

const client = new Client(config);

console.log(typeRequest);

async function newStudent(nombre, rut, curso, nivel) {
  client.connect();
  try {
    const res = await client.query(
      `INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}', '${nivel}') RETURNING *`
    );
    console.log(`Estudiante ${nombre} agregado con éxito`);
  } catch (error) {
    console.error(
      'Hubo un error: ',
      error.detail,
      'Revise los datos a ingresar'
    );
  }
  client.end();
}

function inputsError(nombre, rut, curso, nivel) {
  if (!(nombre && rut && curso && nivel))
    return 'Datos incorrectos o faltantes';
  if (nombre.length > 50) return 'Nombre demasiado largo';
  if (rut.length > 12) return 'Rut no valido';
  if (curso.length > 50) return 'Curso demasiado largo';
  else return false;
}

if (typeRequest == 'nuevo') {
  const [nombre, rut, curso, nivel] = inputs.slice(1);
  console.log(inputsError(nombre, rut, curso, nivel));

  !inputsError(nombre, rut, curso, nivel)
    ? inputsError(nombre, rut, curso, nivel)
    : newStudent(nombre, rut, curso, nivel);
}
