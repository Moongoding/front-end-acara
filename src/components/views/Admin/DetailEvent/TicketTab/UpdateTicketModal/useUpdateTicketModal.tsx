// 🔁 Import External Libraries
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';

// 🔁 Import Internal Resources
import { ToasterContext } from "@/contexts/ToasterContexts";
import { handleApiError } from '@/utils/handleApiError';
import { ITicket } from '@/types/Ticket';
import ticketServices from '@/services/ticket.Services';

// 🧠 Yup Validation Schema
const schema = yup.object().shape({
    name: yup.string().required("Please input name"),
    description: yup.string().required("Please input description"),
    price: yup.string().required("Please input The price"),
    quantity: yup.string().required("Please input the quantity"),
});

const useUpdateTicketModal = (id: string) => {
    const router = useRouter();
    const { showToaster } = useContext(ToasterContext);

    const {
        control: controlUpdateTicket,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(schema),
    });


    // ➕ Update Ticket API
    const updateTicket = async (payload: ITicket) => {
        const res = await ticketServices.updateTicket(id, payload);
        return res;
    };

    // 🔁 Add Category Mutation
    const {
        mutate: mutateUpdateTicket,
        isPending: isPendingUpdateTicket,
        isSuccess: isSuccessUpdateTicket
    } = useMutation({
        mutationFn: updateTicket,
        onError: (error) => handleApiError(error, showToaster, router),
        onSuccess: () => {
            showToaster({ type: "success", message: "Success Update Ticket" });
            reset();
        },
    });

    // 📩 Submit Handler
    const handleUpdateTicket = (data: ITicket) => {
        data.events = `${router.query.id}`;
        data.price = Number(data.price);
        data.quantity = Number(data.quantity);
        mutateUpdateTicket(data)
    };

    return {
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
    }
};

export default useUpdateTicketModal;