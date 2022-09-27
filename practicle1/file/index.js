const fs= require("fs");
const cal= require("./cal")
//read file
fs.readFile("./data/input.txt","utf8",(err,data)=>{
    if(err){
        console.error(err);
    }
  
    let outputdata=readOperation(data);
    writeinfile(outputdata);
   
})

function readOperation(data){
    let fileArray= data.split("\n");
     console.log("filearray: ", fileArray);
    let resOutput=[];
    fileArray.forEach((element,i)=> {
       console.log("element: " + element);
        if(element.trim()=='ADD')
        {  
            res=cal.sum(parseInt(fileArray[i-2].trim()),parseInt(fileArray[i-1].trim()));
          
            resOutput.push(res);
        }
        if(element.trim()=='SUB')
        {
            res=cal.sub(fileArray[i-2].trim(),fileArray[i-1].trim());
            resOutput.push(res);
        }    
        if(element.trim()=='MUL')
        {
            res=cal.mul(fileArray[i-2].trim(),fileArray[i-1].trim());
            resOutput.push(res);
        }    
        if(element.trim()=='DIV')
        {
            res=cal.div(fileArray[i-2].trim(),fileArray[i-1].trim());
            resOutput.push(res);
        }    
    });
    return resOutput;
}
function writeinfile(outputdata)
{
 const file =fs.createWriteStream("./data/output.txt");
 file.on("error",(err)=>{
    console.error(err);
 });

 outputdata.forEach((element) => {
    file.write(element + "\n");
 });

 file.end();
}
