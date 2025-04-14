import categoryServices from '@/services/category.Services';
import { ICategory } from '@/types/Category';
import { getFriendlyErrorMessage } from '@/utils/errorMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ToasterContext } from "@/contexts/ToasterContexts";
import { useContext } from 'react';
import useMediaHandling from '@/hooks/useMediaHandling';

const schema = yup.object().shape({
    name: yup.string().required("Please input name"),
    description: yup.string().required("Please input description"),
    icon: yup.mixed<FileList | string>().required("Please input the icon"),
});

const useAddCategoryModal = () => {
    const { showToaster } = useContext(ToasterContext);
    const {
        mutateUploadFile,
        isPandingUploadFile,
        mutateDeleteFile,
        isPandingDeleteFile
    } = useMediaHandling();

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const preview = watch("icon");


    // const handleUploadIcon = (
    //     files: FileList,
    //     onChange: (files: FileList | undefined) => void
    // ) => {
    //     if (files.length !== 0) {
    //         onChange(files);
    //         mutateUploadFile({
    //             file: files[0],
    //             callback: (fileUrl: string) => {
    //                 setValue("icon", fileUrl);
    //             },
    //         });
    //     }
    // };

    const handleUploadIcon = (
        files: FileList,
        onChange: (files: FileList | undefined) => void
    ) => {
        if (files.length === 0) return;

        const existingIcon = getValues("icon");

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
                setValue("icon", fileUrl); // set value form
            },
        });
    };

    const handleDeleteIcon = (
        onChange: (files: FileList | undefined) => void
    ) => {
        const fileUrl = getValues("icon");
        if (typeof fileUrl === "string") {
            mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
        }
    };

    const handleCancel = (onClose: () => void) => {
        const fileUrl = getValues("icon");
        if (typeof fileUrl === "string") {
            mutateDeleteFile({
                fileUrl, callback: () => {
                    reset();
                    onClose();
                }
            });
        } else {
            reset();
            onClose();
        }
    };

    const addCategory = async (payload: ICategory) => {
        const res = await categoryServices.addCategory(payload);
        return res;
    };



    const { mutate: mutateAddCategory, isPending: isPandingAddCategory, isSuccess: isSuccessAddCategory } = useMutation({
        mutationFn: addCategory,
        onError: (error) => {
            const friendlyMessage = getFriendlyErrorMessage(error);
            showToaster({ type: "error", message: friendlyMessage });
        },
        onSuccess: () => {
            showToaster({ type: "success", message: "Success add category" });

            reset();
        },
    });


    const handleAddCategory = (data: ICategory) => mutateAddCategory(data);




    return {
        control,
        errors,
        reset,
        handleSubmitForm,
        handleAddCategory,
        isPandingAddCategory,
        isSuccessAddCategory,

        preview,
        handleUploadIcon,
        isPandingUploadFile,
        handleDeleteIcon,
        isPandingDeleteFile,
        handleCancel
    }
};

export default useAddCategoryModal;