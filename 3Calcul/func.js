// 자바스크립트 코드
document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
    let currentInput = ""; // 현재 입력 값
    let equation = ""; // 전체 계산식

    // 모든 버튼 요소 가져오기
    const buttons = document.querySelectorAll(".btn");

    // 버튼 클릭 이벤트 핸들러
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (!isNaN(value) || value === ".") {
                // 숫자 또는 소수점 처리
                currentInput += value;
                output.textContent = equation + currentInput;
            } else if (["➕", "➖", "✖️", "➗", "%"].includes(value)) {
                // 연산자 처리
                if (currentInput !== "") {
                    equation += currentInput + " " + convertOperator(value) + " ";
                    currentInput = "";
                    output.textContent = equation;
                }
            } else if (value === "=") {
                // '=' 버튼 처리 (결과 계산)
                if (currentInput !== "") {
                    equation += currentInput;
                    try {
                        const result = eval(equation.replace(/✖️/g, "*").replace(/➗/g, "/"));
                        output.textContent = result;
                        currentInput = result.toString();
                        equation = "";
                    } catch (error) {
                        output.textContent = "Error";
                        currentInput = "";
                        equation = "";
                    }
                }
            } else if (value === "C") {
                // 전체 초기화
                currentInput = "";
                equation = "";
                output.textContent = "0";
            } else if (value === "⌫") {
                // 마지막 입력 제거
                currentInput = currentInput.slice(0, -1);
                output.textContent = equation + currentInput;
            }
        });
    });

    // 연산자 변환 함수
    function convertOperator(op) {
        switch (op) {
            case "➕":
                return "+";
            case "➖":
                return "-";
            case "✖️":
                return "*";
            case "➗":
                return "/";
            default:
                return op;
        }
    }
});
