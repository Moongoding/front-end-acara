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
        refetchCategory,

        // selectedId,
        // setSelectedId
    } = useCategory();

    const addCategoryModal = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState<{ _id: string; icon?: string } | null>(null);
    const deleteCategoryModal = useDisclosure();

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
                                    // onPress={() => {
                                    // setSelectedId(`${category._id}`);
                                    // deleteCategoryModal.onOpen();
                                    // }}
                                    onPress={() => {
                                        setSelectedCategory({
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
                        onClickButtonTopContent={addCategoryModal.onOpen}
                        renderCell={renderCell}
                        totalPages={dataCategory?.pagination.totalPages}
                    />
                )}
                <AddCategoryModal refetchCategory={refetchCategory} {...addCategoryModal} />

                {/* <DeleteCategoryModal
                    {...deleteCategoryModal}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    refetchCategory={refetchCategory}
                /> */}

                <DeleteCategoryModal
                    {...deleteCategoryModal}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    refetchCategory={refetchCategory}
                />
            </section>

            {/* <InputFile name="input" isDropable /> */}
        </div >
    );
};


export default Category;