const ConstToJSON = $.import('xsjs.coffeemachine', 'toJSON').toJSON;
const cToJSON = new ConstToJSON();
const CM_TABLE = "dev::CoffeeMachine";
const CURR_TIMESTAMP_FUN = "current_timestamp";

function cmUpdate(param) {
  var after = param.afterTableName;

  var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
  var oResult = pStmt.executeQuery();

  var oCMItems = cToJSON.recordSetToJSON(oResult, "items");
  var oCM = oCMItems.items[0];
  $.trace.error("Update oCM :" + JSON.stringify(oCM));

  pStmt.close();
  pStmt = param.connection.prepareStatement(`UPDATE "${CM_TABLE}" SET "name"='${oCM.name}', "ncups"='${oCM.ncups}', "ts_update"=${CURR_TIMESTAMP_FUN} WHERE "cmid"=${oCM.cmid}`);
  exucuteAndClose(pStmt);
}

function exucuteAndClose(pStmt) {
  pStmt.executeUpdate();
  pStmt.close();
}
