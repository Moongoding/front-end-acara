import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";

const AdminCategoryPage = () => {
    return (
        <DashboardLayout title="Category" description="All List Category, Create new Category, and manage exiting Category." type="admin">
            <Category />
        </DashboardLayout>
    );
};

export default AdminCategoryPage;
