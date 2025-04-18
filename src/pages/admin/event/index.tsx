import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";

const AdminEventPage = () => {
    return (
        <DashboardLayout title="Event" description="All List Event, Create new Event, and manage exiting Event." type="admin">
            <Event />
        </DashboardLayout>
    );
};

export default AdminEventPage;
