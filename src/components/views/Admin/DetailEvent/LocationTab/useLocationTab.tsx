import categoryServices from "@/services/category.Services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/router";
import useDoubounce from "@/hooks/useDebounce";
import { useState } from "react";
import eventServices from "@/services/event.Services";

const useLocationTab = () => {

    const schemaUpdateLocation = yup.object().shape({
        isOnline: yup.string().required("Please select Online or Offline"),
        latitude: yup.string().required("Please input latutude coordinate"),
        longitude: yup.string().required("Please input longitude coordinate"),
        region: yup.string().required("Please select Region"),

    });

    const {
        control: controlUpdateLocation,
        handleSubmit: handleSubmitLocation,
        formState: { errors: errorsUpdateLocation },
        reset: resetUpdateLocation,
        setValue: setValueLocation,
    } = useForm({
        resolver: yupResolver(schemaUpdateLocation),
    });



    // Search Region Handler
    const debounce = useDoubounce();
    const [searchRegency, setSearchRegency] = useState("");
    const handleSearchRegion = (region: string) => {
        debounce(() => setSearchRegency(region), 50);
    }


    const {
        data: dataRegion,
        isPending: isPendingRegion,
    } = useQuery({
        queryKey: ["region", searchRegency],
        queryFn: () => eventServices.locationByRegency(`${searchRegency}`),
        enabled: searchRegency !== "",
    })



    return {
        controlUpdateLocation,
        handleSubmitLocation,
        errorsUpdateLocation,
        resetUpdateLocation,
        setValueLocation,
        searchRegency,

        handleSearchRegion,
        dataRegion,
        isPendingRegion
    }
}


export default useLocationTab;