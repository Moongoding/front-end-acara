import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.Constanst";
import useCategory from "./useCategory";
import AddCategoryModal from './AddCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import DropdownAction from "@/components/commons/DropdownAction";

const Category = () => {
    const { push, query } = useRouter();

    const {
        isRefetchingCategory,
        dataCategory,
        isLoadingCategory,
        refetchCategory,
        selectedId,
        setSelectedId
    } = useCategory();


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

                        <DropdownAction
                            onPressDetail={() => push(`/admin/category/${category._id}`)}
                            onPressDelete={() => {
                                setSelectedId({
                                    _id: category._id as string,
                                    icon: category.icon as string | undefined
                                });
                                deleteCategoryModal.onOpen();
                            }}
                        />
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
                        data={dataCategory?.data || []}
                        emptyContent="Category is empty"
                        isLoading={isLoadingCategory || isRefetchingCategory}
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