document.addEventListener('DOMContentLoaded', function() {
    readFolders()
    createFolder()
    signOut()
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

function readFolders() {
    const foldersDisplay = document.querySelector('#folders-display')
    const userId = localStorage.getItem('userIDSignedIn');
    fetch(`http://localhost:3000/fileUploader/folders/get/${userId}`, {
        method: 'GET',
        credentials: "include",
        headers: {
        'Content-Type': 'aapplication/json',
        },
    })
    .then(response => response.json())
    .then(response => {
        console.log("response", response)
        response.folders.forEach(folder => {
            console.log
            let folderDisplay = document.createElement('div')
            folderDisplay.style.border = "1px solid black"
            folderDisplay.innerHTML = `
            <div>${folder.name}</div>
            <button class="btn btn-primary" id="${folder._id}">Open Folder</button>
            `
            foldersDisplay.appendChild(folderDisplay)
            document.getElementById(`${folder._id}`).addEventListener("click", function(e) {
                openFolder (folder._id)
            })

        })
        
                 
    })
    .catch(error => {
        console.log('Error:', error)
        document.getElementById("responseFeedback").textContent = `${error}`

    })
}

function openFolder (folderID) {
    localStorage.setItem('folderID', folderID);
    window.location.href = "getFolder.html"
}

function createFolder () {
    document.getElementById('create-folder').addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = 'createFolder.html'
    })
}