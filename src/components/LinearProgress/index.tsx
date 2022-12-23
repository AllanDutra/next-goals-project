import * as React from "react";
import MuiLinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  totalAccomplished?: number;
  totalToAccomplish: number;
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  const color = React.useMemo(
    () => (props.value === 100 ? "success" : "primary"),
    [props.value]
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: "2em" }}>
        <MuiLinearProgress
          color={color}
          variant="determinate"
          style={{
            height: ".4em",
            borderRadius: "3em",
          }}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color={color}
          style={{
            fontWeight: "600",
            fontSize: "1em",
          }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export function LinearProgress({
  totalAccomplished = 0,
  totalToAccomplish,
}: Props) {
  const progress: number = React.useMemo(
    () => (100.0 * totalAccomplished) / totalToAccomplish,
    [totalAccomplished, totalToAccomplish]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
