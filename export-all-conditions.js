var exportFormat = '[High Quality Print]' //The PDF export default setting you want to use
var currDoc = app.activeDocument;  
var exportFilePath = currDoc.filePath.absoluteURI + '/exports/';  
var currFileName = currDoc.name.replace(/.indd/, ''); //replaces .indd with empty string
var currConditions = currDoc.conditions; //current conditions set on document

//set all conditions visible to false
currConditions.everyItem().visible = false;
  
l = currConditions.length;
//cycle thru conditions  
while(l--){
  currCondition = currConditions[l];
  
  //set actual condition visible to true  
  currCondition.visible = true;
  
  //set name + path of exported file
  var exportTo = File(exportFilePath + currFileName + '_' + currCondition.name +'.pdf');  
  
  currDoc.asynchronousExportFile(ExportFormat.PDF_TYPE, exportTo,false,  exportFormat);  
  
  //set actual condition visible to false  
  currCondition.visible = false;  
  }  

currConditions.everyItem().visible = false;
  