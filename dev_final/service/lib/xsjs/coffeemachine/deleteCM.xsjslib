 const ConstToJSON = $.import('xsjs.coffeemachine', 'toJSON').toJSON;
 const cToJSON = new ConstToJSON();
 const CM_TABLE = "dev::CoffeeMachines";

function cmDelete(param) {

  var after = param.afterTableName;

  var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
  var oResult = pStmt.executeQuery();

  var oCMItems = cToJSON.recordSetToJSON(oResult, "items");
  var oCM = oCMItems.items[0];

  var uStmt;
  uStmt = param.connection.prepareStatement(`DELETE FROM \"${CM_TABLE}\" WHERE \"usid\" = ${oCM.cmid};`);
  uStmt.executeUpdate();
  uStmt.close();
}
