var folder = Folder.selectDialog("Select a folder with InDesign files");
if (!folder)
  exit(0);
var files = folder.getFiles("*.indd");
var numFiles = files.length;

for(i=0;i<numFiles;i++) {
  app.open(files[i]);
  
  var exportFormat = '[High Quality Print]' //The PDF export default setting you want to use
  var currDoc = app.activeDocument;  
  var exportFilePath = currDoc.filePath.absoluteURI + '/exports/';  
  var currFileName = currDoc.name.replace(/.indd/, ''); //replaces .indd with empty string
  var currConditions = currDoc.conditions; //current conditions set on document

  //set all conditions visible to false
  currConditions.everyItem().visible = false;
    
  l = currConditions.length;
  if (l > 0) {
    //cycle thru conditions  
    while(l--){
      currCondition = currConditions[l];
      
      //set actual condition visible to true  
      currCondition.visible = true;

      //set pdfName  
      var exportTo = File(exportFilePath + currFileName + '_' + currCondition.name +'.pdf');  
      
      //export PDF as background task
      currDoc.asynchronousExportFile(ExportFormat.PDF_TYPE, exportTo,false,  exportFormat);  
      
      //set actual condition visible to false  
      currCondition.visible = false;  
      }  
  } else {
    //set pdfName  
    var exportTo = File(exportFilePath + "Appointedd for " + currFileName+'.pdf');  
    
    //export PDF as background task
    currDoc.asynchronousExportFile(ExportFormat.PDF_TYPE, exportTo,false,  exportFormat);  
  }
}
 
  