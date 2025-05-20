import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTicketModal from "./useTicketModal";
import { ITicket } from "@/types/Ticket";


interface PropTypes {
    isOpen?: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchTicket: () => void;
    selectedData: ITicket | null;
    setSelectedData: Dispatch<SetStateAction<ITicket | null>>;
}

const DeleteTicketModal = (props: PropTypes) => {
    const {
        isOpen,
        onClose,
        onOpenChange,
        refetchTicket,
        selectedData,
        setSelectedData,
    } = props;

    const {
        mutateDeleteTicket,
        isPendingDeleteTicket,
        isSuccessDeleteTicket,
    } = useDeleteTicketModal();

    useEffect(() => {
        if (isSuccessDeleteTicket) {
            onClose();
            refetchTicket();
            setSelectedData(null);
        }
    }, [isSuccessDeleteTicket, onClose, refetchTicket]);


    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside">

            <ModalContent className="mb-4">
                <ModalHeader>Delete Ticket</ModalHeader>
                <ModalBody>
                    <p className="text-medium font-bold">Are you sure to Delete this Ticket ?</p>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                            onClose();
                            setSelectedData(null);
                        }}
                        disabled={isPendingDeleteTicket}
                    >
                        {isPendingDeleteTicket ? (
                            <Spinner size="sm" color="primary" />
                        ) : ("Cancel")}
                    </Button>

                    <Button
                        color="danger"
                        type="submit"
                        disabled={isPendingDeleteTicket}
                        onPress={() => mutateDeleteTicket(`${selectedData?._id}`)}
                    >

                        {isPendingDeleteTicket ? (
                            <Spinner size="sm" color="primary" />
                        ) : ("Delete Ticket")}
                    </Button>

                </ModalFooter>

            </ModalContent>
        </Modal >
    );
};

export default DeleteTicketModal