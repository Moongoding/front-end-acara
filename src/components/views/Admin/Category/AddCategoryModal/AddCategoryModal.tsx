import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@nextui-org/react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
    isOpen?: boolean;
    onClose: () => void;
    refetchCategory: () => void;
    onOpenChange: () => void;
};

const AddCategoryModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchCategory, onOpenChange } = props;

    const {
        control,
        errors,
        handleSubmitForm,
        handleAddCategory,
        isPendingAddCategory,
        isSuccessAddCategory,
        handleCancel,

        preview,
        handleUploadIcon,
        isPendingUploadFile,
        handleDeleteIcon,
        isPendingDeleteFile,
    } = useAddCategoryModal();

    useEffect(() => {
        if (isSuccessAddCategory) {
            onClose();
            refetchCategory();
        }
    }, [isSuccessAddCategory]);



    const disabledSubmit = isPendingAddCategory || isPendingUploadFile || isPendingDeleteFile

    return (
        <Modal onClose={() => handleCancel(onClose)} onOpenChange={onOpenChange} isOpen={isOpen} placement="center" scrollBehavior="inside">
            <form onSubmit={handleSubmitForm(handleAddCategory)}>
                <ModalContent className="mb-4">
                    <ModalHeader>Add Category</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <Controller name="name" control={control} render={({ field }) => (
                                <Input {...field} autoFocus label="Name" variant="bordered" type="text" isInvalid={errors.name !== undefined} errorMessage={errors.name?.message} />
                            )} />

                            <Controller name="description" control={control} render={({ field }) => (
                                <Textarea
                                    {...field}
                                    label="Description"
                                    variant="bordered"
                                    isInvalid={errors.description !== undefined}
                                    errorMessage={errors.description?.message}
                                    className="mb-2"
                                />
                            )} />

                            <p className="text-sm font-bold">Icon</p>
                            <Controller
                                name="icon"
                                control={control}
                                render={({ field: { onChange, value, ...field } }) => (
                                    <InputFile
                                        {...field}
                                        onUpload={(files) => handleUploadIcon(files, onChange)}
                                        isUploading={isPendingUploadFile}
                                        onDelete={() => handleDeleteIcon(onChange)}
                                        isDeleting={isPendingDeleteFile}
                                        isInvalid={errors.icon !== undefined}
                                        errorMessage={errors.icon?.message}
                                        isDropable
                                        preview={typeof preview === 'string' ? preview : ""}
                                        clasName="mb-2"
                                    />
                                )} />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="flat"
                            onPress={() => handleCancel(onClose)}
                            disabled={disabledSubmit}
                        >
                            {disabledSubmit ? (
                                <Spinner size="sm" color="primary" />
                            ) : ("Cancel")}
                        </Button>

                        <Button
                            color="danger"
                            type="submit"
                            disabled={disabledSubmit}>

                            {disabledSubmit ? (
                                <Spinner size="sm" color="primary" />
                            ) : ("Create Category")}
                        </Button>

                    </ModalFooter>

                </ModalContent>
            </form>
        </Modal >
    );
};

export default AddCategoryModal;