document.addEventListener('DOMContentLoaded', function() {
    readfolder()
    updateFolder()
    deleteFolder()
    uploadFile()
    signOut()
    shareFolder()
})

function signOut() {
    document.getElementById('sign-out').addEventListener('click', function (e) {
        const userId = localStorage.getItem('userIDSignedIn');

        e.preventDefault()
        fetch(`http://localhost:3000/fileUploader/user/put/signout/${userId}/passport`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json", 

            }
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    window.location.href = "signInForm.html"
                })
                .catch(error => {
                    console.log('Error:', error);
                    document.getElementById("responseFeedback").textContent = `${error}`

                });
    })
}

function readfolder() {
    const folderDisplay = document.querySelector('#folder-display')
    const userId = localStorage.getItem('userIDSignedIn');
    const folderID = localStorage.getItem('folderID');

    fetch(`http://localhost:3000/fileUploader/folder/get/${folderID}/get`, {
        method: 'GET',
        credentials: "include",
        headers: {
        'Content-Type': 'aapplication/json',
        },
    })
    .then(response => response.json())
    .then(response => {

        console.log("response", response)
        let folderIndDisplay = document.createElement('div')
        folderIndDisplay.innerHTML = `
        <div>${response.folder.name}</div>
        <div id="file-container"></div>
        `
        folderDisplay.appendChild(folderIndDisplay)
        response.folder.files.forEach(file => {
            let fileDisplay = document.createElement('div')
            fileDisplay.innerHTML = `
            <div>${file.name}</div>
            <button class="btn btn-primary" id="${file._id}">File Details</button>
            `
            let fileContainer = document.getElementById('file-container')
            fileContainer.appendChild(fileDisplay)
            document.getElementById(`${file._id}`).addEventListener('click', function(e) {
                e.preventDefault()
                console.log("click")
                viewFileDetails(file._id)
            })
        })

        
                 
    })
    .catch(error => {
        console.log('Error:', error)
        document.getElementById("responseFeedback").textContent = `${error}`

    })
}

function viewFileDetails(fileID) {
    localStorage.setItem('fileID', fileID);
    window.location.href = "readFile.html"

}

function updateFolder () {
    document.getElementById('update-folder').addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = "updateFolder.html"
    })
}

function deleteFolder () {
    document.getElementById('delete-folder').addEventListener('click', function(e) {
        e.preventDefault()
        const folderID = localStorage.getItem('folderID');
        fetch(`http://localhost:3000/fileUploader/folder/delete/${folderID}/delete`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json", 

            },
            //body: JSON.stringify(updateFolderBE)
            })
            .then(response => response.json())
            .then(response => {
            console.log("response", response);
        })
        .catch(err => {
            console.log("error", err);
        });
    })
}

function uploadFile () {
    document.getElementById('upload-file').addEventListener('click', function(e) {
        e.preventDefault()
        window.location.href = "uploadFile.html"
    })
}

function shareFolder () {
    document.getElementById('share-folder').addEventListener('click', function(e) {
        e.preventDefault()
        window.location.href = "shareFolder.html"
    })
}
