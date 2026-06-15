document.addEventListener('DOMContentLoaded', function() {
    readFile()
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

function readFile() {
    const readFile = document.querySelector('#file-display')
    const fileID = localStorage.getItem('fileID');

    fetch(`http://localhost:3000/fileUploader/file/get/${fileID}/get`, {
        method: 'GET',
        credentials: "include",

        headers: {
        'Content-Type': 'aapplication/json',
        },
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        let fileDisplay = document.createElement('div')
        fileDisplay.innerHTML = `
        <div>Name: ${response.file.name}</div>
        <div>Size: ${response.file.size}</div>
        <div>Upload time: ${response.file.uploadTime}</div>
        <a href="${response.file.fileURL}" target="_blank">
        <button class="btn btn-primary" type="button">View file</button>
        </a>  
        <button class="btn btn-primary" id="download-file">Download File</button>       `
         readFile.appendChild(fileDisplay)
        document.getElementById('download-file').addEventListener("click", function (e) {
            e.preventDefault()
            function getDownloadUrl(url) {
                return url.replace(
                  "/upload/",
                  "/upload/fl_attachment/"
                );
              }
              let downloadableURL = getDownloadUrl(response.file.fileURL)
              window.location.href = `${downloadableURL}`
        })
        
                 
    })
    .catch(error => {
        console.log('Error:', error)
        document.getElementById("responseFeedback").textContent = `${error}`

    })
}



