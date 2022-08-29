function modifiedFetchURL(url, params){

  /*
  
  Description: Creates an HTTP request to endpoint using optional advanced parameters, also returns error messages.
  
  Parameters:
    * url (string): the URL to fetch.
    * params (object): the optional JavaScript object specifying advanced parameters.
  
  Source: https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetchurl,-params
  
  */
  
  var response = UrlFetchApp.fetch(url, params);
  var responseCode = response.getResponseCode().toString();
  
  if ( responseCode.match(/2.*/) ) {

    var jsonResponse = JSON.parse(response);
    
    if ( jsonResponse.message == null || jsonResponse.message == undefined ) {

      Logger.log('Response Code=' + responseCode + ', HTTP Request Success');
      
    } else {

      Logger.log('Response Code=' + responseCode + ', ' + JSON.parse(response).message);

    };

  } else {
  
    throw 'ResponseError: Response Code=' + responseCode + ', ' + response.getContentText();
  
  }; 

}
