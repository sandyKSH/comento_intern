document.addEventListener("DOMContentLoaded", () => {
    const equationDisplay = document.getElementById("equation");
    const outputDisplay = document.getElementById("output");

    let currentInput = ""; // 현재 입력 값
    let equation = ""; // 연산식
    let history = ""; // 최근 계산 기록
    let historyVisible = false; // History 표시 상태

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (!isNaN(value) || value === ".") {
                // 숫자 또는 소수점 입력 처리
                currentInput += value;
                outputDisplay.textContent = currentInput;
                equationDisplay.textContent = equation + currentInput;
                historyVisible = false; // History 상태 초기화
            } else if (["➕", "➖", "✖️", "➗", "%"].includes(value)) {
                // 연산자 입력 처리
                if (currentInput !== "") {
                    if (value === "%") {
                        // % 처리 (현재 숫자의 백분율)
                        currentInput = (parseFloat(currentInput) / 100).toString();
                        outputDisplay.textContent = currentInput;
                    } else {
                        // 일반 연산자 처리
                        equation += currentInput + " " + convertOperator(value) + " ";
                        currentInput = "";
                        equationDisplay.textContent = equation;
                        outputDisplay.textContent = "0";
                    }
                }
            } else if (value === "=") {
                // '=' 버튼 처리 (결과 계산)
                if (currentInput !== "") {
                    equation += currentInput;
                    try {
                        // 수식 계산
                        const evaluatedEquation = equation
                            .replace(/π/g, "3.14") // π를 3.14로 변환
                            .replace(/e/g, "2.71") // e를 2.71로 변환
                            .replace(/✖️/g, "*")
                            .replace(/➗/g, "/");
                        const result = eval(evaluatedEquation);
                        history = `${equation} = ${result}`; // 계산 기록 저장
                        outputDisplay.textContent = result;
                        equationDisplay.textContent = equation + " =";
                        equation = "";
                        currentInput = ""; // 결과 이후 새로운 입력 초기화
                    } catch (error) {
                        outputDisplay.textContent = "Error";
                        equationDisplay.textContent = "";
                        currentInput = "";
                        equation = "";
                    }
                }
            } else if (value === "C") {
                // 초기화 처리
                equation = "";
                currentInput = "";
                outputDisplay.textContent = "0";
                equationDisplay.textContent = "";
                historyVisible = false; // History 상태 초기화
            } else if (value === "( )") {
                // 괄호 처리
                if (equation.endsWith("(") || currentInput === "") {
                    equation += "(";
                } else {
                    equation += currentInput + ")";
                    currentInput = "";
                }
                equationDisplay.textContent = equation;
                outputDisplay.textContent = "0";
            } else if (value === "+/−") {
                // 부호 변경 처리
                if (currentInput !== "") {
                    currentInput = (parseFloat(currentInput) * -1).toString();
                    outputDisplay.textContent = currentInput;
                }
            } else if (value === "π") {
                // π 버튼 처리
                currentInput = "π"; // 수식에 π 추가
                outputDisplay.textContent = "3.14"; // 3.14로 디스플레이
                equationDisplay.textContent = equation + currentInput;
            } else if (value === "e") {
                // e 버튼 처리
                currentInput = "e"; // 수식에 e 추가
                outputDisplay.textContent = "2.71"; // 2.71로 디스플레이
                equationDisplay.textContent = equation + currentInput;
            } else if (value === "⌫") {
                // ⌫ 버튼 처리 (마지막 입력 삭제)
                if (currentInput !== "") {
                    currentInput = currentInput.slice(0, -1); // 마지막 문자 제거
                    outputDisplay.textContent = currentInput || "0"; // 빈 문자열이면 0 표시
                }
            } else if (value === "🕒") {
                // 🕒 버튼 처리 (최근 계산 기록 표시/숨김 토글)
                if (historyVisible) {
                    equationDisplay.textContent = equation;
                    outputDisplay.textContent = currentInput || "0";
                    historyVisible = false; // History 숨김
                } else {
                    if (history) {
                        equationDisplay.textContent = "History:";
                        outputDisplay.textContent = history;
                    } else {
                        equationDisplay.textContent = "History:";
                        outputDisplay.textContent = "No history available";
                    }
                    historyVisible = true; // History 표시
                }
            }
        });
    });

    // 연산자를 변환하는 함수
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
