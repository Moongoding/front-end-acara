import categoryServices from "@/services/category.Services";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/router";

const useInfoTab = () => {

    const schemaUpdateInfo = yup.object().shape({
        // banner: yup.mixed<FileList | string>().required("Please input the banner"),
        category: yup.string().required("Please Select Category"),
        endDate: yup.mixed<DateValue>().required("Please Select End Date"),
        name: yup.string().required("Please input name"),
        slug: yup.string().required("Please input slug"),
        startDate: yup.mixed<DateValue>().required("Please Select Start Date"),
        isPublish: yup.string().required("Please Select Status"),
        isFeatured: yup.string().required("Please Select Featured"),
        description: yup.string().required("Please Input Description"),
    });

    const {
        control: controlUpdateInfo,
        handleSubmit: handleSubmitInfo,
        formState: { errors: errorsUpdateInfo },
        reset: resetUpdateInfo,
        setValue: setValueInfo,
    } = useForm({
        resolver: yupResolver(schemaUpdateInfo),
    });

    // Get Data Category API
    const router = useRouter();
    const {
        data: dataCategory,
    } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => categoryServices.getCategories(),
        enabled: router.isReady,
    });



    return {
        controlUpdateInfo,
        handleSubmitInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueInfo,
        dataCategory,

    }
}


export default useInfoTab;