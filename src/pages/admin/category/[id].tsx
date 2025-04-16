import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/Admin/DetailCategory";


const AdminDetailCategoryPage = () => {
    return (
        <DashboardLayout title="Detail Category" description="Manage Information for this Category" type="admin">
            <DetailCategory />
        </DashboardLayout>
    );
};

export default AdminDetailCategoryPage;
