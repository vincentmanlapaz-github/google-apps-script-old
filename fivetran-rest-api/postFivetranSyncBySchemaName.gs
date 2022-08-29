function postFivetranSyncBySchemaName(group_id, schema_name){

  /*
  
  Description: Triggers manual sync of a Fivetran connector based on specified Fivetran group id and schema name.
  
  Parameters:
    * group_id (string): id of Fivetran group to search.
    * schema_name (string): the schema name of the Fivetran connector (e.g., schema_name.table_name).
    
  Return Type: None
  
  Source: https://fivetran.com/docs/rest-api/connectors#syncconnectordata
  
  */
  
  try {

    Logger.log('Set parameter group_id to value [%s]', group_id);
    Logger.log('Set parameter schema_name to value [%s]', schema_name);
  
  } catch(e) {
  
    throw 'Parameter "group_id" or "schema_name" is missing.'
  
  };
  
  var fivetranConnectorId = getFivetranConnectorIdBySchemaName(group_id, schema_name);
  
  var url = 'https://api.fivetran.com/v1/connectors/' + fivetranConnectorId + '/force';
  var params = {
    method: 'post',
    headers: GET_FIVETRAN_AUTH(),
    muteHttpExceptions: true
  };

  modifiedFetchURL(url, params);

}
