import PageHead from "@/components/commons/PageHead";
import { children } from "react";

interface PropTypes {
    title?: string
    Children:React.ReactNode
}

const AuthLayout = (props: PropTypes) => {
    const { title, children } = props;
    return (
        <>
            <PageHead title={title} />
            <section className="max-w-3xl:container p-6">{children}</section>
        </>
    );
};

export default AuthLayout;