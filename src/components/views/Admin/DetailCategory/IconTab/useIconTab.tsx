import { ToasterContext } from "@/contexts/ToasterContexts";
import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";



const schemaUpdateIcon = yup.object().shape({
    icon: yup.mixed<FileList | string>().required("Please input your icon"),
});

const useIconTab = () => {

    const { showToaster } = useContext(ToasterContext);

    const {
        mutateUploadFile,
        isPendingUploadFile,
        mutateDeleteFile,
        isPendingDeleteFile
    } = useMediaHandling();

    const {
        control: controlUpdateIcon,
        handleSubmit: handleSubmitIcon,
        formState: { errors: errorsUpdateIcon },
        reset: resetUpdateIcon,
        watch: watchUpdateIcon,
        getValues: getValuesIcon,
        setValue: setValueIcon,
    } = useForm({
        resolver: yupResolver(schemaUpdateIcon),
    });

    const preview = watchUpdateIcon("icon");

    const handleUploadIcon = (
        files: FileList,
        onChange: (files: FileList | undefined) => void
    ) => {
        if (files.length === 0) return;

        const existingIcon = getValuesIcon("icon");

        // Jika sudah ada icon sebelumnya, hapus terlebih dahulu
        if (typeof existingIcon === "string") {
            mutateDeleteFile({
                fileUrl: existingIcon,
                callback: () => {
                    uploadNewIcon(files, onChange); // baru upload setelah delete
                },
            });
        } else {
            uploadNewIcon(files, onChange); // langsung upload jika belum ada
        }
    };


    const uploadNewIcon = (
        files: FileList,
        onChange: (files: FileList | undefined) => void
    ) => {
        onChange(files); // untuk preview sementara

        mutateUploadFile({
            file: files[0],
            callback: (fileUrl: string) => {
                setValueIcon("icon", fileUrl); // set value form
            },
        });
    };


    const handleDeleteIcon = (
        onChange: (files: FileList | undefined) => void
    ) => {
        const fileUrl = getValuesIcon("icon");
        if (typeof fileUrl === "string") {
            mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
        }
    };

    return {
        handleDeleteIcon,
        handleUploadIcon,
        isPendingDeleteFile,
        isPendingUploadFile,
        resetUpdateIcon,
        getValuesIcon,

        mutateDeleteFile,

        controlUpdateIcon,
        handleSubmitIcon,
        errorsUpdateIcon,
        preview,
    };
};

export default useIconTab;