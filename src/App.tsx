import { useState } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAsyncFn } from "react-use";
import { CopyBlock, dracula } from "react-code-blocks";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

// Then register the languages you need

const App = () => {
  const [typeInterface, setTypeInterface] = useState("");
  const [dataLength, setDataLength] = useState("5");
  const [data, setData] = useState("");
  const [fileType, setFileType] = useState("");

  const [{ loading }, getPrompt] = useAsyncFn(
    async (typeInterface: string, dataLength: string, fileType: string) => {
      const prompt = `generate a list of object in ${fileType} with dummy data as per the type interface: \n \`\`\`json ${typeInterface}  \`\`\` \n no description just the dummy data of length ${dataLength} given that it's shown as plain text strictly without triple backticks language tags as I want only the code formatted with newlines and well indented where tab is 4`;
      const result = await genAI
        .getGenerativeModel({ model: "gemini-1.5-flash" })
        .generateContent(prompt);
      const response = result.response.text().split("/n").join("");
      console.log(response, result.response.text());
      setData(response);
    },
    []
  );

  if (!import.meta.env.VITE_GOOGLE_GEMINI_API_KEY)
    throw Error("No Gemini api key found!!");

  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GOOGLE_GEMINI_API_KEY
  );

  const OBJECT_TYPES = ["CSV", "JavaScript", "JSON"];

  return (
    <>
      <header>
        <Typography variant="h4">F.AI.ker</Typography>
      </header>
      <div className="main-containter">
        <div className="data-container">
          {loading ? (
            "loading..."
          ) : (
            <CopyBlock
              text={data || "// dummy data here!! "}
              language={fileType.toLowerCase()}
              showLineNumbers
              codeBlock
              onCopy={() => alert("code copied")}
              theme={dracula}
              customStyle={{
                height: "100%",
                overflow: "auto",
                borderRadius: "8px",
              }}
            />
          )}
        </div>
        <div className="form-container">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Choose output data type
            </InputLabel>
            <Select
              fullWidth
              label="Choose output data type"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
            >
              {OBJECT_TYPES.map((obj) => (
                <MenuItem value={obj}>{obj}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="textarea"
            value={typeInterface}
            multiline
            // maxRows={4}
            rows={4}
            label="Give your type here!!"
            className="text-field"
            id="standard-multiline-static"
            onChange={(e) => setTypeInterface(e.target.value)}
            fullWidth
          />
          <TextField
            value={dataLength}
            type="number"
            onChange={(e) => setDataLength(e.target.value)}
            fullWidth
            label="Number of data objects or rows"
          />

          <Button
            onClick={() => getPrompt(typeInterface, dataLength, fileType)}
            variant="contained"
            fullWidth
            disabled={!typeInterface || loading}
          >
            {loading ? "🔃" : "Generate"}
          </Button>
          <Button
            onClick={() => {
              setData("");
              setTypeInterface("");
            }}
            variant="contained"
            fullWidth
            disabled={!data}
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
};

export default App;
