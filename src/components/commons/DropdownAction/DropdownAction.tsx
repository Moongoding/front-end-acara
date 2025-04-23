import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
    onPressDetail: () => void;
    onPressDelete: () => void;
}


const DropdownAction = (props: PropTypes) => {
    const { onPressDetail, onPressDelete } = props;
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light" aria-label="More options">
                    <CiMenuKebab className="text-default-700" />
                </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Event Actions">
                <DropdownItem key="detail-event-button" onPress={onPressDetail} >
                    Detail
                </DropdownItem>

                <DropdownItem key="delete-Event" className="text-danger-500"
                    onPress={onPressDelete}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropdownAction;