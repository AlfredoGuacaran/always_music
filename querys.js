import pg from 'pg';
const { Client } = pg;

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'escuela',
  password: '1234',
  port: 5432,
};

const client = new Client(config);

// query para nueve estudiante
export async function newStudent(nombre, rut, curso, nivel) {
  client.connect();
  try {
    const res = await client.query(
      `INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}', '${nivel}') RETURNING *`
    );
    client.end();
    return `Estudiante ${nombre} agregado con éxito`;
  } catch (error) {
    client.end();
    return `Hubo un error:
      ${error.detail},
      Revise los datos ingresados`;
  }
}

// query para consultar estudiante por rut
export async function searchStudent(rut) {
  client.connect();
  try {
    const res = await client.query(
      `SELECT * FROM estudiantes WHERE rut = '${rut}'`
    );
    client.end();
    return res.rows[0] ? res.rows[0] : 'Rut no existe';
  } catch (error) {
    client.end();
    return `Hubo un error:
      ${error.message},
      Revise los datos ingresados`;
  }
}

// query para consultar estudiante por rut
export async function consulta() {
  client.connect();
  try {
    const res = await client.query(`SELECT * FROM estudiantes`);
    client.end();
    return res.rows;
  } catch (error) {
    client.end();
    return `Hubo un error:
      ${error.message},
      Revise los datos ingresados`;
  }
}

// query para editar estudiante
export async function editar(nombre, rut, curso, nivel) {
  client.connect();
  try {
    const res = await client.query(
      `UPDATE estudiantes SET nombre = '${nombre}', curso = '${curso}', nivel = '${nivel}' WHERE rut = '${rut}' RETURNING *;`
    );
    client.end();
    if (!res.rowCount)
      return `Error!!! el rut ${rut} no se encuentra registrado`;
    return `Estudiante ${nombre} editado con éxito`;
  } catch (error) {
    client.end();

    return `Hubo un error:
      ${error.message},
      Revise los datos ingresados`;
  }
}

// query para consultar estudiante por rut
export async function eliminar(rut) {
  client.connect();
  try {
    const res = await client.query(
      `DELETE FROM estudiantes WHERE rut = '${rut}'`
    );
    client.end();
    if (!res.rowCount)
      return `Error!!! el rut ${rut} no se encuentra registrado`;
    return `Estudiante con Rut: ${rut} eliminado con éxito`;
  } catch (error) {
    client.end();
    return `Hubo un error:
      ${error.message},
      Revise los datos ingresados`;
  }
}
