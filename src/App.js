import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// under Network tab of udemy quiz page, filter: "?version"
// this contains the questions
// can potentially make this an HTTP call. It doesn't seem to need a token
import data1 from "./secret-data/main-data-0.json";
import data2 from "./secret-data/main-data-1.json";
import data3 from "./secret-data/main-data-2.json";
import data4 from "./secret-data/main-data-3.json";
import data5 from "./secret-data/main-data-4.json";

// public - api

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
  paddingTop: "5%",
}));

const removeHtmlTags = (str) => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};

const letter = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
};

// todo randomize list
// todo randomize questions
// todo selections and score tracking
function App() {
  const [displayed, setDisplayed] = React.useState([]);
  const [totalQuestions, setTotalQuestions] = React.useState(0);
  const [focus, setFocus] = React.useState(["Development with AWS Services"]);
  const [selections, setSelections] = React.useState({});
  const [score, setScore] = React.useState(0);
  const [displayResults, setDisplayResults] = React.useState(false);

  React.useEffect(() => {
    const mergedData = [
      ...data1.results,
      ...data2.results,
      // ...data3.results,
      // ...data4.results,
      // ...data5.results,
    ];

    const filtered = mergedData.filter((result) =>
      focus.includes(result.section)
    );
    setDisplayed(filtered);
    setTotalQuestions(filtered.length);

    const metadata = {};
    filtered.forEach((item) => {
      metadata[item.id] = {
        label: "",
        answers: [],
        correct: false,
      };
    });
    setSelections(metadata);
  }, []);

  const handleSelection = (
    event,
    questionKey,
    selection,
    idx,
    correctAnswers
  ) => {
    const exists = selections[questionKey];
    const existingIndex = exists.answers.indexOf(idx);
    if (existingIndex > -1) {
      exists.answers.splice(existingIndex, 1);
    } else {
      exists.answers.push(idx);
      exists.answers.sort();
    }

    const isCorrect = exists.answers.every((c) => {
      const isCurrentCorrect = correctAnswers.includes(letter[c]);
      return isCurrentCorrect;
    });

    const temp = {
      [questionKey]: {
        ...exists,
        correct: isCorrect,
      },
    };
    setSelections({
      ...selections,
      ...temp,
    });
  };

  const handleEvaluate = () => {
    let current = 0;
    Object.keys(selections).forEach((x) => {
      console.log(selections[x]);
      if (selections[x].correct) {
        current++;
      }
    });
    setScore(current);
    setDisplayResults(true);

    // just incase this fails, print out answers in console

    const rightAnswers = displayed.map((data, idx) => {
      let formatAnswers = "";
      data.correct_response.forEach((c) => {
        formatAnswers += ` ${c} `;
      });
      return {
        correctAnswer: formatAnswers,
      };
    });
    console.table(rightAnswers);
  };

  return (
    <div style={{ background: "#e6f2ff" }}>
      <header className="App-header"></header>
      <CssBaseline />

      <main>
        <Container>
          <Root>
            <Card>
              <Box>
                <Typography
                  component="div"
                  variant="p"
                  sx={{ padding: "5px 10px", fontSize: 20 }}
                >
                  {!displayResults
                    ? `Total: ${totalQuestions}`
                    : `Score: ${score} / ${totalQuestions}`}
                </Typography>
                <Button onClick={handleEvaluate}>Evaluate</Button>
              </Box>
            </Card>
            {displayed.map((result) => {
              return (
                <>
                  <Card>
                    <Box>
                      <CardContent>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: 18,
                            padding: "8px 2.5px",
                          }}
                          component="div"
                          variant="p"
                        >
                          {removeHtmlTags(result.prompt.question)}
                        </Typography>

                        <Divider />
                        <List>
                          {result.prompt.answers.map((selection, idx) => (
                            <ListItem
                              button
                              onClick={(event) =>
                                handleSelection(
                                  event,
                                  result.id,
                                  selection,
                                  idx,
                                  result.correct_response
                                )
                              }
                            >
                              <Typography
                                sx={{
                                  borderLeft: selections[
                                    result.id
                                  ].answers.includes(idx)
                                    ? "solid 5px green"
                                    : null,
                                }}
                                component="div"
                                variant="p"
                              >
                                {`${letter[idx]}.  `}
                                {removeHtmlTags(selection)}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Box>
                  </Card>
                </>
              );
            })}
          </Root>
        </Container>
      </main>
    </div>
  );
}

export default App;
