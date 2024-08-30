const gridData = [
  {
    imageSrc: "./images/nuts.png",
    title: "Nuts",
    details: [
      "Published On: HackTheBox",
      "Type: DFIR",
      "OS: Windows",
      "Difficulty: Medium",
    ],
    buttonText: "Try The Lab",
    buttonLink: "https://app.hackthebox.com/sherlocks/Nuts",
    isVIP: false,
  },{
    imageSrc: "./images/SpottedInTheWild.png",
    title: "SpottedInTheWild",
    details: [
      "Published On: CyberDefenders",
      "Type: Endpoint Forensics",
      "OS: Windows",
      "Difficulty: Hard",
    ],
    buttonText: "Try The Lab",
    buttonLink: "https://cyberdefenders.org/blueteam-ctf-challenges/spottedinthewild/",
    isVIP: false,
  },{
    imageSrc: "./images/BTLO-Krank.png",
    title: "BTLO-Krank",
    details: [
      "Published On: BlueTeamLabs",
      "Type: DFIR",
      "OS: MAC",
      "Difficulty: Hard",
    ],
    buttonText: "Try The Lab",
    buttonLink: "https://blueteamlabs.online/home/investigation/krank-d14513a65f",
    isVIP: true,
  },{
    imageSrc: "./images/KikiPass.png",
    title: "KikiPass",
    details: [
      "Published On: BlueTeamLabs",
      "Type: Memory Forensics",
      "OS: Windows",
      "Difficulty: Medium",
    ],
    buttonText: "Try The Lab",
    buttonLink: "https://blueteamlabs.online/home/investigation/kikipass-7d6e11a95b",
    isVIP: true,
  },{
    imageSrc: "./images/JetBrains.png",
    title: "JetBrains",
    details: [
      "Published On: CyberDefenders",
      "Type: Network Forensics",
      "OS: Linux",
      "Difficulty: Medium",
    ],
    buttonText: "Try The Lab",
    buttonLink: "https://cyberdefenders.org/blueteam-ctf-challenges/jetbrains/",
    isVIP: true,
  },{
    imageSrc: "./images/MaliciousPyPi.png",
    title: "Malicious PyPi",
    details: [
      "Published On: CyberDefenders",
      "Type: Endpoint Forensics",
      "OS: Windows",
      "Difficulty: Medium",
    ],
    buttonText: "Try The Lab",
    buttonLink: "https://cyberdefenders.org/blueteam-ctf-challenges/malicious-pypi/",
    isVIP: true,
  },{
    imageSrc: "./images/ConfluenceRCE.png",
    title: "ConflueneceRCE",
    details: [
      "Published On: CyberDefenders",
      "Type: Endpoint Forensics",
      "OS: Linux",
      "Difficulty: Medium",
    ],
    buttonText: "Try The Lab",
    buttonLink: "https://cyberdefenders.org/blueteam-ctf-challenges/confluencerce/",
    isVIP: true,
  },

  // Add more items here if needed
];

const gridContainer = document.querySelector(".girgis-grid");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const currentPageIndicator = document.getElementById("currentPage");

let currentPage = 1;
const itemsPerPage = 6;

function renderGridItems(page) {
  gridContainer.innerHTML = ""; // Clear existing grid items

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  gridData.slice(startIndex, endIndex).forEach((item) => {
    const card = document.createElement("a");
    card.setAttribute("href", item.buttonLink);
    card.setAttribute("target", "_blank");  // Add this line
    card.classList.add("girgis-card");

    if (item.isVIP) {
      card.classList.add("vip");
    }
    const image = document.createElement("img");
    image.setAttribute("src", item.imageSrc);
    image.setAttribute("alt", "");

    const title = document.createElement("h6");
    title.textContent = item.title;

    const detailsList = document.createElement("ul");
    item.details.forEach((detail) => {
      const listItem = document.createElement("li");
      listItem.textContent = detail;
      if (detail.includes("Difficulty:")) {
        const detailParts = detail.split(":");
        const difficultyLevel = detailParts[1].trim(); // Get the difficulty level text
        listItem.innerHTML = `${detailParts[0]}: <span class="${getDifficultyClass(difficultyLevel)}">${difficultyLevel}</span>`;
      } else {
        listItem.textContent = detail;
      }
      detailsList.appendChild(listItem);
    });

    const button = document.createElement("button");
    button.textContent = item.buttonText;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(detailsList);
    card.appendChild(button);

    gridContainer.appendChild(card);
  });

  currentPageIndicator.textContent = `Page ${currentPage}`;
}

function getDifficultyClass(difficulty) {
  switch (difficulty) {
    case 'Easy':
      return 'difficulty-easy';
    case 'Medium':
      return 'difficulty-medium';
    case 'Hard':
      return 'difficulty-hard';
    case 'Beginner':
      return 'difficulty-beginner';
    default:
      return '';
  }
}
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderGridItems(currentPage);
  }
});

nextPageBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(gridData.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderGridItems(currentPage);
  }
});

renderGridItems(currentPage);
