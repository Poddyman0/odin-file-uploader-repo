document.addEventListener('DOMContentLoaded', function() {
    getFolder()
    updateFolder()
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

function getFolder () {
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
        console.log(response)
        document.getElementById('folder-name').value = response.folder.name
        
                 
    })
    .catch(error => {
        console.log('Error:', error)
        document.getElementById("responseFeedback").textContent = `${error}`

    })
}

function updateFolder () {
    //add button
    document.getElementById('submit').addEventListener('click', function(e) {
        e.preventDefault()
        const folderID = localStorage.getItem('folderID');
        const userID = localStorage.getItem('userIDSignedIn');
        const folderName = document.getElementById('folder-name')
        const updateFolderBE = {
            author: userID,
            name: folderName.value,
            files: []
        }

        fetch(`http://localhost:3000/fileUploader/folder/put/${folderID}/update`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json", 

            },
            body: JSON.stringify(updateFolderBE)})
            .then(response => response.json())
            .then(response => {
            console.log("response", response);
        })
        .catch(err => {
            console.log("error", err);
        });
    })
}