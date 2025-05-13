import { Tab, Tabs } from "@nextui-org/react";
import BannerTab from "./BannerTab";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import LocationTab from "./LocationTab";
import TicketTab from "./TicketTab/TicketTab";

const DetailEvent = () => {
    const {
        dataEvent,
        handleUpdateEvent,
        handleUpdateInfo,
        handleUpdateLocation,
        isPendingUpdateEvent,
        isSuccessUpdateEvent,

        dataRegionById,

    } = useDetailEvent();

    return (
        <Tabs aria-label="Options">
            <Tab key="benner" title="Benner">
                <BannerTab
                    currentBanner={dataEvent?.banner}
                    onUpdate={handleUpdateEvent}
                    isPendingUpdate={isPendingUpdateEvent}
                    isSuccessUpdate={isSuccessUpdateEvent}
                />
            </Tab>
            <Tab key="info" title="info">
                <InfoTab
                    dataEvent={dataEvent}
                    onUpdate={handleUpdateInfo}
                    isPendingUpdate={isPendingUpdateEvent}
                    isSuccessUpdate={isSuccessUpdateEvent}
                />
            </Tab>
            <Tab key="location" title="Location">
                <LocationTab
                    dataEvent={dataEvent}
                    onUpdate={handleUpdateLocation}
                    dataDefaultRegion={dataRegionById?.data.data[0]?.name}
                    isPendingUpdate={isPendingUpdateEvent}
                    isSuccessUpdate={isSuccessUpdateEvent}
                />
            </Tab>

            <Tab key="ticket" title="Ticket">
                <TicketTab />
            </Tab>
        </Tabs>
    );
};

export default DetailEvent;