document.addEventListener('DOMContentLoaded', function() {
    getImage ()
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
    
    function getImage ( ) {
            const form = document.getElementById("uploadForm");
          
            form.addEventListener("submit", function (e) {
              e.preventDefault(); // stops page refresh
              const userId = localStorage.getItem('userIDSignedIn');
                const fileName = document.getElementById('file-name').value
                const folderID = localStorage.getItem('folderID');

              const fileInput = document.getElementById("fileInput");
              const file = fileInput.files[0];
              const formData = new FormData();
              formData.append("image", file);
                console.log("FD", formData)
              fetch(`http://localhost:3000/fileUploader/file/create/${userId}/${fileName}/${folderID}`, {
                method: "POST",
                credentials: "include",
                headers: {
                },
                body: formData
              })
              .then(res => res.json())
              .then(data => {
                console.log("response URL", data);
              })
              .catch(err => {
                console.log("error", err);
              });
            });
          
    }