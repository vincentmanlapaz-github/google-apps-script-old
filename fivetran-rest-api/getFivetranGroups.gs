function getFivetranGroups(){

  /*
  
  Description: Returns a key=value pair of Fivetran groups and ids in the account.
  
  Parameters: None
  
  Return Type: object
  
  Source: https://fivetran.com/docs/rest-api/groups#listallgroups, https://fivetran.com/docs/rest-api/pagination
  
  */
  
  var url = 'https://api.fivetran.com/v1/groups';
  var params = {
    method: 'get',
    headers: GET_FIVETRAN_AUTH(),
    muteHttpExceptions: true
  };
  
  var response = modifiedFetchURL(url, params);
  
  var jsonResponse = json.parse(response.getContentText());
  var cursor = jsonResponse.data.next_cursor;
  var pageTurns = 1;
  
  var fivetranGroups = {};
  
  while ( cursor != null || cursor != undefined ) {
    
    var items = Object.values(jsonResponse.data.items);
    
    for ( var i = 0 ; i < items.length ; i++ ) {
    
      fivetranGroups[items[i].name] = items[i].id;
    
    };
    
    var cursorURL = url + '?cursor=' + jsonResponse.data.next_cursor;
    response = modifiedFetchURL(url, params);
    jsonResponse = JSON.parse(response.getContentText());
    cursor = jsonResponse.data.next_cursor;
    pageTurns += 1;
  
  };
  
  Logger.log('Number of pages read [%s]', pageTurns.toString());
  
  var fivetranGroupsCount = Object.keys(fivetranGroups).length;
  Logger.log('%s Fivetran groups found.', fivetranGroupsCount.toString());

}
