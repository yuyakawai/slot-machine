import { images } from "./images.js";

const gameParameters = {
  initialCoin: 60,
};

const gameStatus = {
  currentScene: null,
  isGameStart: false,
  isGameClear: false,
  isGameOver: false,
  coin: gameParameters.initialCoin,
};

const mainContainer = {
  element: null,
  width: 320,
  height: 480,
};

const screenContainer = {
  element: null,
  width: mainContainer.width * 0.9,
  height: mainContainer.height * 0.6,
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

const statusMessageContainer = {
  element: null,
  width: messageWrapContainer.width / 2,
  height: messageWrapContainer.height * 0.8,
};

const loaderContainer = {
  progressBarElement: null,
  messageElement: null,
};

const canvas = {
  element: null,
  context: null,
  width: screenContainer.width,
  height: screenContainer.height,
};

const reels = Array(3).fill({
  x: 0,
  y: 0,
  width: 96,
  height: 288,
  imageY: 0,
  speed: 1,
  isSpinning: false,
});

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

  messageWrapContainer.element = document.createElement("div");
  messageWrapContainer.element.style.position = "relative";
  messageWrapContainer.element.style.width = messageWrapContainer.width + "px";
  messageWrapContainer.element.style.height =
    messageWrapContainer.height + "px";
  messageWrapContainer.element.style.display = "flex";
  messageWrapContainer.element.style.alignItems = "center";
  messageWrapContainer.element.style.justifyContent = "center";
  mainContainer.element.appendChild(messageWrapContainer.element);

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
  statusMessageContainer.element.style.borderRadius = "10px";
  statusMessageContainer.element.style.fontSize = "20px";
  statusMessageContainer.element.textContent = "💰️ × " + gameStatus.coin;
  messageWrapContainer.element.appendChild(statusMessageContainer.element);

  screenContainer.element = document.createElement("div");
  screenContainer.element.style.position = "relative";
  screenContainer.element.style.backgroundColor = "red";
  screenContainer.element.style.width = screenContainer.width + "px";
  screenContainer.element.style.height = screenContainer.height + "px";
  screenContainer.element.style.margin = "3px";
  screenContainer.element.style.display = "flex";
  screenContainer.element.style.alignItems = "center";
  screenContainer.element.style.justifyContent = "center";
  mainContainer.element.appendChild(screenContainer.element);

  canvas.element = document.createElement("canvas");
  screenContainer.element.appendChild(canvas.element);

  canvas.context = canvas.element.getContext("2d");
  canvas.element.width = canvas.width;
  canvas.element.height = canvas.height;
  canvas.context.fillStyle = "lightblue";
  canvas.context.fillRect(0, 0, canvas.width, canvas.height);

  controllerContainer.element = document.createElement("div");
  controllerContainer.element.style.position = "relative";
  controllerContainer.element.style.width = controllerContainer.width + "px";
  controllerContainer.element.style.height = controllerContainer.height + "px";
  controllerContainer.element.style.margin = "0px";
  controllerContainer.element.style.fontSize = "32px";
  controllerContainer.element.style.boxSizing = "border-box";
  controllerContainer.element.style.display = "flex";
  controllerContainer.element.style.flexWrap = "wrap";
  controllerContainer.element.style.alignItems = "center";
  controllerContainer.element.style.justifyContent = "center";
  mainContainer.element.appendChild(controllerContainer.element);

  loaderContainer.progressBarElement = document.createElement("div");
  loaderContainer.progressBarElement.classList.add("progress-bar");
  loaderContainer.progressBarElement.style.position = "absolute";
  loaderContainer.messageElement = document.createElement("div");
  loaderContainer.messageElement.classList.add("message");
  loaderContainer.messageElement.textContent = "読み込み中...";
  mainContainer.element.appendChild(loaderContainer.progressBarElement);
  mainContainer.element.appendChild(loaderContainer.messageElement);

  controller.init();
  loadImages();

  gameStatus.currentScene = scene.find((e) => e.name === "initImages");
  tick();
};

const tick = () => {
  gameStatus.currentScene.update();
  requestAnimationFrame(tick);
};

const scene = [
  {
    name: "initImages",
    update: () => {
      updateImageLoading();
    },
  },
  {
    name: "ready",
    update: () => {
      ready();
    },
  },
  {
    name: "gamePlay",
    update: () => {
      // empty
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

const loadImages = () => {
  images.forEach((image) => {
    image.element = new Image();
    image.element.src = image.path;
    image.element.onload = () => {
      image.isLoaded = true;
    };
  });
};

const updateImageLoading = () => {
  if (images.some((image) => image.isLoaded === false)) {
    return;
  }
  loaderContainer.progressBarElement.style.display = "none";
  loaderContainer.messageElement.style.display = "none";
  gameStatus.currentScene = scene.find((e) => e.name === "ready");
};

const ready = () => {
  gameStatus.isGameStart = true;

  reels.forEach((reel, index) => {
    reel.x = index * 96;
    reel.y = 0;
    reel.imageY += reel.speed;
    canvas.context.drawImage(
      images.find((image) => image.name === "image_1").element,
      0,
      reel.imageY,
      96,
      288,
      reel.x,
      reel.y,
      96,
      288
    );
  });
};

const controller = {
  pressedButtonNum: 0,
  buttons: [
    { name: "left", element: null, isPressed: false },
    { name: "center", element: null, isPressed: false },
    { name: "right", element: null, isPressed: false },
    { name: "start", element: null, isPressed: false },
  ],

  init: () => {
    controller.buttons.forEach((button) => {
      let buttonElement = document.createElement("div");
      buttonElement.style.position = "relative";
      buttonElement.style.width = controllerContainer.width * 0.3 + "px";
      buttonElement.style.height = controllerContainer.height * 0.4 + "px";
      buttonElement.style.margin = "5px";
      buttonElement.style.fontSize = controllerContainer.width * 0.08 + "px";
      buttonElement.style.backgroundColor = "orange";
      buttonElement.style.borderBottom = "5px solid #b84c00";
      buttonElement.style.borderRadius = "7px";
      buttonElement.style.boxSizing = "border-box";
      buttonElement.style.cursor = "pointer";
      buttonElement.style.display = "flex";
      buttonElement.style.alignItems = "center";
      buttonElement.style.justifyContent = "center";
      buttonElement.textContent = button.name;
      button.element = buttonElement;
      controllerContainer.element.appendChild(buttonElement);

      const handleButtonDown = (e) => {
        e.preventDefault();
        controller.changeStatus(e.target.textContent, !button.isPressed);
      };

      const handleButtonUp = (e) => {
        e.preventDefault();
      };

      if (window.ontouchstart === null) {
        buttonElement.ontouchstart = handleButtonDown;
        buttonElement.ontouchend = handleButtonUp;
      } else {
        buttonElement.onpointerdown = handleButtonDown;
        buttonElement.onpointerup = handleButtonUp;
      }
    });

    controller.update();
  },

  changeStatus: (buttonText, isPressed) => {
    controller.buttons.find((e) => e.name === buttonText).isPressed = isPressed;
    controller.update();
  },

  update: () => {
    controller.buttons.forEach((button) => {
      if (button.isPressed) {
        button.element.style.borderBottom = "1px solid #b84c00";
        button.element.style.backgroundColor = "#b84c00";
      } else {
        button.element.style.borderBottom = "5px solid #b84c00";
        button.element.style.backgroundColor = "orange";
      }
    });
  },
};

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
