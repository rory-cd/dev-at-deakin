import Image from "next/image";
import ArticleCardSection from "@/components/articles/ArticleCardSection";
import QuestionCardSection from "@/components/questions/QuestionCardSection";
import SignupBlock from "@/components/SignupBlock";

export default function HomePage() {
  return (
    <div className="grow-1 flex flex-col items-center gap-20">
      {/* Hero Image */}
      <div className="relative h-100 w-full">
        <Image
          src="https://picsum.photos/id/1/1920/1080.jpg"
          alt="DEV@Deakin cover image"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Articles */}
      <ArticleCardSection
        title="Featured Articles"
        subtitle="By other students"
        count={3}
        cta="See all articles"
        className="mid-dark-v-gradient pt-6 mb-5"
      />

      {/* Questions */}
      <QuestionCardSection
        title="Featured Questions"
        subtitle="By other students"
        cta="See all questions"
        className="mid-dark-v-gradient pt-6 mb-20"
        allowDelete
      />

      {/* Signup Block */}
      <div className="px:5 mt-6 flex w-full justify-center bg-bg-front md:px-10 md:py-5">
        <SignupBlock />
      </div>
    </div>
  );
}
