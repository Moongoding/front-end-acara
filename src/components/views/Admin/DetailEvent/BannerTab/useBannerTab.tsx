import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";



const schemaUpdateBanner = yup.object().shape({
    banner: yup.mixed<FileList | string>().required("Please input the banner")
});

const useBannerTab = () => {

    const {
        isPendingUploadFile,
        mutateDeleteFile,
        isPendingDeleteFile,
        handleUploadFile,
        handleDeleteFile
    } = useMediaHandling();

    const {
        control: controlUpdateBanner,
        handleSubmit: handleSubmitBanner,
        formState: { errors: errorsUpdateBanner },
        reset,
        watch: watchUpdateBanner,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schemaUpdateBanner),
    });

    const preview = watchUpdateBanner("banner");
    const fileUrl = getValues("banner");

    const handleUploadBanner = (
        files: FileList,
        onChange: (files: FileList | undefined) => void
    ) => {
        if (files.length === 0) return;
        const currentFileUrl = getValues("banner");
        // console.log("ini adalah file url yang ada sebelumnya:", currentFileUrl);
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
            if (fileUrl) {
                setValue("banner", fileUrl); // set value form
            }
        },
            typeof currentFileUrl === "string" ? currentFileUrl : undefined
        )
    };

    // 🗑️ Delete Banner Handler
    const handleDeleteBanner = (
        onChange: (files: FileList | undefined) => void
    ) => {
        handleDeleteFile(fileUrl, () => onChange(undefined))
    };

    // ❌ Cancel & Reset Handler
    // const handleCancel = (onClose: () => void) => {
    //     if (typeof fileUrl === "string") {
    //         handleDeleteFile(fileUrl, () => {
    //             reset();
    //             onClose();
    //         });
    //     } else {
    //         reset();
    //         onClose();
    //     }
    // };


    return {
        handleDeleteBanner,
        handleUploadBanner,
        isPendingDeleteFile,
        isPendingUploadFile,
        reset,
        getValues,
        mutateDeleteFile,

        controlUpdateBanner,
        handleSubmitBanner,
        errorsUpdateBanner,
        preview,
    };
};

export default useBannerTab;