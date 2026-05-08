import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import ButtonSecondary from "./ButtonSecondary";

export default function CardSection({
  title,
  subtitle,
  cta,
  cardsData,
  className,
}) {
  // Create card elements
  const cards = cardsData
    .slice(0, 3)
    .map((cardData) => (
      <Card key={cardData.id} data={cardData} className="w-full" />
    ));
  return (
    <section
      className={`mt-4 flex flex-col items-center px-5 md:px-10 container-center ${className}`}
    >
      {/* Heading */}
      <SectionHeading title={title} subtitle={subtitle} className="mb-4 self-start" />

      {/* Card list */}
      <div className="mb-10 grid w-full grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-3 xl:gap-20 2xl:gap-25">
        {cards}
      </div>

      {/* Call to action */}
      <ButtonSecondary>
        {cta}
      </ButtonSecondary>
    </section>
  );
}
