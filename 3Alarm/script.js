// 초기 배터리 상태 및 알람 리스트
let batteryLevel = 100;
const alarms = []; // 알람 리스트를 저장하는 배열

// HTML 요소 가져오기
const currentTimeDisplay = document.getElementById("current-time");
const batteryStatus = document.getElementById("battery-status");
const alarmStatus = document.getElementById("alarm-status");

// 현재 시간을 업데이트하는 함수
function updateTime() {
  const now = new Date();
  currentTimeDisplay.textContent = now.toLocaleString(); // 시간을 깔끔한 형식으로 표시
}

// 배터리를 감소시키는 함수
function decreaseBattery() {
  if (batteryLevel > 0) {
    batteryLevel--; // 1% 감소
    batteryStatus.textContent = `배터리: ${batteryLevel}%`;
  }

  // 배터리가 0%일 때 시간 표시 숨기기
  if (batteryLevel === 0) {
    currentTimeDisplay.style.backgroundColor = "black";
    currentTimeDisplay.style.color = "black";
  }
}

// 알람 추가 함수
function addAlarm() {
  if (alarms.length >= 3) {
    alert("최대 3개의 알람만 추가할 수 있습니다.");
    return;
  }

  // 시, 분, 초 선택 값 가져오기
  const hour = document.getElementById("hour").value;
  const minute = document.getElementById("minute").value;
  const second = document.getElementById("second").value;

  // 선택되지 않은 값이 있으면 경고
  if (hour === "" || minute === "" || second === "") {
    alert("시/분/초를 모두 선택해주세요.");
    return;
  }

  // 새 알람 추가
  const newAlarm = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
  alarms.push(newAlarm);

  // 알람 상태 업데이트
  alarmStatus.textContent = alarms.join(", ") || "알람 없음";
}

// 현재 시간과 알람을 비교하여 알람이 작동하면 경고
function checkAlarms() {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  // 알람 리스트에 현재 시간이 있으면 실행
  if (alarms.includes(currentTime)) {
    alert(`알람! 현재 시각: ${currentTime}`);
    alarms.splice(alarms.indexOf(currentTime), 1); // 알람 제거
    alarmStatus.textContent = alarms.join(", ") || "알람 없음";
  }
}

// 1초마다 시간 업데이트, 배터리 감소, 알람 체크
setInterval(() => {
  updateTime();
  decreaseBattery();
  checkAlarms();
}, 1000);

// 알람 추가 버튼 이벤트 리스너
document.getElementById("add-alarm-button").addEventListener("click", addAlarm);