document.addEventListener('DOMContentLoaded', function() {
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


function createFolder () {
    document.querySelector('#submit').addEventListener('click', function(event) {
        event.preventDefault()
        const userId = localStorage.getItem('userIDSignedIn');

        const folderName = document.querySelector('#folder-name')
        let createFolderBE = {
            author: userId,
            name: folderName.value,
            files: []
        }
        fetch('http://localhost:3000/fileUploader/folder/post/create', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json", 

            },
            body: JSON.stringify(createFolderBE)})
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log('Error:', error);
                    document.getElementById("responseFeedback").textContent = `${error}`

                });
    })
}