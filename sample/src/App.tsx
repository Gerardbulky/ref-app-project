import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { analyzeText, TextAnalyze } from "./analysis";

function App() {
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [analyzeResult, setAnalyzeResult] = React.useState<
    TextAnalyze | undefined
  >(undefined);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await analyzeText(input);
      setAnalyzeResult(response);
    } catch (err) {
      //catch error here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Paper>
        <Box>
          <TextField
            id="outlined-basic"
            label="Text"
            variant="outlined"
            placeholder="Search your text here"
            multiline
            rows={4}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInput(event.target.value)
            }
            value={input}
          />
        </Box>
        <LoadingButton onClick={handleSubmit} loading={loading} variant="outlined">
          Submit
        </LoadingButton>
      </Paper>
      {!loading && analyzeResult && (
        <Paper>
          <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
            <Typography
              noWrap
            >{`Your text consists of ${analyzeResult.numWords} words(${analyzeResult.numLetters} letters)`}</Typography>
          </Box>
        </Paper>
      )}
    </div>
  );
}

export default App;
