import { IEventForm } from "@/types/Event";
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardHeader, DatePicker, Input, Select, SelectItem, Skeleton, Spinner, Textarea } from "@nextui-org/react"
import useInfoTab from "./useInfoTab";
import { Controller, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";

interface PropTypes {
    dataEvent: IEventForm,
    onUpdate: (data: IEventForm) => void
    isPendingUpdate: boolean,
    isSuccessUpdate: boolean,
}


const InfoTab = (props: PropTypes) => {
    const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate, } = props;
    const {
        controlUpdateInfo,
        handleSubmitInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueInfo,
        dataCategory,
    } = useInfoTab();

    const watchedFields = useWatch({
        control: controlUpdateInfo,
        name: ['name', 'description', 'slug', 'category', 'isPublish', 'isFeatured']
    });

    const isFormChanged = useMemo(() => {
        console.log("watchedFields[5]", watchedFields[5], typeof watchedFields[5]);
        console.log("dataEvent?.isFeatured", dataEvent?.isFeatured, typeof dataEvent?.isFeatured);
        return (
            watchedFields[0] !== dataEvent?.name ||
            watchedFields[1] !== dataEvent?.description ||
            watchedFields[2] !== dataEvent?.slug ||
            watchedFields[3] !== dataEvent?.category ||
            watchedFields[4] !== String(dataEvent?.isPublish) ||
            watchedFields[5] !== String(dataEvent?.isFeatured)
        );
    }, [watchedFields, dataEvent]);

    const disabledSubmit = isPendingUpdate || !dataEvent?._id;

    useEffect(() => {
        if (dataEvent) {
            setValueInfo('name', `${dataEvent?.name}`);
            setValueInfo('description', `${dataEvent?.description}`);
            setValueInfo('slug', `${dataEvent?.slug}`);
            setValueInfo("category", `${dataEvent?.category}`);
            setValueInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
            setValueInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
            setValueInfo("isPublish", `${dataEvent?.isPublish}`);
            setValueInfo("isFeatured", `${dataEvent?.isFeatured}`);
        }
    }, [dataEvent])

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [isSuccessUpdate])



    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Event Information</h1>
                <p className="w-full text-small text-default-400">Manage Information of this Event</p>
            </CardHeader>

            <CardBody>
                <form className="flex flex-col gap-4"
                    onSubmit={handleSubmitInfo(onUpdate)}>
                    <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
                        <Controller
                            name="name"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <Input {...field}
                                    autoFocus
                                    label="Name"
                                    variant="bordered"
                                    type="text"
                                    isInvalid={errorsUpdateInfo.name !== undefined}
                                    errorMessage={errorsUpdateInfo.name?.message}
                                    className="mt-2"
                                    labelPlacement="outside"
                                />
                            )} />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
                        <Controller
                            name="slug"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <Input {...field}
                                    label="Slug"
                                    variant="bordered"
                                    type="text"
                                    isInvalid={errorsUpdateInfo.slug !== undefined}
                                    errorMessage={errorsUpdateInfo.slug?.message}
                                    className="mt-2"
                                    labelPlacement="outside"
                                />
                            )} />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
                        {dataCategory ? (
                            <Controller
                                name="category"
                                control={controlUpdateInfo}
                                render={({ field: { onChange, ...field } }) => (
                                    <Autocomplete
                                        {...field}
                                        defaultItems={dataCategory?.data.data || []}
                                        label="Category"
                                        labelPlacement="outside"
                                        defaultSelectedKey={dataEvent?.category}
                                        variant="bordered"
                                        isInvalid={errorsUpdateInfo.category !== undefined}
                                        errorMessage={errorsUpdateInfo.category?.message}
                                        onSelectionChange={(value) => onChange(value)}
                                        placeholder="Search Category"
                                    >
                                        {(category: ICategory) => (
                                            <AutocompleteItem key={category._id} value={category._id}>
                                                {category.name}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>

                                )}
                            />) : (
                            <div className="flex justify-center items-center h-8">
                                <Spinner size="md" color="primary" />
                            </div>
                        )}
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
                        <Controller
                            name="startDate"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    label="Start Date"
                                    variant="bordered"
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    isInvalid={errorsUpdateInfo.startDate !== undefined}
                                    errorMessage={errorsUpdateInfo.startDate?.message} />
                            )} />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
                        <Controller
                            name="endDate"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    label="End Date"
                                    variant="bordered"
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    isInvalid={errorsUpdateInfo.endDate !== undefined}
                                    errorMessage={errorsUpdateInfo.endDate?.message} />
                            )} />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
                        <Controller
                            name="isPublish"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Status"
                                    variant="bordered"
                                    isInvalid={errorsUpdateInfo.isPublish !== undefined}
                                    errorMessage={errorsUpdateInfo.isPublish?.message}
                                    disallowEmptySelection
                                    defaultSelectedKeys={[
                                        dataEvent?.isPublish ? "true" : "false",
                                    ]}
                                >
                                    <SelectItem key="true" value="true">Publish</SelectItem>
                                    <SelectItem key="false" value="false">Draft</SelectItem>
                                </Select>
                            )} />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
                        <Controller
                            name="isFeatured"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Featured"
                                    variant="bordered"
                                    isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                                    errorMessage={errorsUpdateInfo.isFeatured?.message}
                                    disallowEmptySelection
                                    defaultSelectedKeys={[
                                        dataEvent?.isFeatured ? "true" : "false",
                                    ]}
                                >
                                    <SelectItem key="true" value="true">Yes</SelectItem>
                                    <SelectItem key="false" value="false">No</SelectItem>
                                </Select>
                            )} />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
                        <Controller name="description"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    label="Description"
                                    variant="bordered"
                                    isInvalid={errorsUpdateInfo.description !== undefined}
                                    errorMessage={errorsUpdateInfo.description?.message}
                                    className="mt-2"
                                    labelPlacement="outside"
                                />
                            )} />
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

export default InfoTab;