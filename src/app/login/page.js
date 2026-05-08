import Registration from "@/components/Registration";

export default async function LoginPage({ searchParams }) {

  const myParams = await searchParams;

  const newUser = myParams?.user === "new";
  const redirectPath = myParams?.redirect || "/"; 

  return (
    <div className="container-center">
      <div className="bg-bg-front rounded-xl shadow-xl/30 mx-auto p-5 md:p-15 flex relative flex-col mt-20 max-w-140">
        <Registration newUser={newUser} path={redirectPath} />
      </div>
    </div>
  );
}