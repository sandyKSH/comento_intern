document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            return; // 입력값이 없으면 실행하지 않음
        }
        //리스트 내 변수들
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        const removeButton = document.createElement("button");
        removeButton.textContent = "X";

        // 체크박스 클릭 시 줄긋기
        checkbox.addEventListener("change", () => {
            taskSpan.style.textDecoration = checkbox.checked ? "line-through" : "none";
        });

        // 삭제 버튼 클릭 시 목록에서 제거
        removeButton.addEventListener("click", () => {
            taskList.removeChild(listItem);
        });

        // 리스트 아이템에 요소 추가
        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(removeButton);

        // 할 일 목록에 추가
        taskList.appendChild(listItem);

        // 입력창 초기화
        taskInput.value = "";
    });
});
