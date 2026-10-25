const userProfile = {
  name: "Alina Ibadulla",
  birthYear: 2005,
  isDeveloper: true,
  hobbies: ["Baking", "Target Shooting", "Hiking"]
};


function logToConsole(message) {
  console.log(message);
  const consoleBox = document.getElementById("consoleLog");
  if (consoleBox) {
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement("div");
    entry.innerHTML = `<span style="color: #64748b;">[${time}]</span> ${message}`;
    consoleBox.appendChild(entry);
    consoleBox.scrollTop = consoleBox.scrollHeight;
  }
}


function updateProfileDisplay() {
  const currentYear = new Date().getFullYear();
  

  const age = currentYear - userProfile.birthYear;
  const ageInMonths = age * 12;
  const hobbiesCount = userProfile.hobbies.length;


  document.getElementById("displayName").textContent = userProfile.name;
  document.getElementById("displayBirthYear").textContent = userProfile.birthYear;
  document.getElementById("displayIsDev").textContent = userProfile.isDeveloper ? "Yes" : "No";
  document.getElementById("displayAge").textContent = age;
  document.getElementById("displayMonths").textContent = ageInMonths;
  document.getElementById("displayHobbiesCount").textContent = hobbiesCount;

  logToConsole(`Profile state updated: Name="${userProfile.name}", Age=${age}, Hobbies=${hobbiesCount}`);
}


function renderHobbiesList() {
  const listElement = document.getElementById("hobbiesList");
  listElement.innerHTML = "";

  userProfile.hobbies.forEach((hobby, index) => {
    const li = document.createElement("li");
    li.textContent = hobby;

    const delBtn = document.createElement("button");
    delBtn.className = "remove-item-btn";
    delBtn.innerHTML = "✕";
    delBtn.onclick = () => {
      userProfile.hobbies.splice(index, 1);
      renderHobbiesList();
      updateProfileDisplay();
      logToConsole(`Removed item: "${hobby}"`);
    };

    li.appendChild(delBtn);
    listElement.appendChild(li);
  });
}


document.addEventListener("DOMContentLoaded", () => {

  updateProfileDisplay();
  renderHobbiesList();


  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabPanes.forEach(pane => pane.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });


  const form = document.getElementById("profileForm");
  const usernameInput = document.getElementById("usernameInput");
  const birthYearInput = document.getElementById("birthYearInput");
  const isDevInput = document.getElementById("isDevInput");


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    userProfile.name = usernameInput.value.trim() || userProfile.name;
    userProfile.birthYear = parseInt(birthYearInput.value, 10) || userProfile.birthYear;
    userProfile.isDeveloper = isDevInput.checked;

    updateProfileDisplay();
  });

 
  const addItemBtn = document.getElementById("addItemBtn");
  const hobbyInput = document.getElementById("hobbyInput");

  addItemBtn.addEventListener("click", () => {
    const newValue = hobbyInput.value.trim();
    if (newValue !== "") {
      userProfile.hobbies.push(newValue);
      hobbyInput.value = "";
      renderHobbiesList();
      updateProfileDisplay();
      logToConsole(`Added item: "${newValue}"`);
    }
  });


  const removeItemBtn = document.getElementById("removeItemBtn");
  removeItemBtn.addEventListener("click", () => {
    if (userProfile.hobbies.length > 0) {
      const removed = userProfile.hobbies.pop();
      renderHobbiesList();
      updateProfileDisplay();
      logToConsole(`Removed last item: "${removed}"`);
    } else {
      logToConsole("The hobbies list is already empty!");
    }
  });


  document.getElementById("clearLogsBtn").addEventListener("click", () => {
    document.getElementById("consoleLog").innerHTML = "";
  });
});