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

const useAddTicketModal = () => {
    const router = useRouter();
    const { showToaster } = useContext(ToasterContext);

    // const {
    //     isPendingUploadFile,
    //     isPendingDeleteFile,
    //     handleDeleteFile,
    //     handleUploadFile,
    // } = useMediaHandling();

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        // watch,
        // getValues,
        // setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // const preview = watch("icon");
    // const fileUrl = getValues("icon");


    // ➕ Add Ticket API
    const addTicket = async (payload: ITicket) => {
        const res = await ticketServices.addTicket(payload);
        return res;
    };

    // 🔁 Add Category Mutation
    const {
        mutate: mutateAddTicket,
        isPending: isPendingAddTicket,
        isSuccess: isSuccessAddTicket
    } = useMutation({
        mutationFn: addTicket,
        onError: (error) => handleApiError(error, showToaster, router),
        onSuccess: () => {
            showToaster({ type: "success", message: "Success add Ticket" });
            reset();
        },
    });

    // 📩 Submit Handler
    const handleAddTicket = (data: ITicket) => {
        data.events = `${router.query.id}`;
        data.price = Number(data.price);
        data.quantity = Number(data.quantity);
        mutateAddTicket(data)
    };

    return {
        // Form
        control,
        errors,
        reset,
        handleSubmitForm,

        // Submission
        handleAddTicket,
        isPendingAddTicket,
        isSuccessAddTicket,
    }
};

export default useAddTicketModal;