import { useTheme } from "@/ThemeContext";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TbCancel } from "react-icons/tb";
import styled from "styled-components";

interface TableCompProps {
  columns: any[];
  data: any[];
}

const TableComp: React.FC<TableCompProps> = ({ columns, data = [] }) => {
  const { theme } = useTheme();

  const customStyles = {
    table: {
      style: {
        borderRadius: "17px",
        backgroundColor: theme === "light" ? "#FFFFFF" : "#000000CC",
      },
    },
    headCells: {
      style: {
        backgroundColor: theme === "light" ? "#FFFFFF" : "#000000CC",
        fontFamily: "Inter",
        fontWeight: 400,
        color: theme === "dark" ? "#D1D5DB" : "#000000CC",
      },
    },
    subHeader: {
      style: {
        borderTopLeftRadius: "7px",
        borderTopRightRadius: "7px",
        border: "none",
        borderBottom: "none",
        padding: "10px",
        whiteSpace: "nowrap",
      },
    },
    rows: {
      style: {
        borderRadius: "17px",
        border: "none",
        color: theme === "dark" ? "#D1D5DB" : "#000000CC",
      },
    },
    cells: {
      style: {
        marginBottom: "5px",
      },
    },
  };

  return (
    <TableCompStyled className="table-container w-full md:p-2">
      <DataTable
        columns={columns}
        data={data}
        responsive
        customStyles={customStyles}
      />
    </TableCompStyled>
  );
};

const TableCompStyled = styled.div`
  .rdt_TableHeadRow {
    margin-bottom: 10px; /* Add space between rows */
  }

  .rdt_TableRow {
    margin-bottom: 10px; /* Add space between rows */
  }
  .rdt_TableRow:nth-child(even) {
    background-color: #a6a6a626; /* Light blue for even rows */
  }
  .rdt_TableRow:nth-child(odd) {
    background-color: #a6a6a626; /* Light pink for odd rows */
  }

  .rdt_TableCell {
    background-color: transparent !important;
  }
`;

export default TableComp;
