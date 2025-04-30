import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@nextui-org/react"
import Image from "next/image";
import useIconTab from "./useBannerTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEvent } from "@/types/Event";

interface PropTypes {
    currentBanner: string,
    onUpdate: (data: IEvent) => void
    isPendingUpdate: boolean,
    isSuccessUpdate: boolean,
}

const BannerTab = (props: PropTypes) => {
    const { currentBanner, onUpdate, isPendingUpdate, isSuccessUpdate, } = props;
    const {
        handleDeleteBanner,
        handleUploadBanner,
        isPendingDeleteFile,
        isPendingUploadFile,

        controlUpdateBanner,
        handleSubmitBanner,
        errorsUpdateBanner,
        reset,
        mutateDeleteFile,

        preview,
    } = useIconTab();

    const disabledSubmit = isPendingUploadFile || isPendingUpdate

    useEffect(() => {
        if (isPendingUpdate) {
            reset();
        }
    }, [isPendingUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Banner Event</h1>
                <p className="w-full text-small text-default-400">Manage banner of this Event</p>
            </CardHeader>

            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitBanner((formData) => {
                    // Ambil icon lama dari props
                    const oldIcon = currentBanner;
                    const newIcon = formData.banner;

                    // Jika icon lama adalah string dan berbeda dari icon baru, hapus yang lama
                    if (typeof oldIcon === "string" && oldIcon !== newIcon && typeof newIcon === "string") {
                        mutateDeleteFile({
                            fileUrl: oldIcon,
                            callback: () => { }, // callback kosong, karena kita tidak perlu aksi lanjut
                        });
                    }

                    // Kirim data update ke backend
                    onUpdate(formData);
                })}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Banner</p>
                        <Skeleton isLoaded={!!currentBanner} className="aspect-video rounded-lg">
                            <Image src={currentBanner} alt="icon" fill className="!relative rounded-lg" />
                        </Skeleton>
                    </div>

                    <Controller
                        name="banner"
                        control={controlUpdateBanner}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                {...field}
                                onDelete={() => handleDeleteBanner(onChange)}
                                onUpload={(files) => handleUploadBanner(files, onChange)}
                                isUploading={isPendingUploadFile}
                                isDeleting={isPendingDeleteFile}
                                isInvalid={errorsUpdateBanner.banner !== undefined}
                                errorMessage={errorsUpdateBanner.banner?.message}
                                isDropable
                                preview={typeof preview === 'string' ? preview : ""}
                                clasName="mb-2"
                                label=
                                {
                                    <p className="w-full text-small text-center text-default-700 mb-2">
                                        Upload New Banner
                                    </p>
                                } />
                        )} />


                    <Button
                        color="danger"
                        type="submit"
                        className="mt-2 disabled:bg-default-500"
                        disabled={disabledSubmit || !preview}>

                        {disabledSubmit ? (
                            <Spinner size="sm" color="primary" />
                        ) : ("Save Change Category")}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default BannerTab;