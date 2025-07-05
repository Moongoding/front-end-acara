import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@nextui-org/react"
import Image from "next/image";
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IBanner } from "@/types/Banner";

interface PropTypes {
    currentImage: string,
    onUpdate: (data: IBanner) => void
    isPendingUpdate: boolean,
    isSuccessUpdate: boolean,
}



const ImageTab = (props: PropTypes) => {
    const { currentImage, onUpdate, isPendingUpdate, isSuccessUpdate, } = props;

    // console.log("ImageTab: currentImage value:", currentImage);

    const {
        handleDeleteImage,
        handleUploadImage,
        isPendingDeleteFile,
        isPendingUploadFile,

        controlUpdateImage,
        handleSubmitImage,
        errorsUpdateImage,
        resetUpdateImage,
        mutateDeleteFile,

        preview,
    } = useImageTab();

    const disabledSubmit = isPendingUploadFile || isPendingUpdate

    useEffect(() => {
        if (isPendingUpdate) {
            resetUpdateImage();
        }
    }, [isPendingUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Banner Image</h1>
                <p className="w-full text-small text-default-400">Manage Image of this Banner</p>
            </CardHeader>

            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitImage((formData) => {
                    // Ambil Image lama dari props
                    const oldImage = currentImage;
                    const newImage = formData.image;

                    // Jika Image lama adalah string dan berbeda dari Image baru, hapus yang lama
                    if (typeof oldImage === "string" && oldImage !== newImage && typeof newImage === "string") {
                        mutateDeleteFile({
                            fileUrl: oldImage,
                            callback: () => { }, // callback kosong, karena kita tidak perlu aksi lanjut
                        });
                    }

                    // Kirim data update ke backend
                    onUpdate(formData);
                })}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Image</p>
                        <Skeleton isLoaded={!!currentImage} className="h-32 rounded-lg">
                            <Image src={currentImage} alt="Image" fill className="!relative rounded-lg" />
                        </Skeleton>
                    </div>

                    <Controller
                        name="image"
                        control={controlUpdateImage}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                {...field}
                                onDelete={() => handleDeleteImage(onChange)}
                                onUpload={(files) => handleUploadImage(files, onChange)}
                                isUploading={isPendingUploadFile}
                                isDeleting={isPendingDeleteFile}
                                isInvalid={errorsUpdateImage.image !== undefined}
                                errorMessage={errorsUpdateImage.image?.message}
                                isDropable
                                preview={typeof preview === 'string' ? preview : ""}
                                clasName="mb-2"
                                label=
                                {
                                    <p className="w-full text-small text-center text-default-700 mb-2">
                                        Upload New Image
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
                        ) : ("Save Change Banner")}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default ImageTab;