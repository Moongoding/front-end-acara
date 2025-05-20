import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import { Button, Card, CardBody, CardHeader, useDisclosure } from "@nextui-org/react";
import { Fragment, Key, ReactNode, useCallback, useState } from "react";
import { COLUMN_LIST_TICKET } from "./TicketTab.constant";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import { ITicket } from "@/types/Ticket";

const TicketTab = () => {
    const addTicketModal = useDisclosure();
    const deleteTicketModal = useDisclosure();
    const updateTicketModal = useDisclosure();

    const [selectedData, setSelectedData] = useState<ITicket | null>(null);

    const {
        dataTicket,
        refetchTicket,
        isRefetchingTicket,
        isPendingTicket
    } = useTicketTab();

    console.log("DataTicket", dataTicket);

    const renderCell = useCallback(
        (ticket: Record<string, unknown>, columnKey: Key) => {
            const cellValue = ticket[columnKey as keyof typeof ticket];
            switch (columnKey) {
                case "price":
                    return `${convertIDR(cellValue as number)}`
                case "actions":
                    return (

                        <DropdownAction
                            onPressDetail={() => {
                                setSelectedData(ticket as ITicket)
                                updateTicketModal.onOpen();
                            }}
                            onPressDelete={() => {
                                deleteTicketModal.onOpen();
                            }}
                        />
                    );

                default:
                    return cellValue as ReactNode;
            }
        },
        [],
    );

    return (
        <Fragment>
            <Card className="w-full p-4">
                <CardHeader className="items-center justify-between">
                    <div className="flex flex-col items-center">
                        <h1 className="w-full text-xl font-bold">Event Ticket </h1>
                        <p className="w-full text-small text-default-400">Manage Ticket of this Event</p>
                    </div>

                    <Button color="danger" onPress={addTicketModal.onOpen}>
                        Add New Ticket
                    </Button>
                </CardHeader>

                <CardBody className="pt-0">
                    <DataTable
                        // buttonTopContentLabel="Create Ticket"
                        columns={COLUMN_LIST_TICKET}
                        data={dataTicket || []}
                        emptyContent="Ticket is empty"
                        isLoading={isPendingTicket || isRefetchingTicket}
                        renderCell={renderCell}
                        showSearch={false}
                        showLimit={false}
                        totalPages={1}
                    />
                </CardBody>
            </Card>

            <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />

            <DeleteTicketModal
                {...deleteTicketModal}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                refetchTicket={refetchTicket}
            />
        </Fragment>
    );
}

export default TicketTab;