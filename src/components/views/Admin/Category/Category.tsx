import DataTable from "@/components/ui/DataTable";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.Constanst";
import { LIMIT_LISTS } from "@/constants/list.constants";
import useCategory from "./useCategory";
import InputFile from "@/components/ui/InputFile";



const Category = () => {
    const { push, isReady, query } = useRouter();

    // const { setURL } = useCategory();
    const {
        setURL,
        currentLimit,
        isRefetchingCategory,
        currentPage,
        currentSearch,
        dataCategory,
        isLoadingCategory,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
    } = useCategory();

    // console.log("INI DATA CATEGORY", dataCategory);
    // useEffect(() => {
    //     if (isReady) {
    //         setURL();
    //     }
    // }, [isReady, setURL])

    useEffect(() => {
        if (
            isReady
            &&
            currentLimit &&
            currentPage &&
            currentSearch !== undefined
        ) {
            setURL();
        }
    }, [isReady, currentLimit, currentPage, currentSearch, setURL]);

    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category];
            switch (columnKey) {
                // case "icon":
                //     return (<Image src={`${cellValue}`} alt="icon" width={100} height={200} />);

                case "actions":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light" aria-label="More options">
                                    <CiMenuKebab className="text-default-700" />
                                </Button>
                            </DropdownTrigger>

                            <DropdownMenu aria-label="Category actions">
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
                {Object.keys(query).length > 0 && (
                    <DataTable
                        buttonTopContentLabel="Create Category"
                        columns={COLUMN_LIST_CATEGORY}
                        // currentPage={1}
                        currentPage={Number(currentPage)}
                        data={dataCategory?.data || []}
                        emptyContent="Category is empty"
                        isLoading={isLoadingCategory || isRefetchingCategory}
                        limit={String(currentLimit)}
                        onChangeLimit={handleChangeLimit}
                        onChangePage={handleChangePage}
                        onClearSearch={handleClearSearch}
                        onChangeSearch={handleSearch}
                        onClickButtonTopContent={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        renderCell={renderCell}
                        totalPages={dataCategory?.pagination.totalPages}
                    />
                )}
            </section>

            <InputFile name="input" isDropable />
        </div >
    );
};


export default Category;