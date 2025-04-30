import { IEvent, IEventForm, IRegency } from "@/types/Event";
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardHeader, DatePicker, Input, Select, SelectItem, Skeleton, Spinner, Textarea } from "@nextui-org/react"
import useLocationTab from "./useLocationTab";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";

interface PropTypes {
    dataEvent: IEventForm,
    dataDefaultRegion: string;
    onUpdate: (data: IEventForm) => void
    isPendingUpdate: boolean,
    isSuccessUpdate: boolean,
}


const LocationTab = (props: PropTypes) => {
    const {
        dataEvent,
        dataDefaultRegion,
        onUpdate,
        isPendingUpdate,
        isSuccessUpdate,
    } = props;
    const {
        controlUpdateLocation,
        handleSubmitLocation,
        errorsUpdateLocation,
        resetUpdateLocation,
        setValueLocation,
        searchRegency,

        dataRegion,
        isPendingRegion,
        handleSearchRegion
    } = useLocationTab();

    const watchedFields = useWatch({
        control: controlUpdateLocation,
        name: ['isOnline', 'latitude', 'longitude', 'region']
    });

    const isFormChanged = useMemo(() => {
        return (
            watchedFields[0] !== `${dataEvent?.isOnline}` ||
            watchedFields[1] !== `${dataEvent?.location?.coordinates[0]}` ||
            watchedFields[2] !== `${dataEvent?.location?.coordinates[1]}` ||
            watchedFields[3] !== `${dataEvent?.location?.region}`
        );
    }, [watchedFields, dataEvent]);

    const disabledSubmit = isPendingUpdate || !dataEvent?._id;

    useEffect(() => {
        if (dataEvent) {
            setValueLocation('isOnline', `${dataEvent?.isOnline}`);
            setValueLocation("region", `${dataEvent?.location?.region}`);
            setValueLocation('latitude', `${dataEvent?.location?.coordinates[0]}`);
            setValueLocation('longitude', `${dataEvent?.location?.coordinates[1]}`);
        }
    }, [dataEvent])

    useEffect(() => {
        if (isSuccessUpdate && dataEvent) {
            resetUpdateLocation({
                isOnline: `${dataEvent?.isOnline}`,
                latitude: `${dataEvent?.location?.coordinates[0]}`,
                longitude: `${dataEvent?.location?.coordinates[1]}`,
                region: `${dataEvent?.location?.region}`,
            });
        }
    }, [isSuccessUpdate, dataEvent]);


    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Event Location</h1>
                <p className="w-full text-small text-default-400">Manage Location of this Event</p>
            </CardHeader>

            <CardBody>
                <form className="flex flex-col gap-4"
                    onSubmit={handleSubmitLocation(onUpdate)}>

                    <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
                        <Controller
                            name="isOnline"
                            control={controlUpdateLocation}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Online / Offline"
                                    labelPlacement="outside"
                                    autoFocus
                                    variant="bordered"
                                    isInvalid={errorsUpdateLocation.isOnline !== undefined}
                                    errorMessage={errorsUpdateLocation.isOnline?.message}
                                    disallowEmptySelection
                                    defaultSelectedKeys={[
                                        dataEvent?.isOnline ? "true" : "false",
                                    ]}
                                >
                                    <SelectItem key="true" value="true">Online</SelectItem>
                                    <SelectItem key="false" value="false">Offline</SelectItem>
                                </Select>
                            )} />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.location?.coordinates[0]} className="rounded-lg">
                        <Controller
                            name="latitude"
                            control={controlUpdateLocation}
                            render={({ field }) => (
                                <Input {...field}
                                    type="number"
                                    label="Latitude"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isInvalid={errorsUpdateLocation.latitude !== undefined}
                                    errorMessage={errorsUpdateLocation.latitude?.message}
                                    className="mt-2"
                                />
                            )} />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.location} className="rounded-lg">
                        <Controller
                            name="longitude"
                            control={controlUpdateLocation}
                            render={({ field }) => (
                                <Input {...field}
                                    type="number"
                                    label="Longitude"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isInvalid={errorsUpdateLocation.longitude !== undefined}
                                    errorMessage={errorsUpdateLocation.longitude?.message}
                                    className="mt-2"
                                />
                            )} />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.location?.region} className="rounded-lg">
                        {dataDefaultRegion ? (
                            <Controller
                                name="region"
                                control={controlUpdateLocation}
                                render={({ field: { onChange, ...field } }) => (
                                    <Autocomplete
                                        {...field}
                                        // defaultItems={
                                        //     dataRegion?.data.data && searchRegency !== ""
                                        //         ? dataRegion?.data.data : []
                                        // }
                                        defaultItems={
                                            dataRegion?.data?.data && searchRegency !== ""
                                                ? dataRegion.data.data
                                                : []
                                        }
                                        defaultInputValue={dataDefaultRegion}
                                        label="City"
                                        variant="bordered"
                                        onInputChange={(search) => handleSearchRegion(search)}
                                        isLoading={searchRegency !== "" && isPendingRegion}
                                        isInvalid={errorsUpdateLocation.region !== undefined}
                                        errorMessage={errorsUpdateLocation.region?.message}
                                        onSelectionChange={(value) => onChange(value)}
                                        placeholder="Search City"
                                    >
                                        {(regency: IRegency) => (
                                            <AutocompleteItem key={`${regency.id}`}>
                                                {regency.name}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                )} />
                        ) : (
                            <div className="flex justify-center items-center h-8">
                                <Spinner size="md" color="primary" />
                            </div>
                        )}

                    </Skeleton>

                    <Button
                        color="danger"
                        type="submit"
                        className="mt-2 disabled:bg-default-500"
                        disabled={disabledSubmit || !isFormChanged}>

                        {disabledSubmit ? (
                            <Spinner size="sm" color="primary" />
                        ) : ("Save Change Event")}
                    </Button>

                </form>
            </CardBody>
        </Card>
    );
};

export default LocationTab;