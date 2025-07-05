import { Tab, Tabs } from "@nextui-org/react";
import InfoTab from "./InfoTab";
import useDetailBanner from "./useDetailBanner";
import ImageTab from "./ImageTab";

const DetailBanner = () => {
    const {
        dataBanner,
        handleUpdateBanner,
        isPendingUpdateBanner,
        isSuccessUpdateBanner,

    } = useDetailBanner();
    return (
        <Tabs aria-label="Options">
            <Tab key="image" title="Image">
                <ImageTab
                    currentImage={dataBanner?.image}
                    onUpdate={handleUpdateBanner}
                    isPendingUpdate={isPendingUpdateBanner}
                    isSuccessUpdate={isSuccessUpdateBanner}
                />
            </Tab>
            <Tab key="info" title="info">
                <InfoTab
                    dataBanner={dataBanner}
                    onUpdate={handleUpdateBanner}
                    isPendingUpdate={isPendingUpdateBanner}
                    isSuccessUpdate={isSuccessUpdateBanner}
                />
            </Tab>
        </Tabs>
    );
};

export default DetailBanner;