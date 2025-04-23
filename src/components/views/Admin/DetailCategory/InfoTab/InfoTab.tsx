import { ICategory } from "@/types/Category";
import { Button, Card, CardBody, CardHeader, Input, Skeleton, Spinner, Textarea } from "@nextui-org/react"
import useInfoTab from "./useInfoTab";
import { Controller, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";

interface PropTypes {
    dataCategory: ICategory,
    onUpdate: (data: ICategory) => void
    isPendingUpdate: boolean,
    isSuccessUpdate: boolean,
}

const InfoTab = (props: PropTypes) => {
    const { dataCategory, onUpdate, isPendingUpdate, isSuccessUpdate, } = props;
    const {
        controlUpdateinfo,
        handleSubmitinfo,
        errorsUpdateinfo,
        resetUpdateinfo,
        setValueinfo
    } = useInfoTab();

    const watchedFields = useWatch({
        control: controlUpdateinfo,
        name: ['name', 'description']
    });

    const isFormChanged = useMemo(() => {
        return (
            watchedFields[0] !== dataCategory?.name ||
            watchedFields[1] !== dataCategory?.description
        );
    }, [watchedFields, dataCategory]);

    const disabledSubmit = isPendingUpdate || !dataCategory?._id;

    useEffect(() => {
        setValueinfo('name', `${dataCategory?.name}`);
        setValueinfo('description', `${dataCategory?.description}`);
    }, [dataCategory])

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateinfo();
        }
    }, [isSuccessUpdate])




    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Category Information</h1>
                <p className="w-full text-small text-default-400">Manage Information of this Category</p>
            </CardHeader>

            <CardBody>
                <form className="flex flex-col gap-4"
                    onSubmit={handleSubmitinfo(onUpdate)}>
                    <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
                        <Controller
                            name="name"
                            control={controlUpdateinfo}
                            render={({ field }) => (
                                <Input {...field}
                                    autoFocus
                                    label="Name"
                                    variant="bordered"
                                    type="text"
                                    isInvalid={errorsUpdateinfo.name !== undefined}
                                    errorMessage={errorsUpdateinfo.name?.message}
                                    className="mt-2"
                                    labelPlacement="outside"
                                />
                            )} />

                    </Skeleton>

                    <Skeleton isLoaded={!!dataCategory?.description} className="rounded-lg">
                        <Controller name="description"
                            control={controlUpdateinfo}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    label="Description"
                                    variant="bordered"
                                    isInvalid={errorsUpdateinfo.description !== undefined}
                                    errorMessage={errorsUpdateinfo.description?.message}
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
                        ) : ("Save Change Category")}
                    </Button>

                </form>
            </CardBody>
        </Card>
    );
};

export default InfoTab;