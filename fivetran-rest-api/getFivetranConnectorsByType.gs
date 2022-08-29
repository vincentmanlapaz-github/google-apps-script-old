function getFivetranConnectorsByType(group_id, connector_type){

  /*

  Description: Returns the list of Fivetran connectors based on specified group id and connector type.

  Parameters:
    * group_id (string): id of Fivetran group to search.
    * connector_type (string): name of service where Fivetran connects to (e.g., "google_sheets" for Google Sheets).
                               Should one of the following listed here: https://fivetran.com/docs/rest-api/connectors/config
    
  Return Type: object, {schema_name=connector_id}
  
  Source: https://fivetran.com/docs/rest-api/groups#listallconnectorswithinagroup

  */
  
  try {

    Logger.log('Set parameter group_id to value [%s]', group_id);
    Logger.log('Set parameter connector_type to value [%s]', connector_type);
  
  } catch(e) {
  
    throw 'Parameter "group_id" or "connector_type" is missing.'
  
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
  var pageTurns = 1;
  var fivetranConnectorIds = {};
  
  while ( cursor != null || cursor != undefined ) {
  
    var items = Object.values(jsonResponse.data.items);
    
    for ( var i = 0 ; i < items.length ; i++ ) {
    
      if ( items[i].service == connector_type ) {
      
        fivetranConnectorIds[items[i].schema] = items[i].id;
      
      };
    
    };
    
    var cursorURL = url + '?cursor=' + jsonResponse.data.next_cursor;
    response = modifiedFetchURL(cursorURL, params);
    jsonResponse = JSON.parse(response.getContentText());
    cursor = jsonResponse.data.next_cursor;
    pageTurns += 1;
  
  };
  
  var fivetranConnectorsCount = Object.keys(fivetranConnectorIds).length;
  Logger.log('%s %s connectors found.', fivetranConnectorsCount.toString(), connector_type);
  
  return fivetranConnectorIds;
  
}
