import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_BANNER } from "./Banner.Constanst";
import AddCategoryModal from './AddBannerModal';
import DeleteCategoryModal from './DeleteBannerModal';
import DropdownAction from "@/components/commons/DropdownAction";
import useBanner from "./useBanner";

const Banner = () => {
    const { push, query } = useRouter();

    const {
        isRefetchingBanners,
        dataBanners,
        isLoadingBanners,
        refetchBanners,
        selectedId,
        setSelectedId
    } = useBanner();


    const addBannerModal = useDisclosure();
    const deleteBannerModal = useDisclosure();

    const renderCell = useCallback(
        (banner: Record<string, unknown>, columnKey: Key) => {
            const cellValue = banner[columnKey as keyof typeof banner];
            switch (columnKey) {
                case "image":
                    return (<Image src={`${cellValue}`} alt="image" width={200} height={50} />);
                case "isShow":
                    return (
                        <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue === true ? "Publish" : "Not Publish"}
                        </Chip>
                    )
                case "actions":
                    return (

                        <DropdownAction
                            onPressDetail={() => push(`/admin/banner/${banner._id}`)}
                            onPressDelete={() => {
                                setSelectedId({
                                    _id: banner._id as string,
                                    icon: banner.icon as string | undefined
                                });
                                deleteBannerModal.onOpen();
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
                        buttonTopContentLabel="Create Banner"
                        columns={COLUMN_LIST_BANNER}
                        data={dataBanners?.data || []}
                        emptyContent="Banners is empty"
                        isLoading={isLoadingBanners || isRefetchingBanners}
                        onClickButtonTopContent={addBannerModal.onOpen}
                        renderCell={renderCell}
                        totalPages={dataBanners?.pagination.totalPages}
                    />
                )}
                {/* <AddCategoryModal refetchCategory={refetchBanners} {...addBannerModal} />

                <DeleteCategoryModal
                    {...deleteBannerModal}
                    selectedCategory={selectedId}
                    setSelectedCategory={setSelectedId}
                    refetchCategory={refetchBanners}
                /> */}
            </section>

            {/* <InputFile name="input" isDropable /> */}
        </div >
    );
};


export default Banner;