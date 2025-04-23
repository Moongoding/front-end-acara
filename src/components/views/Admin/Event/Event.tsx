import DataTable from "@/components/ui/DataTable";
import {
    Chip, useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_EVENT } from "./Event.Constanst";
import useEvent from "./useEvent";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./AddEventModal";
import DeleteEventModal from "./DeleteEventModal";


const Event = () => {
    const { push, query } = useRouter();

    const {
        dataEvent,
        isLoadingEvent,
        isRefetchingEvent,
        refetchEvent,
        selectedId,
        setSelectedId
    } = useEvent();


    const addEventModal = useDisclosure();
    const deleteEventModal = useDisclosure();



    const renderCell = useCallback(
        (event: Record<string, unknown>, columnKey: Key) => {
            const cellValue = event[columnKey as keyof typeof event];
            switch (columnKey) {
                case "banner":
                    return (
                        <Image className="w-52 aspect-video object-cover rounded-lg"
                            src={`${cellValue}`} alt="icon" width={200} height={100} />
                    );

                case "isPublish":
                    return (
                        <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue === true ? "Publish" : "Not Publish"}
                        </Chip>
                    )

                case "actions":
                    return (

                        <DropdownAction
                            onPressDetail={() => push(`/admin/event/${event._id}`)}
                            onPressDelete={() => {
                                setSelectedId({
                                    _id: event._id as string,
                                    banner: event.banner as string | undefined
                                });
                                deleteEventModal.onOpen();
                            }}
                        />
                    );

                default:
                    return cellValue as ReactNode;
            }
        },
        [push],
    );

    return (
        <div>
            <section>
                {Object.keys(query).length > 0 && (
                    <DataTable
                        buttonTopContentLabel="Create Event"
                        columns={COLUMN_LIST_EVENT}
                        data={dataEvent?.data || []}
                        emptyContent="Event is empty"
                        isLoading={isLoadingEvent || isRefetchingEvent}
                        onClickButtonTopContent={addEventModal.onOpen}
                        renderCell={renderCell}
                        totalPages={dataEvent?.pagination.totalPages}
                    />
                )}
                <AddEventModal refetchEvent={refetchEvent} {...addEventModal} />

                <DeleteEventModal
                    {...deleteEventModal}
                    selectedEvent={selectedId}
                    setSelectedEvent={setSelectedId}
                    refetchEvent={refetchEvent}
                />
            </section>

            {/* <InputFile name="input" isDropable /> */}
        </div >
    );
};


export default Event;