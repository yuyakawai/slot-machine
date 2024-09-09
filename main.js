const gameParameters = {
  initialCoin: 60,
};

const gameStatus = {
  currentScene: null,
  isGameStart: false,
  isGameClear: false,
  isGameOver: false,
  coin: 0,
};

const mainContainer = {
  element: null,
  width: 320,
  height: 480,
};

const screenContainer = {
  element: null,
  width: mainContainer.width - 10,
  height: mainContainer.height - 10,
};

const controllerContainer = {
  element: null,
  width: mainContainer.width,
  height: mainContainer.height * 0.2,
};

const messageWrapContainer = {
  element: null,
  width: mainContainer.width,
  height: mainContainer.height * 0.1,
};

const timeMessageContainer = {
  element: null,
  width: messageWrapContainer.width / 2,
  height: messageWrapContainer.height * 0.8,
};

const statusMessageContainer = {
  element: null,
  width: messageWrapContainer.width / 2,
  height: messageWrapContainer.height * 0.8,
};

const cellRow = 8;
const cellCol = 11;
const cellSize = screenContainer.width / cellRow;

window.onload = () => {
  init();
};

const init = () => {
  mainContainer.element = document.getElementById("main-container");
  mainContainer.element.style.position = "relative";
  mainContainer.element.style.width = mainContainer.width + "px";
  mainContainer.element.style.height = mainContainer.height + "px";
  mainContainer.element.style.margin = "5px";
  mainContainer.element.style.fontFamily =
    "'Helvetica Neue',Arial, 'Hiragino Kaku Gothic ProN','Hiragino Sans', Meiryo, sans-serif";
  mainContainer.element.style.backgroundColor = "#f5deb3";
  mainContainer.element.style.border = "2px solid #deb887";
  mainContainer.element.style.boxSizing = "border-box";
  mainContainer.element.style.borderRadius = "5px";
  mainContainer.element.style.display = "flex";
  mainContainer.element.style.alignItems = "center";
  mainContainer.element.style.justifyContent = "center";
  mainContainer.element.style.flexDirection = "column";
  mainContainer.element.style.overflow = "hidden";
  mainContainer.element.style.userSelect = "none";
  mainContainer.element.style.webkitUserSelect = "none";

  screenContainer.element = document.createElement("div");
  screenContainer.element.style.position = "relative";
  screenContainer.element.style.width = screenContainer.width + "px";
  screenContainer.element.style.height = screenContainer.height + "px";
  screenContainer.element.style.margin = "3px";
  screenContainer.element.style.display = "flex";
  screenContainer.element.style.alignItems = "center";
  screenContainer.element.style.justifyContent = "center";
  mainContainer.element.appendChild(screenContainer.element);

  messageWrapContainer.element = document.createElement("div");
  messageWrapContainer.element.style.position = "relative";
  messageWrapContainer.element.style.width = messageWrapContainer.width + "px";
  messageWrapContainer.element.style.height =
    messageWrapContainer.height + "px";
  messageWrapContainer.element.style.display = "flex";
  messageWrapContainer.element.style.alignItems = "center";
  messageWrapContainer.element.style.justifyContent = "center";
  mainContainer.element.appendChild(messageWrapContainer.element);

  timeMessageContainer.element = document.createElement("div");
  timeMessageContainer.element.style.position = "relative";
  timeMessageContainer.element.style.display = "flex";
  timeMessageContainer.element.style.alignItems = "center";
  timeMessageContainer.element.style.justifyContent = "center";
  timeMessageContainer.element.style.backgroundColor = "#deb887";
  timeMessageContainer.element.style.width = timeMessageContainer.width + "px";
  timeMessageContainer.element.style.height =
    timeMessageContainer.height + "px";
  timeMessageContainer.element.style.margin = "3px";
  timeMessageContainer.element.style.borderRadius = "50px";
  timeMessageContainer.element.style.fontSize = "20px";
  timeMessageContainer.element.textContent =
    "残り時間 " + gameParameters.initialRemainingTime.toFixed(2);
  messageWrapContainer.element.appendChild(timeMessageContainer.element);

  statusMessageContainer.element = document.createElement("div");
  statusMessageContainer.element.style.position = "relative";
  statusMessageContainer.element.style.display = "flex";
  statusMessageContainer.element.style.alignItems = "center";
  statusMessageContainer.element.style.justifyContent = "center";
  statusMessageContainer.element.style.backgroundColor = "#deb887";
  statusMessageContainer.element.style.width =
    statusMessageContainer.width + "px";
  statusMessageContainer.element.style.height =
    statusMessageContainer.height + "px";
  statusMessageContainer.element.style.margin = "3px";
  statusMessageContainer.element.style.borderRadius = "50px";
  statusMessageContainer.element.style.fontSize = "20px";
  statusMessageContainer.element.textContent =
    "問 " + gameStatus.questionNumber + "/" + gameParameters.maxQuestionNumber;
  messageWrapContainer.element.appendChild(statusMessageContainer.element);

  cells.forEach((cell) => cell.init());
  gameStatus.currentScene = scene.find((e) => e.name === "init");
  tick();
};

const tick = () => {
  gameStatus.currentScene.update();
  requestAnimationFrame(tick);
};

const controller = {
  element: null,
  width: mainContainer.width * 0.9,
  height: mainContainer.height * 0.15,
  pressedButtonNum: 0,
  buttonList: ["Stop", "▶"],
  status: {
    leftButtonPressed: false,
    rightButtonPressed: false,
  },
  changeStatus: (buttonText, isPressed) => {
    switch (buttonText) {
      case "◀":
        controllerContainer.status.leftButtonPressed = isPressed;
        break;
      case "▶":
        controllerContainer.status.rightButtonPressed = isPressed;
        break;
      default:
        // empty
        break;
    }
  },
  resetStatus: () => {
    controllerContainer.status.leftButtonPressed = false;
    controllerContainer.status.rightButtonPressed = false;
  },
};

const cells = [...Array(cellRow * cellCol)].fill().map((_, index) => ({
  element: null,
  isEmpty: false,
  x: 0,
  y: 0,
  init: () => {
    cells[index].x = index % cellRow;
    cells[index].y = Math.trunc(index / cellRow);
    cells[index].element = document.createElement("div");
    cells[index].element.style.position = "absolute";
    cells[index].element.style.width = cellSize + "px";
    cells[index].element.style.height = cellSize + "px";
    cells[index].element.style.left = cells[index].x * cellSize + "px";
    cells[index].element.style.top = cells[index].y * cellSize + "px";
    cells[index].element.style.border = "3px ridge #cb986f";
    cells[index].element.style.backgroundColor = "#ccb28e";
    cells[index].element.style.boxSizing = "border-box";
    cells[index].element.style.fontSize = cellSize * 0.6 + "px";
    cells[index].element.style.display = "flex";
    cells[index].element.style.alignItems = "center";
    cells[index].element.style.justifyContent = "center";
    cells[index].element.style.cursor = "pointer";
    cells[index].element.textContent = gameStatus.dummyCharacter;
    screenContainer.element.appendChild(cells[index].element);

    const handleCellTouchEvent = (e) => {
      e.preventDefault();
      if (
        gameStatus.isGameStart === false ||
        gameStatus.isGameOver ||
        gameStatus.isGameClear
      ) {
        return;
      }

      if (e.target.textContent === gameStatus.character) {
        initQuestion();
      }
    };

    if (window.ontouchstart === null) {
      cells[index].element.ontouchstart = handleCellTouchEvent;
    } else {
      cells[index].element.onpointerdown = handleCellTouchEvent;
    }
  },
}));

const scene = [
  {
    name: "init",
    update: () => {
      showTitleMessage();
      gameStatus.currentScene = scene.find((e) => e.name === "ready");
    },
  },
  {
    name: "ready",
    update: () => {
      if (gameStatus.isGameStart) {
        initQuestion();
        gameStatus.startTime = performance.now();
        gameStatus.currentScene = scene.find((e) => e.name === "gamePlay");
      }
    },
  },
  {
    name: "gamePlay",
    update: () => {
      if (gameStatus.isGameClear) {
        gameStatus.currentScene = scene.find((e) => e.name === "gameClear");
        return;
      }

      if (gameStatus.isGameOver) {
        gameStatus.currentScene = scene.find((e) => e.name === "gameOver");
        return;
      }

      gameStatus.remainingTime = Math.max(
        0,
        gameParameters.initialRemainingTime -
          (performance.now() - gameStatus.startTime) / 1000
      );

      timeMessageContainer.element.textContent =
        "残り時間 " + gameStatus.remainingTime.toFixed(2);

      statusMessageContainer.element.textContent =
        "問 " +
        gameStatus.questionNumber +
        "/" +
        gameParameters.maxQuestionNumber;

      if (gameStatus.remainingTime <= 0) {
        gameStatus.isGameOver = true;
      }
    },
  },
  {
    name: "gameOver",
    update: () => {
      showGameOverMessage();
      gameStatus.isGameStart = false;
      gameStatus.currentScene = scene.find((e) => e.name === "ready");
    },
  },
];

const showGameOverMessage = () => {
  let wrapElement = document.createElement("div");
  wrapElement.style.position = "relative";
  wrapElement.style.zIndex = "1";
  wrapElement.style.width = screenContainer.width + "px";
  wrapElement.style.height = screenContainer.height * 0.4 + "px";
  wrapElement.style.display = "flex";
  wrapElement.style.flexDirection = "column";
  wrapElement.style.alignItems = "center";
  wrapElement.style.justifyContent = "center";

  let messageElement = document.createElement("div");
  messageElement.style.position = "relative";
  messageElement.style.zIndex = "1";
  messageElement.style.width = screenContainer.width * 0.85 + "px";
  messageElement.style.height = screenContainer.height * 0.15 + "px";
  messageElement.style.display = "flex";
  messageElement.style.alignItems = "center";
  messageElement.style.justifyContent = "center";
  messageElement.style.backgroundColor = "#f5deb3";
  messageElement.style.borderRadius = "15px";
  messageElement.style.color = "red";
  messageElement.style.fontSize = "34px";
  messageElement.textContent = "Game Over";
  wrapElement.appendChild(messageElement);

  let retryButtonElement = document.createElement("div");
  retryButtonElement.style.position = "relative";
  retryButtonElement.style.zIndex = "1";
  retryButtonElement.style.width = screenContainer.width * 0.8 + "px";
  retryButtonElement.style.height = screenContainer.height * 0.1 + "px";
  retryButtonElement.style.marginTop = "10px";
  retryButtonElement.style.display = "flex";
  retryButtonElement.style.alignItems = "center";
  retryButtonElement.style.justifyContent = "center";
  retryButtonElement.style.backgroundColor = "#deb887";
  retryButtonElement.style.color = "black";
  retryButtonElement.style.fontSize = "28px";
  retryButtonElement.style.border = "3px solid #b99679";
  retryButtonElement.style.borderRadius = "50px";
  retryButtonElement.style.cursor = "pointer";
  retryButtonElement.textContent = "もう一度遊ぶ";
  const handleCellTouchEvent = (e) => {
    e.preventDefault();
    gameStatus.reset();
    gameStatus.isGameStart = true;
    wrapElement.remove();
  };

  if (window.ontouchstart === null) {
    retryButtonElement.ontouchstart = handleCellTouchEvent;
  } else {
    retryButtonElement.onpointerdown = handleCellTouchEvent;
  }
  wrapElement.appendChild(retryButtonElement);
  screenContainer.element.appendChild(wrapElement);
};
