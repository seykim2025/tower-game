const MAX_LIFE = 5;
const STORAGE_KEY = "tower_game_life_state";

function getTodayLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function loadLifeState() {
  const defaultState = {
    lifeCount: MAX_LIFE,
    lifeLastResetDate: getTodayLocalDate()
  };
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load life state", e);
  }
  
  return defaultState;
}

function saveLifeState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateLifeUI(state); // Ensure UI stays in sync when saving
  } catch (e) {
    console.error("Failed to save life state", e);
  }
}

function resetLifeIfNeeded(state) {
  const today = getTodayLocalDate();
  if (state.lifeLastResetDate !== today) {
    state.lifeCount = MAX_LIFE;
    state.lifeLastResetDate = today;
    saveLifeState(state);
  }
  return state;
}

function canStartGame(state) {
  return state.lifeCount > 0;
}

function consumeLife(state) {
  if (state.lifeCount > 0) {
    state.lifeCount -= 1;
    saveLifeState(state);
  }
  return state;
}

function rechargeLifeFromRewardAd(state) {
  state.lifeCount = Math.min(state.lifeCount + 3, MAX_LIFE);
  saveLifeState(state);
  return state;
}

// UI Update Function
function updateLifeUI(state) {
  const container = document.getElementById("life-ui-container");
  if (!container) return;
  
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.gap = "4px";
  
  container.innerHTML = "";
  for (let i = 0; i < MAX_LIFE; i++) {
    const heart = document.createElement("span");
    heart.style.fontSize = "24px";
    heart.style.margin = "0";
    if (i < state.lifeCount) {
      heart.textContent = "❤️";
    } else {
      heart.textContent = "🤍";
    }
    container.appendChild(heart);
  }
}

// Placeholder for rewarded ad
async function showRewardAdForLifeRecharge() {
  // TODO: Replace with Toss rewarded ad SDK integration
  console.log("[Ad Placeholder] Showing rewarded ad...");
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate completed ad
      console.log("[Ad Placeholder] Ad completed.");
      resolve('completed');
    }, 1500);
  });
}
