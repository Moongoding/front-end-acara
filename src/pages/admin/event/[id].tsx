import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/Admin/DetailEvent";


const AdminDetailEventPage = () => {
    return (
        <DashboardLayout title="Detail Event" description="Manage Information for this Event" type="admin">
            <DetailEvent />
        </DashboardLayout>
    );
};

export default AdminDetailEventPage;
