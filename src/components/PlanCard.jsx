import ButtonSecondary from "./ButtonSecondary";

export default function PlanCard({ title, description, price, features, showButton=true, cta, onSelect, highlight=false }) {
  return (
    <div className={`bg-bg-front shadow-xl/30 rounded-xl p-5 md:p-10 ${highlight && "border-(--clr-primary) border-2"} flex flex-col justify-center items-center gap-2 min-w-100`}>
      {/* Title */}
      <h3 className="font-heading uppercase text-[2rem] font-[500]">
        {title}
      </h3>

      {/* Description */}
      <p className="text-center">
        {description}
      </p>
      
      <div className="flex flex-row mid-light-v-gradient px-4 py-1 items-center rounded-2xl my-5">
        {/* Price */}
        <div className="flex flex-col p-4 items-center ">
          <p className="text-5xl font-bold">
            <span className="text-2xl align-top">$</span>
            {price}
          </p>
          <p>/ month</p>
        </div>

        {/* Features */}
        {features && 
          <ul className="space-y-2 p-4">
            {features.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        }
      </div>

      {/* Button */}
      {showButton && 
        <ButtonSecondary type={"button"} onClick={onSelect} className="mt-auto">
          {cta}
        </ButtonSecondary>
      }
    </div>
  );
}