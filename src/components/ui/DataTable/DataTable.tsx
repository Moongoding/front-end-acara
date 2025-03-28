import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import { Key, ReactNode } from "react";

interface PropTypes {
    // columns: Record<string, unknown>[];
    columns: { uid: string; name: string }[]; // 🛠️ Perjelas tipe data
    data: Record<string, unknown>[];
    renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
}

const DataTable = (props: PropTypes) => {
    const { columns, data, renderCell } = props;
    return (
        <Table>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid as Key}>
                        {column.name as string}
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody items={data}>
                {(item) => (
                    <TableRow key={item._id as Key}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default DataTable;
