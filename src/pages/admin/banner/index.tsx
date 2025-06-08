import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/Admin/Banner";

const AdminBannerPage = () => {
    return (
        <DashboardLayout title="Banner" description="All List Banner, Create new Banner, and manage exiting Banner." type="admin">
            <Banner />
        </DashboardLayout>
    );
};

export default AdminBannerPage;
