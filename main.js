const fs = require('fs');
const path = require('path');

let state = document.querySelector('#state').attributes;

$('#folder-loader').hide();

$('#folder-selection').on('change', e => {
    handleFolderSelection(e);
});

function handleFolderSelection(e){
    $('#folder-selection').hide();
    $('#folder-loader').show();

    let files = [];

    let folder = path.dirname(e.target.files[0].path);
    
    files = getAllFiles(folder, []);


    files = files.filter(a => path.extname(a) == '.csv');

    renderFiles(files);

    $('#folder-selection').show();
    $('#folder-loader').hide();
}

function getAllFiles(dirPath, arrayOfFiles){
    // https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js

    files = fs.readdirSync(dirPath)
 
    arrayOfFiles = arrayOfFiles || [];
    
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));    
        }
    })
    
    return arrayOfFiles 

}

function readFolder(pathval){
    return new Promise((resolve, reject) => {
        fs.readdir(pathval, (err, files) => {
            if(err){
                reject(err);
            }else{
                resolve(files);
            }
        });
    });
}

function isFolder(pathval){
    fs.lstat(pathval, (err, stats) => {
        if(err){
            console.log(err);
        }else{
            return stats.isDirectory();
        }
    });
}

function renderFiles(files){
    let list = document.querySelector('#file-input-list');

    
    
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
    
    files.forEach(file => {
        let fileOutput = normalisePath(file);
        
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = fileOutput;
        li.addEventListener('click', e => {
            if(e.target.textContent == file){
                e.target.textContent = fileOutput;
            }else{
                e.target.textContent = file;
            }
        });
        
        list.appendChild(li);
        
    });
}

function normalisePath(pathval){
    let fileName = path.basename(pathval);
    let folderName = path.basename(path.dirname(pathval));
    let secondFolder = path.basename(path.dirname(path.dirname(pathval)));
    let thirdFolder = path.basename(path.dirname(path.dirname(path.dirname(pathval))));
    let fileOutput = path.join( path.join(thirdFolder, path.join(secondFolder, folderName)), fileName );
    return fileOutput;
}