
// ==============================
// 사용자 데이터 가져오기
// ==============================

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}


// ==============================
// 회원가입
// ==============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const passwordCheck = document.getElementById("signupPasswordCheck").value;
    const message = document.getElementById("signupMessage");

    const users = getUsers();

    if (password.length < 4) {
      message.textContent = "비밀번호를 4자 이상 입력해주세요.";
      return;
    }

    if (password !== passwordCheck) {
      message.textContent = "비밀번호가 일치하지 않습니다.";
      return;
    }

    const alreadyJoined = users.some(function(user) {
      return user.email === email;
    });

    if (alreadyJoined) {
      message.textContent = "이미 가입된 이메일입니다.";
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("회원가입이 완료되었습니다!");

    window.location.href = "./login.html";
  });
}


// ==============================
// 테스트용 로그인
// ==============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    if (!email || !password) {
      message.textContent = "이메일과 비밀번호를 입력해주세요.";
      return;
    }

    // 입력한 이메일을 사용자 이름으로 활용
    const user = {
      id: Date.now(),
      name: email.split("@")[0],
      email: email
    };

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("로그인되었습니다!");

    window.location.href = "./sub/lists/lists.html";
  });
}




// ==============================
// 비로그인 주문 제한
// ==============================

const orderLinks = document.querySelectorAll(
  '.order-button[href="sub/lists/lists.html"], .recommend-card__link[href="sub/lists/lists.html"]'
);

orderLinks.forEach(function(link) {
  link.addEventListener("click", function(event) {
    if (!getCurrentUser()) {
      event.preventDefault();
      alert("로그인이 필요한 서비스입니다.");
      window.location.href = "./login.html";
    }
  });
});
