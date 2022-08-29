function getFivetranConnectorIdBySchemaName(group_id, schema_name){

  /*
  
  Description: Returns the connector id based on specified Fivetran group id and schema name.
  
  Parameters:
    * group_id (string): id of Fivetran group where connector exists.
    * schema_name (string): the schema name of the Fivetran connector (e.g., schema_name.table_name).
    
  Return Type: string
  
  Source: https://fivetran.com/docs/rest-api/groups#listallconnectorswithinagroup
  
  */
  
  try {

    Logger.log('Set parameter group_id to value [%s]', group_id);
    Logger.log('Set parameter schema_name to value [%s]', schema_name);
  
  } catch(e) {
  
    throw 'Parameter "group_id" or "schema_name" is missing.'
  
  };
  
  var fivetranGroupId = group_id;
  var url = 'https://api.fivetran.com/v1/groups/' + fivetranGroupId + '/connectors';
  var params = {
    method: 'get',
    headers: GET_FIVETRAN_AUTH(),
    muteHttpExceptions: true
  };
  
  var response = modifiedFetchURL(url, params);
  
  var jsonResponse = JSON.parse(response.getContentText());
  var cursor = jsonResponse.data.next_cursor;
  
  var fivetranConnectorId;
  
  while ( cursor != null || cursor != undefined ) {
  
    var items;
    try {
      
      items = Object.values(jsonResponse.data.items);
    
    } catch(e) {
    
      items = jsonResponse.data.items;
    
    };
    
    searchFivetranConnectorId:
    for ( var i = 0 ; i < items.length ; i++ ) {
    
      if ( items[i].schema == schema_name ) {
      
        fivetranConnectorId = items[i].id;
        break searchFivetranConnectorId;
      
      };

    };
    
    var cursorURL = url + '?cursor=' + jsonResponse.data.next_cursor;
    response = modifiedFetchURL(cursorURL, params);
    jsonResponse = JSON.parse(response.getContentText());
    cursor = jsonResponse.data.next_cursor;
  
  };
  
  if ( fivetranConnectorId == null || fivetranConnectorId == undefined ) {
  
    throw 'Invalid Schema: Connector with name ' + schema_name + ' not found.';
  
  } else {
  
    Logger.log('Set return value to value [%s]', fivetranConnectorId);
    return fivetranConnectorId;
  
  };
  
}
