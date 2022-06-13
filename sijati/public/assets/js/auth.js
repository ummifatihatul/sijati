// listen for auth
auth.onAuthStateChanged((user) => {
  if (user) {
    // tampilkan id
    $("#main").show();
    // baca data terbaru
    db.ref("suhu")
      .on("value", (snapshot) => {
        let suhu = snapshot.val();
        if (suhu>=25){
          $("#suhu").text("Suhu Panas");
        } else if (suhu<=18) {
          $("#suhu").text("Suhu Dingin");
        } else {
          $("#suhu").text("Suhu Normal");
        } 
        
       
       
      });

      db.ref("kelembaban")
      .on("value", (snapshot) => {
        let kelembaban = snapshot.val();
        $("#kelembaban").text(kelembaban +'%');
       
       
      });
      db.ref("ldr")
      .on("value", (snapshot) => {
        let ldr = snapshot.val();
        if (ldr>=800){
          $("#ldr").text("Lampu Terang");
        } else if (ldr<=500) {
          $("#ldr").text("Lampu Mati");
        } else {
          $("#ldr").text("Lampu Redup");
        } 
      });

         

    
  


    setupUI(user);
  } else {
    // user is not a login
    setupUI();
    $("#main").hide();
  }
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    alert("User Logout");
  });
});

// login
const loginForm = document.querySelector("#form-login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get yuser info
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    loginForm.reset();
    $("#login").modal("hide");
    alert("User Berhasil Login");
    location.reload();
  });
});
