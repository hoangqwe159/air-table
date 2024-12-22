import AppBar from "@/components/AppBar";
import TableNavigation from "@/components/TableNavigation";
import { Box } from "@mui/material";
import TableContainer from "@/components/TableContainer";
import { TableProvider } from "@/context/TableContext";
import TableActionMenu from "@/components/TableActionMenu";

export default function Dashboard() {
  return (
    <TableProvider>
      <Box className="min-h-screen w-full">
        <AppBar />
        <div className="flex w-full items-center justify-between gap-2 p-4">
          <TableNavigation />
          <TableActionMenu />
        </div>
        <TableContainer />
      </Box>
    </TableProvider>
  );
}
