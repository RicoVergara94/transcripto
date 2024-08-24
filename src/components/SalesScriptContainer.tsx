import React, { useEffect, useState } from "react";

import { Container, Paper, Typography } from "@mui/material";

const SalesScriptContainer = () => {
  const [script, setScript] = useState("");

  const handleScript = async () => {
    const res = await fetch("./mock-transcript.txt");
    const data = await res.json();
    setScript(data);
  };

  useEffect(() => {}, [script]);
  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5">Sales Script</Typography>
        <Typography variant="body1" id="script-container">
          {/* Rendered sales script text here */}
          {script}
        </Typography>
      </Paper>
    </Container>
  );
};

export default SalesScriptContainer;
