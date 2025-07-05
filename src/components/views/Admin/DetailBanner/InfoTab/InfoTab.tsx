import { IBanner } from "@/types/Banner";
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Skeleton, Spinner, Textarea } from "@nextui-org/react"
import useInfoTab from "./useInfoTab";
import { Controller, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";

interface PropTypes {
    dataBanner: IBanner,
    onUpdate: (data: IBanner) => void
    isPendingUpdate: boolean,
    isSuccessUpdate: boolean,
}

const InfoTab = (props: PropTypes) => {
    const { dataBanner, onUpdate, isPendingUpdate, isSuccessUpdate, } = props;
    const {
        controlUpdateInfo,
        handleSubmitInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueInfo
    } = useInfoTab();

    const watchedFields = useWatch({
        control: controlUpdateInfo,
        name: ['title', 'isShow']
    });

    const isFormChanged = useMemo(() => {
        return (
            watchedFields[0] !== dataBanner?.title ||
            watchedFields[1] !== String(dataBanner?.isShow)
        );
    }, [watchedFields, dataBanner]);

    const disabledSubmit = isPendingUpdate || !dataBanner?._id;

    useEffect(() => {
        if (dataBanner) {
            setValueInfo("title", `${dataBanner.title}`);
            setValueInfo("isShow", `${dataBanner.isShow}`);
        }
    }, [dataBanner]);


    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [isSuccessUpdate])


    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="w-full text-xl font-bold">Banner Information</h1>
                <p className="w-full text-small text-default-400">Manage Information of this Banner</p>
            </CardHeader>

            <CardBody>
                <form className="flex flex-col gap-4"
                    onSubmit={handleSubmitInfo(onUpdate)}>
                    <Skeleton isLoaded={!!dataBanner?.title} className="rounded-lg">
                        <Controller
                            name="title"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <Input {...field}
                                    autoFocus
                                    label="Name"
                                    variant="bordered"
                                    type="text"
                                    isInvalid={errorsUpdateInfo.title !== undefined}
                                    errorMessage={errorsUpdateInfo.title?.message}
                                    className="mt-2"
                                    labelPlacement="outside"
                                />
                            )} />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataBanner} className="rounded-lg">
                        <Controller
                            name="isShow"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Status"
                                    variant="bordered"
                                    isInvalid={errorsUpdateInfo.isShow !== undefined}
                                    errorMessage={errorsUpdateInfo.isShow?.message}
                                    disallowEmptySelection
                                    defaultSelectedKeys={[
                                        dataBanner?.isShow ? "true" : "false",
                                    ]}
                                >
                                    <SelectItem key="true" value="true">Show</SelectItem>
                                    <SelectItem key="false" value="false">Hide</SelectItem>
                                </Select>
                            )} />
                    </Skeleton>

                    <Button
                        color="danger"
                        type="submit"
                        className="mt-2 disabled:bg-default-500"
                        disabled={disabledSubmit || !isFormChanged}>

                        {disabledSubmit ? (
                            <Spinner size="sm" color="primary" />
                        ) : ("Save Change Banner")}
                    </Button>

                </form>
            </CardBody>
        </Card>
    );
};

export default InfoTab;