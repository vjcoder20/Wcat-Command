let fs = require("fs");
let inputArr = process.argv.slice(2);

let optionArr = [];
let filesArr = [];

for(let i=0;i<inputArr.length;i++){
let firstChar = inputArr[i].charAt(0);
if(firstChar=="-"){
    optionArr.push(inputArr[i]);
}
else{
    filesArr.push(inputArr[i]);
}
}
for(let i=0;i<filesArr.length;i++){
    let ans = fs.existsSync(filesArr[i]);
    if(ans==false){
        console.log("File doesn't exist");
        return;
    }
}
    let content = "";
    for(let i=0;i<filesArr.length;i++){
        content+=fs.readFileSync(filesArr[i])+"\r\n";
    }
    
    let contentArr = content.split("\r\n");

    
    let isPresent = optionArr.includes("-s");
    if(isPresent){
        for(let i = 1;i<contentArr.length;i++){
            if(contentArr[i]=="" && contentArr[i-1]==""){
                contentArr[i]=null;
            }
            else if(contentArr[i]=="" && contentArr[i-1]==null){
                contentArr[i] = null;
            }
        }
        let tempArr = [];
        for(let i=0;i<contentArr.length;i++){
            if(contentArr[i]!=null){
                tempArr.push(contentArr[i]);
            }
        }
        contentArr = tempArr;
    }
    
    let isBothpresent = optionArr.includes("-n") && optionArr.includes("-b");
    let idxOfB, idxOfN;
if(isBothpresent){
    for(let i=0;i<optionArr.length;i++){
        if(optionArr[i]=="-n")
        idxOfN = i;
        if(optionArr[i]=="-b")
        idxOfB = i;
    }

    if(idxOfN<idxOfB){
    let optionPresent = optionArr.includes("-n");
    if(optionPresent){
        for(let i = 0;i<contentArr.length;i++){
            contentArr[i] = `${i+1} ${contentArr[i]}`;
        }
    }
}
    if(idxOfB<idxOfN){
    let bPresent = optionArr.includes("-b");
    if(bPresent){
        let j=1;
        for(let i = 0;i<contentArr.length;i++){
            if(contentArr[i]!=""){
                contentArr[i] = `${j} ${contentArr[i]}`;
                j++;
            }
            else{
                contentArr[i] = `${contentArr[i]}`;
            }
        }
    }
}
}
else{
    let optionPresent = optionArr.includes("-n");
    if(optionPresent){
        for(let i = 0;i<contentArr.length;i++){
            contentArr[i] = `${i+1} ${contentArr[i]}`;
        }
    }

    let bPresent = optionArr.includes("-b");
    if(bPresent){
        let j=1;
        for(let i = 0;i<contentArr.length;i++){
            if(contentArr[i]!=""){
                contentArr[i] = `${j} ${contentArr[i]}`;
                j++;
            }
            else{
                contentArr[i] = `${contentArr[i]}`;
            }
        }
    }

}
    console.log(contentArr.join("\n"));
