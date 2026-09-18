import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { getTestingDate, setTestingDate } from "../utils/testingDate";

export const TestingDateControl = () => {
  const [testingDate, setTestingDateState] = useState(() => getTestingDate() ?? "");

  const updateTestingDate = (date: string) => {
    setTestingDate(date || undefined);
    setTestingDateState(date);
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mb: 1 }}>
      <Typography variant="caption" sx={{ opacity: 0.7 }}>
        Test date
      </Typography>
      <input
        aria-label="Temporary test date"
        type="date"
        value={testingDate}
        onChange={(event) => updateTestingDate(event.target.value)}
        style={{
          colorScheme: "inherit",
          border: "1px solid currentColor",
          borderRadius: 6,
          padding: "2px 6px",
          background: "transparent",
          color: "inherit",
          opacity: 0.8,
        }}
      />
      {testingDate && (
        <Button size="small" onClick={() => updateTestingDate("")}>
          Reset
        </Button>
      )}
    </Box>
  );
};
