import { Link, Typography } from "@mui/material";

const CopyRight = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Electron Chat
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default CopyRight;
