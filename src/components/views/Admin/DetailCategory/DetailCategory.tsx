import { Tab, Tabs } from "@nextui-org/react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
    const {
        dataCategory,
        handleUpdateCategory,
        isPendingUpdateCategory,
        isSuccessUpdateCategory,

    } = useDetailCategory();
    return (
        <Tabs aria-label="Options">
            <Tab key="icon" title="Icon">
                <IconTab
                    currentIcon={dataCategory?.icon}
                    onUpdate={handleUpdateCategory}
                    isPendingUpdate={isPendingUpdateCategory}
                    isSuccessUpdate={isSuccessUpdateCategory}
                />
            </Tab>
            <Tab key="info" title="info">
                <InfoTab
                    dataCategory={dataCategory}
                    onUpdate={handleUpdateCategory}
                    isPendingUpdate={isPendingUpdateCategory}
                    isSuccessUpdate={isSuccessUpdateCategory}
                />
            </Tab>
        </Tabs>
    );
};

export default DetailCategory;