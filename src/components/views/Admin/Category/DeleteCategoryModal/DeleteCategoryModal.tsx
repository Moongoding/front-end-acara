import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteCategoryModal from "./useDeleteCategoryModal";


interface PropTypes {
    isOpen?: boolean;
    onClose: () => void;
    refetchCategory: () => void;
    onOpenChange: () => void;
    selectedCategory: {
        _id: string;
        icon?: string;
    } | null;
    setSelectedCategory: Dispatch<SetStateAction<{ _id: string; icon?: string } | null>>;

}

const DeleteCategoryModal = (props: PropTypes) => {
    const { isOpen, onOpenChange, onClose, refetchCategory, selectedCategory, setSelectedCategory, } = props;

    const {
        mutateDeleteCategory,
        isPendingDeleteCategory,
        isSuccessDeleteCategory,
    } = useDeleteCategoryModal();

    useEffect(() => {
        if (isSuccessDeleteCategory) {
            onClose();
            refetchCategory();
            setSelectedCategory(null);
        }
    }, [isSuccessDeleteCategory, onClose, refetchCategory]);

    const handleDelete = () => {
        if (!selectedCategory?._id) return;

        mutateDeleteCategory({
            id: selectedCategory._id,
            iconUrl: selectedCategory.icon || "",
        });
    };

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside">

            <ModalContent className="mb-4">
                <ModalHeader>Delete Category</ModalHeader>
                <ModalBody>
                    <p className="text-medium font-bold">Are you sure to Delete this category ?</p>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                            onClose();
                            // setSelectedId("");
                            setSelectedCategory(null);
                        }}
                        disabled={isPendingDeleteCategory}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="danger"
                        type="submit"
                        disabled={isPendingDeleteCategory}
                        // onPress={() => mutateDeleteCategory(selectedId)}
                        onPress={handleDelete}
                    >

                        {isPendingDeleteCategory ? (
                            <Spinner size="sm" color="primary" />
                        ) : ("Delete Category")}
                    </Button>

                </ModalFooter>

            </ModalContent>
        </Modal >
    );
};

export default DeleteCategoryModal