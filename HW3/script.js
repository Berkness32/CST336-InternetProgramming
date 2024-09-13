const monsterForm = document.getElementById("monsterForm");
const monsterInput = document.getElementById("monsterInput");
const monsterResult = document.getElementById("monsterResult");

// Event Listener
monsterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let monsterName = monsterInput.value.toLowerCase().trim();
  // Format the name
  if (monsterName.includes(" ")) {
    monsterName = monsterName.replace(/ /g, "-");
  }
  // Check if the name is empty
  if (monsterName) {
    searchMonster(monsterName);
  } else {
    monsterResult.textContent = "Please enter a monster name.";
  }
});

async function searchMonster(monsterName) {
  try {
    let url = `https://www.dnd5eapi.co/api/monsters/${monsterName}`;
    // Fetch call
    let response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Monster not found");
    }
    
    let monster = await response.json();
    monsterResult.innerHTML = 
      "Monster Name: " + monster.name + "<br>" +
      "Size: " + monster.size + "<br><br>" +
      "Hit Points: " + monster.hit_points + "<br>" +
      "Strength: " + monster.strength + "<br>" +
      "Dexterity: " + monster.dexterity + "<br>" +
      "Constitution: " + monster.constitution + "<br>" +
      "Intelligence: " + monster.intelligence + "<br>" +
      "Wisdom: " + monster.wisdom + "<br>" +
      "Charisma: " + monster.charisma + "<br>";
    
    //monsterResult.innerText = JSON.stringify(monster, null, 2);
    
  } catch (error) {
    monsterResult.textContent = error.message;
  }
}




