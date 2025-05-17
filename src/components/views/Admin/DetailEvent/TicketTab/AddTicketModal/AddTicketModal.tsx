import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@nextui-org/react";
import useAddTicketModal from "./useAddTicketModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
    isOpen?: boolean;
    onClose: () => void;
    refetchTicket: () => void;
    onOpenChange: () => void;
};

const AddTicketModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchTicket, onOpenChange } = props;

    const {
        // Form
        control,
        errors,
        reset,
        handleSubmitForm,

        // Submission
        handleAddTicket,
        isPendingAddTicket,
        isSuccessAddTicket,

    } = useAddTicketModal();

    const handleClose = () => {
        onClose();
        reset();
    }


    useEffect(() => {
        if (isSuccessAddTicket) {
            onClose();
            refetchTicket();
        }
    }, [isSuccessAddTicket]);



    return (
        <Modal
            onClose={handleClose}
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside" >
            <form onSubmit={handleSubmitForm
                (handleAddTicket)}>
                <ModalContent className="mb-4">
                    <ModalHeader>Add Ticket</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <div className="mt-2 flex flex-col gap-4">
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            autoFocus
                                            label="Name"
                                            variant="bordered"
                                            type="text"
                                            isInvalid={errors.name !== undefined}
                                            errorMessage={errors.name?.message} />
                                    )} />

                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Price"
                                            variant="bordered"
                                            type="number"
                                            isInvalid={errors.price !== undefined}
                                            errorMessage={errors.price?.message} />
                                    )} />

                                <Controller
                                    name="quantity"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Quantity"
                                            variant="bordered"
                                            type="number"
                                            isInvalid={errors.quantity !== undefined}
                                            errorMessage={errors.quantity?.message} />
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
                            </div>
                        </div>


                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="flat"
                            onPress={handleClose}
                            disabled={isPendingAddTicket}
                        >
                            {isPendingAddTicket ? (
                                <Spinner size="sm" color="primary" />
                            ) : ("Cancel")}
                        </Button>

                        <Button
                            color="danger"
                            type="submit"
                            disabled={isPendingAddTicket}>

                            {isPendingAddTicket ? (
                                <Spinner size="sm" color="primary" />
                            ) : ("Create Ticket")}
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal >
    );
};

export default AddTicketModal;