import SectionHeading from "@/components/SectionHeading";
import AuthGuard from "@/components/AuthGuard";
import ProfileInfo from "@/components/ProfileInfo";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div className="container-center mb-20">

        {/* Heading */}
        <SectionHeading title={"Profile"} subtitle={"View and update your account details"} className="mb-4 mt-4 self-start" />

        {/* Data list */}
        <div className="p-5 md:p-10 mid-dark-v-gradient">
          <ProfileInfo />
        </div>
      </div>
    </AuthGuard>
  );
}