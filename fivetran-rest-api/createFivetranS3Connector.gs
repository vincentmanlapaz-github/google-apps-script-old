function createFivetranS3Connector(group_id, schema_name, table_name, role_arn, bucket_name, folder_path, file_pattern, file_type, compression, on_error, append_file_option){

  /*
  
  Description: Creates a new Fivetran S3 connector within the specified group in your account.
  
  Parameters:
    * group_id (string): id of Fivetran group where to create S3 connector.
    * schema_name (string): name of target schema within the destination.
    * table_name (string): name of table to which connector will sync the data.
    * role_arn (string): the Role ARN required for authentication.
    * bucket_name (string): the S3 bucket name.
    * folder_path (string): all files and folders under this folder path will be searched for files to sync.
    * file_pattern (string): all files in your search path matching this regular expression will be synced.
    * file_type (string): should be one of the following: "infer", "csv", "json", "tsv", or "avro".
    * compression (string): should be one of the following: "infer", "uncompressed", "tar", "tar_bz2", or "tar_gz".
    * on_error (string): should be either "fail" or "skip".
    * append_file_option (string): should be either "upsert_file" or "append_file".
  
  Return Type: None
  
  Source: https://fivetran.com/docs/rest-api/connectors#createaconnector, https://fivetran.com/docs/rest-api/connectors/config#amazons3
  
  */
  
  var url = 'https://api.fivetran.com/v1/connectors';
  var payload = {
    'service': 's3',
    'group_id': group_id,
    'config': {
      'schema': schema_name,
      'table': table_name,
      'external_id': group_id,
      'role_arn': role_arn,
      'bucket': bucket_name,
      'prefix': folder_path,
      'pattern': file_pattern,
      'file_type': file_type,
      'compression': compression,
      'on_error': on_error,
      'append_file_option': append_file_option
    }
  };
  var params = {
    method: 'post',
    contentType: 'application/json',
    headers: GET_FIVETRAN_AUTH(),
    muteHttpExceptions: true,
    payload: JSON.stringify(payload)
  };
  
  modifiedFetchURL(url, params);
  
}
