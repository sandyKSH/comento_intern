document.addEventListener("DOMContentLoaded", () => {
    // HTML 요소 가져오기
    const equationDisplay = document.getElementById("equation"); // 계산식 표시 영역
    const outputDisplay = document.getElementById("output"); // 결과 표시 영역

    // 상태를 저장하는 변수들
    let currentInput = ""; // 현재 입력 값
    let equation = ""; // 전체 연산식
    let history = ""; // 최근 계산 기록 저장
    let historyVisible = false; // 히스토리 표시 상태

    // 모든 버튼 가져오기
    const buttons = document.querySelectorAll(".btn");

    // 각 버튼 클릭 이벤트 설정
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.textContent; // 버튼의 텍스트 값 가져오기

            // 숫자나 소수점 입력 처리
            if (!isNaN(value) || value === ".") {
                currentInput += value; // 입력값을 현재 값에 추가
                outputDisplay.textContent = currentInput; // 화면에 표시
                equationDisplay.textContent = equation + currentInput; // 전체 연산식에 현재 값 포함해 표시
                historyVisible = false; // 히스토리를 숨김 상태로 전환
            } else if (["➕", "➖", "✖️", "➗", "%"].includes(value)) {
                // 연산자 입력 처리
                if (currentInput !== "") {
                    if (value === "%") {
                        // 백분율 처리 (현재 입력 값을 100으로 나눔)
                        currentInput = (parseFloat(currentInput) / 100).toString();
                        outputDisplay.textContent = currentInput; // 결과 표시
                    } else {
                        // 일반 연산자 처리
                        equation += currentInput + " " + convertOperator(value) + " "; // 연산자 추가
                        currentInput = ""; // 현재 입력 값 초기화
                        equationDisplay.textContent = equation; // 연산식 표시
                        outputDisplay.textContent = "0"; // 결과 초기화
                    }
                }
            } else if (value === "=") {
                // '=' 버튼 처리 (결과 계산)
                if (currentInput !== "") { //Q. 식이 괄호로 끝났을 때 무반응인 이유가 무엇인가요?
                    equation += currentInput; // 연산식 완성
                    try {
                        // 수식을 계산
                        const evaluatedEquation = equation
                            .replace(/π/g, "3.14") // π를 3.14로 변환
                            .replace(/e/g, "2.71") // e를 2.71로 변환
                            .replace(/✖️/g, "*")
                            .replace(/➗/g, "/");
                        const result = eval(evaluatedEquation); // 수식을 계산
                        history = `${equation} = ${result}`;
                        outputDisplay.textContent = result; // 결과 표시
                        equationDisplay.textContent = equation + " ="; // 연산식 표시
                        equation = ""; // 연산식 초기화
                        currentInput = ""; // 현재 입력 초기화
                    } catch (error) {
                        // 에러 발생 시
                        outputDisplay.textContent = "Error"; // 에러 메시지 표시
                        equationDisplay.textContent = ""; // 연산식 초기화
                        currentInput = ""; // 입력 초기화
                        equation = ""; // 연산식 초기화
                    }
                }
            } else if (value === "C") {
                // 초기화 처리
                equation = ""; // 연산식 초기화
                currentInput = ""; // 입력 초기화
                outputDisplay.textContent = "0"; // 결과 초기화
                equationDisplay.textContent = ""; // 화면 초기화
                historyVisible = false; //Q. historyVisible = false; 를 굳이 이때만 조정하는 이유가 무엇인가요?
            } else if (value === "( )") {
                //Q. 괄호가 제대로 열리고 닫히며, 어떤 조건을 넣어야 하나요? 
                if (equation.endsWith(")") || currentInput === "") {
                    equation += "("; // 여는 괄호 추가
                } else {
                    equation += currentInput + "("; // 괄호 추가
                    currentInput = ""; // 현재 입력 초기화
                }
                equationDisplay.textContent = equation; // 연산식 업데이트
                outputDisplay.textContent = "0"; // 결과 초기화
            } else if (value === "+/−") {
                // 부호 변경 처리
                if (currentInput !== "") {
                    currentInput = (parseFloat(currentInput) * -1).toString(); // 부호 변경 ???왜 tostring이 붙는지.
                    outputDisplay.textContent = currentInput; // 결과 업데이트
                }
            } else if (value === "π") {
                // π 버튼 처리
                currentInput = "π"; // 입력에 π 추가
                outputDisplay.textContent = "3.14"; // π 값을 표시
                equationDisplay.textContent = equation + currentInput; // 연산식에 π 추가
            } else if (value === "e") {
                // e 버튼 처리
                currentInput = "e"; // 입력에 e 추가
                outputDisplay.textContent = "2.71"; // e 값을 표시
                equationDisplay.textContent = equation + currentInput; // 연산식에 e 추가
            } else if (value === "⌫") {
                // ⌫ 버튼 처리 (백스페이스)
                if (currentInput !== "") {
                    // 현재 입력 값이 있을 경우
                    currentInput = currentInput.slice(0, -1); // 마지막 문자 제거
                    outputDisplay.textContent = currentInput || "0"; // 빈 문자열이면 0 표시
                } else if (equation !== "") {
                    // Q. 이 파트 로직과 기능어를 이해하기 어렵습니다...
                    equation = equation.trimEnd(); // 끝의 공백 제거
                    if (equation.endsWith("+") || equation.endsWith("-") || equation.endsWith("*") || equation.endsWith("/")) {
                        equation = equation.slice(0, -2); // 연산자를 제거
                    } else {
                        equation = equation.slice(0, -1); // 마지막 문자를 제거
                    }
                    equationDisplay.textContent = equation; // 연산식 업데이트
                }
            } else if (value === "🕒") {
                // 🕒 버튼 처리 (히스토리 표시)
                if (historyVisible) {
                    // 히스토리가 이미 표시 중인 경우
                    equationDisplay.textContent = equation; // 연산식 복원
                    outputDisplay.textContent = currentInput || "0"; // 현재 입력 값 표시
                    historyVisible = false; // 히스토리 숨김 상태로 전환
                } else {
                    // 히스토리가 숨겨져 있는 경우
                    if (history) {
                        equationDisplay.textContent = "History:"; // 히스토리 제목
                        outputDisplay.textContent = history; // 히스토리 내용 표시
                    } else {
                        equationDisplay.textContent = "History:"; // 히스토리 제목
                        outputDisplay.textContent = "No history available"; // 히스토리가 없을 경우
                    }
                    historyVisible = true; // 히스토리 표시 상태로 전환
                }
            }
        });
    });

    // 연산자를 변환하는 함수 (버튼의 텍스트를 연산 기호로 변환)
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
