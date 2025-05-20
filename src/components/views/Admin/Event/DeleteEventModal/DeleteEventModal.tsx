import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteEventModal from "./useDeleteEventModal";
import useDeleteTicketModal from "../../DetailEvent/TicketTab/DeleteTicketModal/useTicketModal";


interface PropTypes {
    isOpen?: boolean;
    onClose: () => void;
    refetchEvent: () => void;
    onOpenChange: () => void;
    selectedEvent: {
        _id: string;
        banner?: string;
    } | null;
    setSelectedEvent: Dispatch<SetStateAction<{ _id: string; banner?: string } | null>>;

}

const DeleteEventModal = (props: PropTypes) => {
    const { isOpen,
        onOpenChange,
        onClose,
        refetchEvent,
        selectedEvent,
        setSelectedEvent,
    } = props;

    const {
        mutateDeleteEvent,
        isPendingDeleteEvent,
        isSuccessDeleteEvent,
    } = useDeleteEventModal();

    const {
        deleteTicketByevent,
    } = useDeleteTicketModal();


    useEffect(() => {
        if (isSuccessDeleteEvent) {
            onClose();
            refetchEvent();
            setSelectedEvent(null);
        }
    }, [isSuccessDeleteEvent, onClose, refetchEvent]);


    const handleDelete = async () => {
        if (!selectedEvent?._id) return;

        // mutateDeleteEvent({
        //     id: selectedEvent._id,
        //     bannerUrl: selectedEvent.banner || "",
        // });

        try {
            // Hapus tiket dulu
            await deleteTicketByevent(`${selectedEvent._id}`);
            // Baru hapus event
            await mutateDeleteEvent({
                id: selectedEvent._id,
                bannerUrl: selectedEvent.banner || "",
            });

        } catch (error) {
            console.error("Gagal menghapus:", error);
        }
    };

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside">

            <ModalContent className="mb-4">
                <ModalHeader>Delete Event</ModalHeader>
                <ModalBody>
                    <p className="text-medium font-bold">Are you sure to Delete this Event ?</p>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                            onClose();
                            // setSelectedId("");
                            setSelectedEvent(null);
                        }}
                        disabled={isPendingDeleteEvent}
                    >
                        {isPendingDeleteEvent ? (
                            <Spinner size="sm" color="primary" />
                        ) : ("Cancel")}
                    </Button>

                    <Button
                        color="danger"
                        type="submit"
                        disabled={isPendingDeleteEvent}
                        // onPress={() => mutateDeleteCategory(selectedId)}
                        onPress={handleDelete}
                    >

                        {isPendingDeleteEvent ? (
                            <Spinner size="sm" color="primary" />
                        ) : ("Delete Event")}
                    </Button>

                </ModalFooter>

            </ModalContent>
        </Modal >
    );
};

export default DeleteEventModal