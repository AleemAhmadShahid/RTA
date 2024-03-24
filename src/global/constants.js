
import {
    FaPrint,
    FaFileCsv,
    FaFileExcel,
    FaFilePdf,
    FaCopy,
} from "react-icons/fa";

export const entriesOptions = [5, 10, 20, 50, 100];


export const exportOptions = [
    { label: "Print", icon: <FaPrint /> },
    { label: "CSV", icon: <FaFileCsv /> },
    { label: "Excel", icon: <FaFileExcel /> },
    { label: "PDF", icon: <FaFilePdf /> },
    { label: "Copy", icon: <FaCopy /> },
];