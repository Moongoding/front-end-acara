import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";

interface PropTypes {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;
  return (
    <div className="lg:py flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10">
      <PageHead title={title} />
      <section className="max-w-3xl:container p-6">{children}</section>
    </div>
  );
};

export default AuthLayout;
