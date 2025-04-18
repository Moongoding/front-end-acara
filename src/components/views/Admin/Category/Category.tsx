import DataTable from "@/components/ui/DataTable";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, Key, ReactNode, useCallback, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.Constanst";
import useCategory from "./useCategory";
import AddCategoryModal from './AddCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal'
import useChangeUrl from "@/hooks/useChangeUrl";


const Category = () => {
    const { push, isReady, query } = useRouter();

    // const { setURL } = useCategory();
    const {
        isRefetchingCategory,
        dataCategory,
        isLoadingCategory,
        refetchCategory,
        selectedId,
        setSelectedId
    } = useCategory();

    const {
        currentLimit,
        currentPage,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
    } = useChangeUrl();

    const addCategoryModal = useDisclosure();
    const deleteCategoryModal = useDisclosure();

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
                                <Button isIconOnly size="sm" variant="light" aria-label="More options">
                                    <CiMenuKebab className="text-default-700" />
                                </Button>
                            </DropdownTrigger>

                            <DropdownMenu aria-label="Category actions">
                                <DropdownItem key="detail-category-button" onPress={() => push(`/admin/category/${category._id}`)} >
                                    Detail Category
                                </DropdownItem>

                                <DropdownItem key="delete-category" className="text-danger-500"
                                    onPress={() => {
                                        setSelectedId({
                                            _id: category._id as string,
                                            icon: category.icon as string | undefined
                                        });
                                        deleteCategoryModal.onOpen();
                                    }}
                                >
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
                        currentPage={Number(currentPage)}
                        data={dataCategory?.data || []}
                        emptyContent="Category is empty"
                        isLoading={isLoadingCategory || isRefetchingCategory}
                        limit={String(currentLimit)}
                        onChangeLimit={handleChangeLimit}
                        onChangePage={handleChangePage}
                        onClearSearch={handleClearSearch}
                        onChangeSearch={handleSearch}
                        onClickButtonTopContent={addCategoryModal.onOpen}
                        renderCell={renderCell}
                        totalPages={dataCategory?.pagination.totalPages}
                    />
                )}
                <AddCategoryModal refetchCategory={refetchCategory} {...addCategoryModal} />

                <DeleteCategoryModal
                    {...deleteCategoryModal}
                    selectedCategory={selectedId}
                    setSelectedCategory={setSelectedId}
                    refetchCategory={refetchCategory}
                />
            </section>

            {/* <InputFile name="input" isDropable /> */}
        </div >
    );
};


export default Category;