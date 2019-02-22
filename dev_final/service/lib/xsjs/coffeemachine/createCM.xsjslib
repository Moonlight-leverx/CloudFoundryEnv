/**
 @param {connection} Connection - The SQL connection used in the OData request
 @param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
 @param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
 */

const ConstToJSON = $.import('xsjs.coffeemachine', 'toJSON').toJSON;
const cToJSON = new ConstToJSON();
const CM_TABLE = "dev::CoffeeMachines";
const SEQ = "dev::cmid";


function cmCreate(param) {
  $.trace.error(JSON.stringify(param));
  var after = param.afterTableName;

  var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
  var oResult = pStmt.executeQuery();

  var oCMItems = cToJSON.recordSetToJSON(oResult, "items");
  var oCM = oCMItems.items[0];

  $.trace.error(JSON.stringify(oCM));

  pStmt = param.connection.prepareStatement(`select \"${SEQ}\".NEXTVAL from dummy`);
  var result = pStmt.executeQuery();

  while (result.next()) {
    oCM.id = result.getString(1);
  }
  $.trace.error(JSON.stringify(oCM));
  pStmt.close()

  pStmt = param.connection.prepareStatement(`insert into \"${CM_TABLE}\" values(?,?,?,?,?)`);
  	fillAndExecute(pStmt, oCM);
  	pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
  	pStmt.executeUpdate();
  	pStmt.close();
  	pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?,?,?,?)" );
  	fillAndExecute(pStmt, oCM);
}

function fillAndExecute(pStmt, oCM) {
	pStmt.setString(1, oCM.id.toString());
	pStmt.setString(2, oCM.name.toString());
  pStmt.setString(3, oCM.ncups.toString());
  pStmt.setTimestamp(4, (new Date()).toISOString());
  pStmt.setTimestamp(5, (new Date()).toISOString());
	pStmt.executeUpdate();
	pStmt.close();
}
