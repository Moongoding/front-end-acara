
import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";


const schemaUpdateImage = yup.object().shape({
    image: yup.mixed<FileList | string>().required("Please input your image"),
});

const useImageTab = () => {
    const {
        mutateUploadFile,
        isPendingUploadFile,
        mutateDeleteFile,
        isPendingDeleteFile
    } = useMediaHandling();

    const {
        control: controlUpdateImage,
        handleSubmit: handleSubmitImage,
        formState: { errors: errorsUpdateImage },
        reset: resetUpdateImage,
        watch: watchUpdateImage,
        getValues: getValuesImage,
        setValue: setValueImage,
    } = useForm({
        resolver: yupResolver(schemaUpdateImage),
    });

    const preview = watchUpdateImage("image");

    const handleUploadImage = (
        files: FileList,
        onChange: (files: FileList | undefined) => void
    ) => {
        if (files.length === 0) return;

        const existingImage = getValuesImage("image");

        // Jika sudah ada Image sebelumnya, hapus terlebih dahulu
        if (typeof existingImage === "string") {
            mutateDeleteFile({
                fileUrl: existingImage,
                callback: () => {
                    uploadNewImage(files, onChange); // baru upload setelah delete
                },
            });
        } else {
            uploadNewImage(files, onChange); // langsung upload jika belum ada
        }
    };


    const uploadNewImage = (
        files: FileList,
        onChange: (files: FileList | undefined) => void
    ) => {
        onChange(files); // untuk preview sementara

        mutateUploadFile({
            file: files[0],
            callback: (fileUrl: string) => {
                setValueImage("image", fileUrl); // set value form
            },
        });
    };

    const handleDeleteImage = (
        onChange: (files: FileList | undefined) => void
    ) => {
        const fileUrl = getValuesImage("image");
        if (typeof fileUrl === "string") {
            mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
        }
    };

    return {
        handleDeleteImage,
        handleUploadImage,
        isPendingDeleteFile,
        isPendingUploadFile,
        resetUpdateImage,
        getValuesImage,

        mutateDeleteFile,

        controlUpdateImage,
        handleSubmitImage,
        errorsUpdateImage,
        preview,
    };
};

export default useImageTab;