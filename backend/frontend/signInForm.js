document.addEventListener('DOMContentLoaded', function() {
    signInForm()
})
function signInForm() {
    document.querySelector('#submit').addEventListener('click', function(event) {
        event.preventDefault()
        const emailSignIn = document.querySelector('#email-sign-in')
        const passwordSignIn = document.querySelector('#password-sign-in')
        let signInBody = {
            email: emailSignIn.value,
            password: passwordSignIn.value
        }
        let responseProfileID = ""
        console.log("emailSignIn.value", emailSignIn.value)
        console.log("encodeURIComponent(emailSignIn.value)",  encodeURIComponent(emailSignIn.value))
        fetch(`http://localhost:3000/fileUploader/user/get/auserEmail/${encodeURIComponent(emailSignIn.value)}`, {
            method: 'GET', 
            credentials: "include",
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            console.log("1", response)
            responseProfileID = `${response.profileID}`
            localStorage.setItem('userIDSignedIn', response.profileID);

                fetch(`http://localhost:3000/fileUploader/user/put/signin/${responseProfileID}/passport`, {
                method: 'POST',
                credentials: "include",
                headers: {
                'Content-Type': 'application/json'                },
                body: JSON.stringify(signInBody)
                })
                .then(response => response.json())
                .then(response => {
                    console.log("2", response)
                    window.location.href = "getFolders.html"

                })
                .catch(error => {
                    console.log("error", error)
                })
        })
        .catch(error => {
            console.log('Error:', error)
            document.getElementById("responseFeedback").textContent = `${error}`

        })
    })
}
