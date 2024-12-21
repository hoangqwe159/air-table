import AppBar from "@/components/AppBar";
import TableNavigation from "@/components/TableNavigation";
import { Box } from "@mui/material";
import TableContainer from "@/components/TableContainer";

export default function Dashboard() {
  return (
    <Box className="min-h-screen w-full">
      <AppBar />
      <TableNavigation />
      <TableContainer />
    </Box>
  );
}
