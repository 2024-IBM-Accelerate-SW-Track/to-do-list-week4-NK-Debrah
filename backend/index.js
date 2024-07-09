const express = require("express"),
      app = express(),
      port = process.env.PORT || 3001,  // Replace 3001 with your chosen port
      cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs").promises;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
    res.send({ message: "Connected to Backend server!" });
});

app.post("/add/item", addItem);

async function addItem(request, response) {
    try {
        // Extracting data from the request body
        const { id, task, currentDate: curDate, dueDate } = request.body.jsonObject;
        const newTask = {
            ID: id,
            Task: task,
            Current_date: curDate,
            Due_date: dueDate
        };

        // Reading the current data from the file
        const data = await fs.readFile("database.json");
        const json = JSON.parse(data);

        // Adding the new task to the data
        json.push(newTask);

        // Writing the updated data back to the file
        await fs.writeFile("database.json", JSON.stringify(json));
        console.log('Successfully wrote to file');
        response.sendStatus(200);
    } catch (err) {
        console.log("error: ", err);
        response.sendStatus(500);
    }
}
