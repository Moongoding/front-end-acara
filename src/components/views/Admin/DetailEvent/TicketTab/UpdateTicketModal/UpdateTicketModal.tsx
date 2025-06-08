import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@nextui-org/react";
import { Controller, useWatch } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import useUpdateTicketModal from "./useUpdateTicketModal";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
    isOpen?: boolean;
    onClose: () => void;
    refetchTicket: () => void;
    onOpenChange: () => void;
    selectedData: ITicket | null;
    setSelectedData: Dispatch<SetStateAction<ITicket | null>>;
};

const UpdateTicketModal = (props: PropTypes) => {
    const { isOpen, onClose, refetchTicket, onOpenChange, selectedData, setSelectedData } = props;

    const {
        // Form
        controlUpdateTicket,
        errors,
        reset,
        handleSubmitForm,
        setValue,

        // Submission
        handleUpdateTicket,
        isPendingUpdateTicket,
        isSuccessUpdateTicket,

    } = useUpdateTicketModal(`${selectedData?._id}`);

    const handleClose = () => {
        onClose();
        reset();
        setSelectedData(null);
    }

    useEffect(() => {
        if (isSuccessUpdateTicket) {
            onClose();
            refetchTicket();
            setSelectedData(null);
        }
    }, [isSuccessUpdateTicket]);

    useEffect(() => {
        if (selectedData) {
            setValue("name", `${selectedData?.name}`);
            setValue("price", `${selectedData?.price}`);
            setValue("description", `${selectedData?.description}`);
            setValue("quantity", `${selectedData?.quantity}`);
        }
    }, [selectedData, setValue,]);


    const watchedFields = useWatch({
        control: controlUpdateTicket,
        name: ['name', 'price', 'quantity', 'description']
    });

    const isFormChanged = useMemo(() => {
        return (
            watchedFields[0] !== `${selectedData?.name}` ||
            watchedFields[1] !== `${selectedData?.price}` ||
            watchedFields[2] !== `${selectedData?.quantity}` ||
            watchedFields[3] !== `${selectedData?.description}`
        );
    }, [watchedFields, selectedData]);


    const disabledSubmit = isPendingUpdateTicket || !selectedData?._id;


    return (
        <Modal
            onClose={handleClose}
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside" >
            <form onSubmit={handleSubmitForm
                (handleUpdateTicket)}>
                <ModalContent className="mb-4">
                    <ModalHeader>Update Ticket</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <div className="mt-2 flex flex-col gap-4">
                                <Controller
                                    name="name"
                                    control={controlUpdateTicket}
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
                                    control={controlUpdateTicket}
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
                                    control={controlUpdateTicket}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Quantity"
                                            variant="bordered"
                                            type="number"
                                            isInvalid={errors.quantity !== undefined}
                                            errorMessage={errors.quantity?.message} />
                                    )} />

                                <Controller name="description" control={controlUpdateTicket} render={({ field }) => (
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
                            disabled={isPendingUpdateTicket}
                        >
                            {isPendingUpdateTicket ? (
                                <Spinner size="sm" color="primary" />
                            ) : ("Cancel")}
                        </Button>

                        <Button
                            color="danger"
                            type="submit"
                            className="disabled:bg-default-500"
                            disabled={disabledSubmit || !isFormChanged}>

                            {disabledSubmit ? (
                                <Spinner size="sm" color="primary" />
                            ) : ("Save Change Ticket")}
                        </Button>


                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal >
    );
};

export default UpdateTicketModal;