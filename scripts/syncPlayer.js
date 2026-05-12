const { initializeApp } = require("firebase/app");

const {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBPO7plTDrg2IQ4uvYgRjrYu8elhxM_ptU",
  authDomain: "poker-league-619a0.firebaseapp.com",
  projectId: "poker-league-619a0",
  storageBucket: "poker-league-619a0.firebasestorage.app",
  messagingSenderId: "290380286362",
  appId: "1:290380286362:web:8cb0c7446e26bb7c1e5223",
  measurementId: "G-6WXQQSED05"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwv4vXDVWUlrAGRxN_v3UL0koE6OOcnaSeURbMhWlNz9T5Gim1X3ylquoMLXSQz7Tgd3Y299vsf1I2/pub?output=csv"

async function syncPlayers() {

  const response = await fetch(CSV_URL);

  const csvText = await response.text();

  const rows = csvText
    .trim()
    .split("\n")
    .map((row) =>
      row
        .replace(/\r/g, "")
        .split(",")
    );

  const headers = rows[0];

  const playerNames = headers.slice(1);

  const totals = {};
  const matches = {};
  const history = {};

  playerNames.forEach((name) => {
    totals[name] = 0;
    matches[name] = 0;
    history[name] = [];
  });

  for (let i = 1; i < rows.length; i++) {

    const row = rows[i];

    const date = row[0];

    for (let j = 1; j < headers.length; j++) {

      const player = headers[j];

      const value = row[j];

      if (
        value !== undefined &&
        value !== ""
      ) {

        const amount =
          parseFloat(value);

        totals[player] += amount;

        matches[player] += 1;

        history[player].push({
          date,
          amount,
        });
      }
    }
  }

  const existingDocs = await getDocs(
    collection(db, "Players")
  );

  const validPlayers = playerNames.map(
    (p) => p.toLowerCase().trim()
  );

  for (const docSnap of existingDocs.docs) {

    if (
      !validPlayers.includes(docSnap.id)
    ) {

      await deleteDoc(
        doc(db, "Players", docSnap.id)
      );
    }
  }

  const sortedPlayers = Object.entries(
    totals
  )
    .map(([name, winnings]) => ({
      name,
      winnings,
      matches: matches[name],
      history: history[name],
    }))
    .sort(
      (a, b) =>
        b.winnings - a.winnings
    );

  for (let i = 0; i < sortedPlayers.length; i++) {

    const player = sortedPlayers[i];

    const playerId =
      player.name.toLowerCase().trim();

    await setDoc(
      doc(db, "Players", playerId),
      {
        rank: i + 1,
        name: player.name,
        winnings: player.winnings,
        matches: player.matches,
        image: `/${playerId}.png`,
        history: player.history,
      }
    );

    console.log(
      `Updated ${player.name}`
    );
  }

  console.log("Sync complete");
}

syncPlayers();