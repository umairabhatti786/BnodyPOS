import React from "react";
import { Text } from "react-native";
import SQLite from "react-native-sqlite-storage";
var db = SQLite.openDatabase(
  {
    name: "RestarurantSQLite",
    location: "default",
  },
  () => {},
  (error) => {
    console.log("ERROR: " + error);
  }
);

export const DeleteDatatbase = async () => {
  // console.log('dbdbdb', db);
  SQLite.deleteDatabase(
    {
      name: "RestarurantSQLite",
      location: "default",
    },
    (msg) => {
      // SQLite.openDatabase({name : "db_name.sqlite", createFromLocation : '~db_name.sqlite'});
      db = SQLite.openDatabase(
        {
          name: "RestarurantSQLite",
          location: "default",
        },
        () => {},
        (error) => {
          console.log("ERROR: " + error);
        }
      );
    }
  );
};
export const ExecuteQuery = (sql, params = [], TableName) =>
  new Promise((resolve, reject) => {
    // console.log('ExecuteQuery');
    db.transaction((trans) => {
      trans.executeSql(
        sql,
        params,
        (tran, results) => {
          // console.log('resolve results', trans);
          resolve(results);
        },
        (error) => {
          console.log("reject error", error, TableName);
          reject(error);
        },
        (err) => {
          console.log("ExecuteQuery", err);
        }
      );
    });
  });

export const CreateTable = async (TableName, Coulumns) => {
  let CreateTableQuery = `CREATE TABLE IF NOT EXISTS ${TableName} (${Coulumns})`;
  // console.log('CreateTableQuery', CreateTableQuery);
  let Table = await ExecuteQuery(CreateTableQuery, [], TableName);
  // console.log('CreateTable', Table);
};

export const getData = async (TableName, cb) => {
  let selectQuery = await ExecuteQuery(`SELECT * FROM ${TableName}`, []);
  var rows = selectQuery.rows;

  cb(rows.raw());
};

export const getDataById = async (TableName, CoulumnsName, Id, cb) => {
  // console.log('getData');
  // console.log(
  //   'selectQuery.....',
  //   `SELECT * FROM ${TableName}  WHERE ${CoulumnsName}= "${Id}"`,
  // );
  let selectQuery = await ExecuteQuery(
    `SELECT * FROM ${TableName}  WHERE ${CoulumnsName}= "${Id}"`,
    []
  );

  var rows = selectQuery.rows;

  cb(rows.raw());
};

export const getDataByMultipaleID = async (
  TableName,
  CoulumnsName,
  Id,
  CoulumnNames2,
  Id2,
  cb
) => {
  // console.log('getData');
  // console.log(
  //   'selectQuery.....',
  //   `SELECT * FROM ${TableName}  WHERE ${CoulumnsName}= "${Id}"`,
  // );

  let selectQuery = await ExecuteQuery(
    `SELECT * FROM ${TableName}  WHERE ${CoulumnsName}= "${Id}" AND ${CoulumnNames2}="${Id2}"`,
    []
  );

  var rows = selectQuery.rows;
  console.log("select query", selectQuery, "rows", rows);

  cb(rows.raw());
};

export const getDataJoinById = async (
  TableName1,
  TableName2,
  CoulumnsName,
  Id,
  cb
) => {
  // console.log('getData');
  // console.log(
  //   'selectQuery.....',
  //   `SELECT * FROM ${TableName}  WHERE ${CoulumnsName}= "${Id}"`,
  // );
  let selectQuery = await ExecuteQuery(
    `SELECT TN2.UOMFragment ,TN2.UOMType,TN2.ProductCategoryCode, TN1.* FROM ${TableName1} TN1
        LEFT JOIN ${TableName2} TN2 ON TN2.ProductBarCode = TN1.ProductBarCode WHERE TN1.${CoulumnsName}= "${Id}"`,
    []
  );

  var rows = selectQuery.rows;

  cb(rows.raw());
};

// export const updateTableSingleKeyValue = async (TableName, CoulumnsName) => {
//   let updateQuery = await this.ExecuteQuery(
//     'UPDATE users SET first_name = ? , last_name = ? WHERE id = ?',
//     ['Doctor', 'Strange', 3],
//   );
//   console.log(updateQuery);
// };

export const DeleteTable = async (TableName) => {
  await ExecuteQuery(`DROP TABLE IF EXISTS ${TableName} `, []);
  // console.log('DeleteTable');
};

export const DeleteColumnById = async (TableName, idName, id) => {
  await ExecuteQuery(`DELETE FROM ${TableName} WHERE ${idName} = "${id}"`);
  // console.log('DeleteTable');
};

export const updateColunm = async (
  TableName,
  CoulumnNames,
  idName,
  id,
  values
) => {
  let updateDataQuery = `UPDATE ${TableName} SET`;
  let Coulumns = "",
    col = "";
  let value = "";
  for (let i = 0; i < CoulumnNames.length; ++i) {
    if (i != CoulumnNames.length - 1) {
      col = `${CoulumnNames[i]} = "${values[i]}",`;
    } else {
      col = `${CoulumnNames[i]} = "${values[i]}"`;
    }
    Coulumns = Coulumns + col;
  }
  updateDataQuery = `UPDATE ${TableName} SET ${Coulumns} WHERE ${idName} = "${id}"`;

  // console.log('update Data Query ......', updateDataQuery);
  let updateColunm = await ExecuteQuery(updateDataQuery);
  // console.log('update Colunm...', updateColunm);
};
