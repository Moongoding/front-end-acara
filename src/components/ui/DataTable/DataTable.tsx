import { LIMIT_LISTS } from "@/constants/list.constants";
import { cn } from "@/utils/cn";
import {
    Button,
    Input,
    Pagination,
    Select,
    SelectItem,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface PropTypes {
    // columns: Record<string, unknown>[];
    buttonTopContentLabel?: string;
    columns: { uid: string; name: string }[]; // 🛠️ Perjelas tipe data
    currentPage: number;
    data: Record<string, unknown>[];
    emptyContent: string;
    isLoading?: boolean;
    limit: string;
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
    onChangePage: (page: number) => void;
    onClearSearch: () => void;
    onClickButtonTopContent?: () => void;
    renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
    totalPages: number;
}

const DataTable = (props: PropTypes) => {
    const {
        buttonTopContentLabel,
        columns,
        currentPage,
        data,
        emptyContent,
        isLoading,
        limit,
        onChangeLimit,
        onChangePage,
        onChangeSearch,
        onClearSearch,
        onClickButtonTopContent,
        renderCell,
        totalPages,
    } = props;

    const TopContent = useMemo(() => {
        return (
            <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <Input isClearable
                    className="w-full sm:max-w-[24%]"
                    placeholder="Search by name"
                    startContent={<CiSearch />}
                    onClear={onClearSearch}
                    onChange={onChangeSearch}
                />

                {buttonTopContentLabel && (
                    <Button color="danger" onPress={onClickButtonTopContent}>
                        {buttonTopContentLabel}
                    </Button>
                )}
            </div>
        );
    }, [
        buttonTopContentLabel,
        onChangeSearch,
        onClearSearch,
        onClickButtonTopContent,
    ]);

    const BottomContent = useMemo(() => {
        return (
            <div className="flex items-center justify-center px-2 py-2 lg:justify-between">
                <Select
                    className="hidden max-w-36 lg:block"
                    size="md"
                    selectedKeys={[limit]}
                    selectionMode="single"
                    onChange={onChangeLimit}
                    startContent={<p className="text-small">Show:</p>}
                >
                    {LIMIT_LISTS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>

                <Pagination
                    isCompact
                    showControls
                    color="danger"
                    page={currentPage}
                    total={totalPages}
                    onChange={onChangePage}
                />
            </div>
        );
    }, [
        limit,
        currentPage,
        onChangeLimit,
        onChangePage,
        totalPages
    ]);

    return (
        <Table
            classNames={{
                base: "max-w-full",
                wrapper: cn({ "overflow-x-hidden": isLoading }),
            }}
            bottomContent={BottomContent} bottomContentPlacement="outside"
            topContent={TopContent} topContentPlacement="outside"
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid as Key}>
                        {column.name as string}
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody
                items={data}
                emptyContent={emptyContent}
                isLoading={isLoading}
                loadingContent={
                    <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
                        <Spinner color="danger" />
                    </div>
                }
            >
                {(item) => (
                    // <TableRow key={item._id as Key} >
                    /* ✅ Tambah fallback key */
                    <TableRow key={(item._id as Key) || item.id as Key} >
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
