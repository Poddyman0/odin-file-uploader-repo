document.addEventListener('DOMContentLoaded', function() {
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

function shareFolder () {
        document.querySelector('#submit').addEventListener('click', function(event) {
            event.preventDefault()
            const folderID = localStorage.getItem('folderID');
            const shareDuration = document.getElementById('share-duration').value
            console.log(shareDuration)
            let shareFolderBE = {
                duration: shareDuration
            }
            fetch(`http://localhost:3000/fileUploader/share/${folderID}/auth`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json", 
    
                },
                body: JSON.stringify(shareFolderBE)})
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        let shareLink = document.getElementById('share-link')
                        shareLink.innerHTML = `share link: ${response.shareLink}`
                    })
                    .catch(error => {
                        console.log('Error:', error);
                        document.getElementById("responseFeedback").textContent = `${error}`
    
                    });
        })
    
}