import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteBannerModal from "./useDeleteBannerModal";



interface PropTypes {
    isOpen?: boolean;
    onClose: () => void;
    refetchBanner: () => void;
    onOpenChange: () => void;
    selectedBanner: {
        _id: string;
        image?: string;
    } | null;
    setSelectedBanner: Dispatch<SetStateAction<{ _id: string; image?: string } | null>>;

}

const DeleteBannerModal = (props: PropTypes) => {
    const { isOpen, onOpenChange, onClose, refetchBanner, selectedBanner, setSelectedBanner, } = props;

    const {
        mutateDeleteBanner,
        isPendingDeleteBanner,
        isSuccessDeleteBanner,
    } = useDeleteBannerModal();

    useEffect(() => {
        if (isSuccessDeleteBanner) {
            onClose();
            refetchBanner();
            setSelectedBanner(null);
        }
    }, [isSuccessDeleteBanner, onClose, refetchBanner]);

    const handleDelete = () => {
        if (!selectedBanner?._id) return;

        console.log("Image URL:", selectedBanner.image);

        mutateDeleteBanner({
            id: selectedBanner._id,
            imageUrl: selectedBanner.image || "",
        });
    };

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside">

            <ModalContent className="mb-4">
                <ModalHeader>Delete Banner</ModalHeader>
                <ModalBody>
                    <p className="text-medium font-bold">Are you sure to Delete this Banner ?</p>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                            onClose();
                            // setSelectedId("");
                            setSelectedBanner(null);
                        }}
                        disabled={isPendingDeleteBanner}
                    >
                        {isPendingDeleteBanner ? (
                            <Spinner size="sm" color="primary" />
                        ) : ("Cancel")}
                    </Button>

                    <Button
                        color="danger"
                        type="submit"
                        disabled={isPendingDeleteBanner}
                        // onPress={() => mutateDeleteBanner(selectedId)}
                        onPress={handleDelete}
                    >

                        {isPendingDeleteBanner ? (
                            <Spinner size="sm" color="primary" />
                        ) : ("Delete Banner")}
                    </Button>

                </ModalFooter>

            </ModalContent>
        </Modal >
    );
};

export default DeleteBannerModal