const ConstToJSON = $.import('xsjs.user', 'toJSON').toJSON;
const cToJSON = new ConstToJSON();
const USER_TABLE = "dev::User";

function usersUpdate(param) {
  var after = param.afterTableName;

  var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
  var oResult = pStmt.executeQuery();

  var oUserItems = cToJSON.recordSetToJSON(oResult, "items");
  var oUser = oUserItems.items[0];
  $.trace.error("Update oUser :" + JSON.stringify(oUser));

  pStmt.close();
  pStmt = param.connection.prepareStatement(`UPDATE \"${USER_TABLE}\" SET "name"='${oUser.name}' WHERE "usid"=${oUser.usid}`);
                                           
  exucuteAndClose(pStmt);
  pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"");
  exucuteAndClose(pStmt);
  pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?)");
  pStmt.setString(1, oUser.usid.toString());
  pStmt.setString(2, oUser.name.toString());
  exucuteAndClose(pStmt);
}

function exucuteAndClose(pStmt) {
  pStmt.executeUpdate();
  pStmt.close();
}
