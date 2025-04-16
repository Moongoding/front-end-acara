import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@nextui-org/react"
import Image from "next/image";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";

interface PropTypes {
    currentIcon: string,
    onUpdate: (data: ICategory) => void
    isPendingUpdate: boolean,
    isSuccessUpdate: boolean,
}



const IconTab = (props: PropTypes) => {
    const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate, } = props;

    const {
        handleDeleteIcon,
        handleUploadIcon,
        isPendingDeleteFile,
        isPendingUploadFile,

        controlUpdateIcon,
        handleSubmitIcon,
        errorsUpdateIcon,
        resetUpdateIcon,
        mutateDeleteFile,

        preview,
    } = useIconTab();

    const disabledSubmit = isPendingUploadFile || isPendingUpdate

    useEffect(() => {
        if (isPendingUpdate) {
            resetUpdateIcon();
        }
    }, [isPendingUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Category Icon</h1>
                <p className="w-full text-small text-default-400">Manage icon of this Category</p>
            </CardHeader>

            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitIcon((formData) => {
                    // Ambil icon lama dari props
                    const oldIcon = currentIcon;
                    const newIcon = formData.icon;

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
                        <p className="text-sm font-medium text-default-700">Current Icon</p>
                        <Skeleton isLoaded={!!currentIcon} className="aspect-square rounded-lg">
                            <Image src={currentIcon} alt="icon" fill className="!relative" />
                        </Skeleton>
                    </div>

                    <Controller
                        name="icon"
                        control={controlUpdateIcon}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                {...field}
                                onDelete={() => handleDeleteIcon(onChange)}
                                onUpload={(files) => handleUploadIcon(files, onChange)}
                                isUploading={isPendingUploadFile}
                                isDeleting={isPendingDeleteFile}
                                isInvalid={errorsUpdateIcon.icon !== undefined}
                                errorMessage={errorsUpdateIcon.icon?.message}
                                isDropable
                                preview={typeof preview === 'string' ? preview : ""}
                                clasName="mb-2"
                                label=
                                {
                                    <p className="w-full text-small text-center text-default-700 mb-2">
                                        Upload New Icon
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

export default IconTab;