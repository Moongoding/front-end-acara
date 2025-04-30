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
import categoryServices from '@/services/category.Services';
import { handleApiError } from '@/utils/handleApiError';
import { ICategory } from '@/types/Category';

// 🧠 Yup Validation Schema
const schema = yup.object().shape({
    name: yup.string().required("Please input name"),
    description: yup.string().required("Please input description"),
    icon: yup.mixed<FileList | string>().required("Please input the icon"),
});

const useAddCategoryModal = () => {
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

    const preview = watch("icon");
    const fileUrl = getValues("icon");

    // 🔼 Upload Icon Handler
    const handleUploadIcon = (
        files: FileList,
        onChange: (files: FileList | undefined) => void
    ) => {
        if (files.length === 0) return;
        const currentFileUrl = getValues("icon");

        console.log("ini adalah file url yang ada sebelumnya:", currentFileUrl);

        handleUploadFile(
            files,
            onChange,
            (fileUrl: string | undefined) => {
                if (fileUrl) {
                    setValue("icon", fileUrl); // set value form
                }
            },
            // typeof fileUrl === "string" ? fileUrl : undefined
            typeof currentFileUrl === "string" ? currentFileUrl : undefined
        )
    };

    // 🗑️ Delete Icon Handler
    const handleDeleteIcon = (
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

    // ➕ Add Category API
    const addCategory = async (payload: ICategory) => {
        const res = await categoryServices.addCategory(payload);
        return res;
    };

    // 🔁 Add Category Mutation
    const {
        mutate: mutateAddCategory,
        isPending: isPendingAddCategory,
        isSuccess: isSuccessAddCategory
    } = useMutation({
        mutationFn: addCategory,
        onError: (error) => handleApiError(error, showToaster, router),
        onSuccess: () => {
            showToaster({ type: "success", message: "Success add category" });
            reset();
        },
    });

    // 📩 Submit Handler
    const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

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
        handleUploadIcon,
        isPendingUploadFile,
        handleDeleteIcon,
        isPendingDeleteFile,

        // Misc
        handleCancel
    }
};

export default useAddCategoryModal;