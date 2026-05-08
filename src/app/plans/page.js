"use client";

import { RiRobot2Line, RiStarLine, RiSunLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import PageHeading from "@/components/PageHeading";
import PlanCard from "@/components/PlanCard";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import LoadingIcon from "@/components/LoadingIcon";

export default function PlansPage() {

  const router = useRouter();
  const { isAuthReady, user, userData } = useContext(UserContext);

  if (!isAuthReady) return <LoadingIcon />

  return(
    <div className="container-center self-start">
      <PageHeading title={"Plans"} subtitle={"Upgrade your DEV@Deakin experience"} />
      <div className="flex flex-col lg:flex-row mx-auto gap-20 justify-center mt-20 mb-10">

        {/* FREE */}
        <PlanCard 
          title="Free"
          description={<span>Build your understanding<br/>with a wealth of knowledge</span>}
          price="0"
          showButton={!user}
          cta="Sign up"
          highlight={false}
          onSelect={() => router.push("/login?user=new")}
        />

        {/* PREMIUM */}
        <PlanCard 
          title="Premium"
          description={<span>Subscribe now and receive<br />the first month <span className="text-(--clr-primary) font-bold">FREE!</span></span>}
          price="5"
          showButton={userData?.tier != "premium"}
          cta="Subscribe"
          highlight={true}
          onSelect={() => router.push("/premium/checkout")}
          features={[
            <><RiSunLine className="text-(--clr-primary) float-left mr-3" />Light&nbsp;mode</>,
            <><RiRobot2Line className="text-(--clr-primary) float-left mr-3" />AI&nbsp;integration</>,
            <><RiStarLine className="text-(--clr-primary) float-left mr-3" />Priority&nbsp;questions</>,
          ]}
        />
      </div>
    </div>
  );
}