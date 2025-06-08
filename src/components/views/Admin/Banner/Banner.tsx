import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_BANNER } from "./Banner.Constanst";
import DropdownAction from "@/components/commons/DropdownAction";
import useBanner from "./useBanner";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal/DeleteBannerModal";

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
                    return (<Image src={`${cellValue}`} alt="image" width={300} height={100} className="rounded-lg" />);
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
                                    image: banner.image as string | undefined
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
                <AddBannerModal refetchBanner={refetchBanners} {...addBannerModal} />

                <DeleteBannerModal
                    {...deleteBannerModal}
                    selectedBanner={selectedId}
                    setSelectedBanner={setSelectedId}
                    refetchBanner={refetchBanners}
                />
            </section>

            {/* <InputFile name="input" isDropable /> */}
        </div >
    );
};


export default Banner;