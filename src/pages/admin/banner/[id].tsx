import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailBanner from "@/components/views/Admin/DetailBanner";


const AdminDetailBannerPage = () => {
    return (
        <DashboardLayout title="Detail Banner" description="Manage Information for this Banner" type="admin">
            <DetailBanner />
        </DashboardLayout>
    );
};

export default AdminDetailBannerPage;
