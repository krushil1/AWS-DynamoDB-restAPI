const express = require("express");
const {
  getCharacters,
  getCharacterById,
  addOrUpdateCharacter,
  deleteCharacter,
} = require("./dynamo");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is setup for use!");
});

app.get("/characters", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (error) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/character/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const characters = await getCharacterById(id);
    res.json(characters);
  } catch (error) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.post("/characters", async (req, res) => {
  const character = req.body;
  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(newCharacter);
  } catch (error) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.put("/characters/:id", async (req, res) => {
  const character = req.body;
  const { id } = req.params;
  character.id = id;

  try {
    const updatedCharacter = await addOrUpdateCharacter(character);
    res.json(updatedCharacter);
  } catch (error) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.delete("/characters/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await deleteCharacter(id));
  } catch (error) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
