import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import useAddBannerModal from "./useAddBannerModal";

interface PropTypes {
    isOpen?: boolean;
    onClose: () => void;
    refetchBanner: () => void;
    onOpenChange: () => void;
};

const AddBannerModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchBanner, onOpenChange } = props;

    const {
        control,
        errors,
        handleSubmitForm,
        handleAddBanner,
        isPendingAddBanner,
        isSuccessAddBanner,
        handleCancel,

        preview,
        handleUploadImage,
        handleDeleteImage,
        isPendingUploadFile,
        isPendingDeleteFile,
    } = useAddBannerModal();



    useEffect(() => {
        if (isSuccessAddBanner) {
            onClose();
            refetchBanner();
        }
    }, [isSuccessAddBanner]);



    const disabledSubmit = isPendingAddBanner || isPendingUploadFile || isPendingDeleteFile

    return (
        <Modal
            onClose={() => handleCancel(onClose)}
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside">
            <form onSubmit={handleSubmitForm
                (handleAddBanner)}>
                <ModalContent className="mb-4">
                    <ModalHeader>Add Banner</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>

                            <Controller name="title" control={control} render={({ field }) => (
                                <Input
                                    {...field} autoFocus
                                    label="Title" variant="bordered"
                                    type="text" isInvalid={errors.title !== undefined}
                                    errorMessage={errors.title?.message}
                                />
                            )} />


                            <Controller
                                name="isShow"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Status"
                                        variant="bordered"
                                        isInvalid={errors.isShow !== undefined}
                                        errorMessage={errors.isShow?.message}
                                        disallowEmptySelection
                                    >
                                        <SelectItem key="true" value="true">Show</SelectItem>
                                        <SelectItem key="false" value="false">Hide</SelectItem>
                                    </Select>
                                )} />

                            <p className="text-sm font-bold">Image</p>
                            <Controller
                                name="image"
                                control={control}
                                render={({ field: { onChange, value, ...field } }) => (
                                    <InputFile
                                        {...field}
                                        onUpload={(files) => handleUploadImage(files, onChange)}
                                        isUploading={isPendingUploadFile}
                                        onDelete={() => handleDeleteImage(onChange)}
                                        isDeleting={isPendingDeleteFile}
                                        isInvalid={errors.image !== undefined}
                                        errorMessage={errors.image?.message}
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
                            ) : ("Create Banner")}
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal >
    );
};

export default AddBannerModal;