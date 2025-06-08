// 🔁 Import External Libraries
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';

// 🔁 Import Internal Resources
import { ToasterContext } from "@/contexts/ToasterContexts";
import useMediaHandling from '@/hooks/useMediaHandling';
import bannerServices from '@/services/banner.Services';
import { handleApiError } from '@/utils/handleApiError';
import { IBanner } from '@/types/Banner';

// 🧠 Yup Validation Schema
const schema = yup.object().shape({
    title: yup.string().required("Please input title"),
    isShow: yup.string().required("Please input isShow"),
    image: yup.mixed<FileList | string>().required("Please input the image"),
});



const useAddBannerModal = () => {
    const router = useRouter();
    const { showToaster } = useContext(ToasterContext);

    const {
        isPendingUploadFile,
        isPendingDeleteFile,
        handleDeleteFile,
        handleUploadFile,
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

    const preview = watch("image");
    const fileUrl = getValues("image");

    // 🔼 Upload Image Handler
    const handleUploadImage = (
        files: FileList,
        onChange: (files: FileList | undefined) => void
    ) => {
        if (files.length === 0) return;
        const currentFileUrl = getValues("image");

        console.log("ini adalah file url yang ada sebelumnya:", currentFileUrl);

        handleUploadFile(
            files,
            onChange,
            (fileUrl: string | undefined) => {
                if (fileUrl) {
                    setValue("image", fileUrl); // set value form
                }
            },
            // typeof fileUrl === "string" ? fileUrl : undefined
            typeof currentFileUrl === "string" ? currentFileUrl : undefined
        )
    };

    // 🗑️ Delete Icon Handler
    const handleDeleteImage = (
        onChange: (files: FileList | undefined) => void
    ) => {
        handleDeleteFile(fileUrl, () => onChange(undefined))
    };

    // ❌ Cancel & Reset Handler
    const handleCancel = (onClose: () => void) => {
        if (typeof fileUrl === "string") {
            handleDeleteFile(fileUrl, () => {
                reset();
                onClose();
            });
        } else {
            reset();
            onClose();
        }
    };

    // ➕ Add Banner API
    const addBanner = async (payload: IBanner) => {
        const res = await bannerServices.addBanner(payload);
        return res;
    };

    // 🔁 Add Category Mutation
    const {
        mutate: mutateAddCategory,
        isPending: isPendingAddCategory,
        isSuccess: isSuccessAddCategory
    } = useMutation({
        mutationFn: addBanner,
        onError: (error) => handleApiError(error, showToaster, router),
        onSuccess: () => {
            showToaster({ type: "success", message: "Success add Banner" });
            reset();
        },
    });

    // 📩 Submit Handler
    const handleAddCategory = (data: IBanner) => mutateAddCategory(data);

    return {
        // Form
        control,
        errors,
        reset,
        handleSubmitForm,

        // Submission
        handleAddCategory,
        isPendingAddCategory,
        isSuccessAddCategory,

        // Icon Upload
        preview,
        handleUploadImage,
        isPendingUploadFile,
        handleDeleteImage,
        isPendingDeleteFile,

        // Misc
        handleCancel
    }
};

export default useAddBannerModal;