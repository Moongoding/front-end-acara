import DataTable from "@/components/ui/DataTable";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.Constanst";
import { LIMIT_LISTS } from "@/constants/list.constants";



const Category = () => {
    const { push } = useRouter();
    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category];
            switch (columnKey) {
                case "icon":
                    return (<Image src={`${cellValue}`} alt="icon" width={100} height={200} />);

                case "actions":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <CiMenuKebab className="text-default-700" />
                                </Button>
                            </DropdownTrigger>

                            <DropdownMenu>
                                <DropdownItem key="detail-category-button" onPress={() => push(`/admin/category/${category._id}`)} >
                                    Detail Category
                                </DropdownItem>

                                <DropdownItem key="delete-category" className="text-danger-500">
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    );

                default:
                    return cellValue as ReactNode;
            }
        },
        [push],
    );

    return (
        <div>
            <section>
                <DataTable
                    buttonTopContentLabel="Create Category"
                    columns={COLUMN_LIST_CATEGORY}
                    currentPage={1}
                    data={[
                        {
                            _id: "123",
                            name: "Category 1",
                            description: "Description 1",
                            icon: "/images/general/logo.png",
                        },
                    ]}
                    emptyContent="Category is empty"
                    limit={LIMIT_LISTS[0].label}
                    onChangeLimit={() => { }}
                    onChangePage={() => { }}
                    onClearSearch={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                    onChangeSearch={function (e: ChangeEvent<HTMLInputElement>): void {
                        throw new Error("Function not implemented.");
                    }}
                    onClickButtonTopContent={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                    renderCell={renderCell}
                    totalPages={2}
                />
            </section>
        </div>
    );
};


export default Category;