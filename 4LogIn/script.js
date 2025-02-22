document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("signup-username");
    const passwordInput = document.getElementById("signup-password");
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");
    // 사용자 데이터를 객체 배열로 관리
    let users = [
        { username: "user1", password: "pass123" },
        { username: "test123", password: "test456" }
    ];
    // 회원가입
    signupForm.addEventListener("submit", (event) => {
        // 입력한 데이터가 사라지지 않도록 새로고침 막기
        event.preventDefault();

        const username = usernameInput.value.trim(); //띄어쓰기 없앰
        const password = passwordInput.value;

        // 오류창 초기화
        usernameError.textContent = "";
        passwordError.textContent = "";

        // 1. 아이디 중복 체크
        if (users.some(user => user.username === username)) {
            usernameError.textContent = "이미 사용중인 사용자명입니다.";
            return;
        }
        // 2. 아이디 길이 체크 (4자 이상)
        if (username.length < 4) {
            usernameError.textContent = "사용자명은 4자 이상이어야 합니다.";
            return;
        }
        // 3. 비밀번호 길이 체크 (6자 이상)
        if (password.length < 6) {
            passwordError.textContent = "비밀번호는 6자 이상이어야 합니다.";
            return;
        }
        // 4. 비밀번호 조합 체크 (영문 + 숫자)
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (hasLetter && hasNumber) {
            // 가입 완료 → 사용자 추가
            users.push({ username, password });
            alert("가입이 완료되었습니다! 이제 로그인할 수 있습니다.");
            usernameInput.value = "";
            passwordInput.value = "";
            passwordError.textContent = ""; // 오류 메시지 초기화
        }
        else{
        passwordError.textContent = "비밀번호는 영문 + 숫자여야 합니다.";
        }
    });

    // 로그인 이벤트
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value;

        // 입력한 아이디 & 비밀번호가 모두 일치하는지 확인
        const validUser = users.find(user => user.username === username && user.password === password); //여기서 user는 임시변수 이름

        if (validUser) {
            alert(`환영합니다, ${username}!`);
        } else {
            alert("아이디 또는 비밀번호가 틀렸습니다.");
        }
    });
});
