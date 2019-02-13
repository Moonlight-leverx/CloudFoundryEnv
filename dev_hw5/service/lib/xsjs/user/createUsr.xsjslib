/**
 @param {connection} Connection - The SQL connection used in the OData request
 @param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
 @param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
 */

const ConstToJSON = $.import('xsjs.user', 'toJSON').toJSON;
const cToJSON = new ConstToJSON();
const USER_TABLE = "dev::User";
const SEQ = "dev::usid";


function usersCreate(param) {
  $.trace.error(JSON.stringify(param));
  var after = param.afterTableName;

  var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
  var oResult = pStmt.executeQuery();

  var oUserItems = cToJSON.recordSetToJSON(oResult, "items");
  var oUser = oUserItems.items[0];

  $.trace.error(JSON.stringify(oUser));

  pStmt = param.connection.prepareStatement(`select \"${SEQ}\".NEXTVAL from dummy`);
  var result = pStmt.executeQuery();

  while (result.next()) {
    oUser.id = result.getString(1);
  }
  $.trace.error(JSON.stringify(oUser));
  pStmt.close()

  pStmt = param.connection.prepareStatement(`insert into \"${USER_TABLE}\" values(?,?)`);
  	fillAndExecute(pStmt, oUser);
  	pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
  	pStmt.executeUpdate();
  	pStmt.close();
  	pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?)" );
  	fillAndExecute(pStmt, oUser);
}

function fillAndExecute(pStmt, oUser) {
	pStmt.setString(1, oUser.id.toString());
	pStmt.setString(2, oUser.name.toString());
	pStmt.executeUpdate();
	pStmt.close();
}
