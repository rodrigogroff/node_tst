import oracledb from "oracledb"

oracledb.initOracleClient()
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

const oracleConfig = {
  user: "SYSTEM",
  password: "gustavo@2012",
  connectionString: "localhost:1522/XE"
}

export async function getOracleConnection() {
  return await oracledb.getConnection(oracleConfig)
}
