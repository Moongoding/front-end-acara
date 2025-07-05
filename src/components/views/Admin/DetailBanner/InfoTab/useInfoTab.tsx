import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useInfoTab = () => {

    const schemaUpdateInfo = yup.object().shape({
        title: yup.string().required("Please input title"),
        isShow: yup.string().required("Please Select Show Status"),
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


    return {
        controlUpdateInfo,
        handleSubmitInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueInfo
    }
}

export default useInfoTab;