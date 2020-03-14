const fs = require('fs');
const path = require('path');

let stateElement = document.querySelector('#state');
let state = stateElement.attributes;

$('#folder-loader').hide();

$('#folder-selection').on('change', e => {
    handleFolderSelection(e);
});

$('#run-button').on('click', e => {
    files = state.files.value.split('__');
    normaliseCSVs(files);
});

function handleFolderSelection(e){
    $('#folder-selection').hide();
    $('#folder-loader').show();

    let files = [];

    let folder = path.dirname(e.target.files[0].path);
    
    files = getAllFiles(folder, []);


    files = files.filter(a => path.extname(a) == '.csv');

    renderFiles(files);
    
    stateElement.setAttribute('files', files.join('__'));

    $('#folder-selection').show();
    $('#folder-loader').hide();
}

async function normaliseCSVs(files){
    files.forEach(file => {
        (async () => {
            let rawData = await readFile(file);
            let rows = rawData.split('\n');
            let header = rows[0].split(',');
            let headerLength = rows[0].split(',').length;

            /*
                1. Count how many items in header
                2. Go through each row and see if same amount of items as header
                3. If not delete that row
                4. After going through everything, rewrite the csv
            */

            let output = [];

            rows.forEach(row => {
                let rowLength = row.split(',').length;
                
                if(rowLength == headerLength){
                    output.push(row);
                }

            });

            output = output.join('\n\n');

            await writeToFile(file, output);

            outputFile(file);
        })();
    });
}

function outputFile(file){
    let list = document.querySelector('#file-output-list');
    
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
        
}

function writeToFile(pathval, output){
    return new Promise((resolve, reject) => {
        fs.writeFile(pathval, output, 'utf8', err => {
            if(err){
                reject(err);
            }else{
                resolve();
            }
        });
    });
}

function readFile(pathval){

    return new Promise((resolve, reject) => {
        fs.readFile(pathval, 'utf8', (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });

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