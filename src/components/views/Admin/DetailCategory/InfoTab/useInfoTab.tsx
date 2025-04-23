import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useInfoTab = () => {

    const schemaUpdateInfo = yup.object().shape({
        name: yup.string().required("Please input name"),
        description: yup.string().required("Please input description"),
    });

    const {
        control: controlUpdateinfo,
        handleSubmit: handleSubmitinfo,
        formState: { errors: errorsUpdateinfo },
        reset: resetUpdateinfo,
        setValue: setValueinfo,
    } = useForm({
        resolver: yupResolver(schemaUpdateInfo),
    });



    return {
        controlUpdateinfo,
        handleSubmitinfo,
        errorsUpdateinfo,
        resetUpdateinfo,
        setValueinfo
    }
}


export default useInfoTab;