function onFormSubmit(e) {

  /*
  
  Description: Converts Google Form submits into key=value pair format for easier post-processing.
  
  */
  
  var questionResponses = {};
  var items = e.response.getItemResponses();
  for ( i in items ) {
    switch ( items[i].getItem().getType() ) {
      case 'PAGE_BREAK':
      case 'SECTION_HEADER':
        break;
      default:
        questionResponses[items[i].getItem().getTitle()] = items[i].getResponse();
        break;
    };
  };

}
